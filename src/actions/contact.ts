"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod/v4";
import { redirect } from "next/navigation";

const ContactSchema = z.object({
  name: z.string().min(1, "お名前は必須です"),
  email: z.email("有効なメールアドレスを入力してください"),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(1, "件名は必須です"),
  message: z.string().min(10, "お問い合わせ内容は10文字以上で入力してください"),
});

export type ContactState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function submitContact(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: formData.get("company") as string,
    phone: formData.get("phone") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const result = ContactSchema.safeParse(raw);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return { errors: fieldErrors };
  }

  await prisma.contactInquiry.create({
    data: result.data,
  });

  redirect("/contact/complete");
}

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod/v4";
import { generateSlug } from "@/lib/utils";

const NewsSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  excerpt: z.string().optional(),
  thumbnail: z.string().optional(),
  category: z.enum(["press", "news", "info"]),
  status: z.enum(["draft", "published"]),
});

export type NewsFormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createNews(
  prevState: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    thumbnail: formData.get("thumbnail") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
  };

  const result = NewsSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return { errors: fieldErrors };
  }

  const slug = generateSlug(result.data.title);

  const existingSlug = await prisma.news.findUnique({ where: { slug } });
  const finalSlug = existingSlug ? `${slug}-${Date.now().toString(36)}` : slug;

  await prisma.news.create({
    data: {
      ...result.data,
      slug: finalSlug,
      authorId: session.user.id,
      publishedAt: result.data.status === "published" ? new Date() : null,
    },
  });

  revalidatePath("/news");
  revalidatePath("/admin/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function updateNews(
  id: string,
  prevState: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    thumbnail: formData.get("thumbnail") as string,
    category: formData.get("category") as string,
    status: formData.get("status") as string,
  };

  const result = NewsSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return { errors: fieldErrors };
  }

  const existing = await prisma.news.findUnique({ where: { id } });
  if (!existing) throw new Error("News not found");

  await prisma.news.update({
    where: { id },
    data: {
      ...result.data,
      publishedAt:
        result.data.status === "published" && !existing.publishedAt
          ? new Date()
          : existing.publishedAt,
    },
  });

  revalidatePath("/news");
  revalidatePath("/admin/news");
  revalidatePath("/");
  redirect("/admin/news");
}

export async function deleteNews(id: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.news.delete({ where: { id } });

  revalidatePath("/news");
  revalidatePath("/admin/news");
  revalidatePath("/");
}

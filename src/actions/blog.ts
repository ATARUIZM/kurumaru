"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod/v4";
import { generateSlug } from "@/lib/utils";

const BlogSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  content: z.string().min(1, "本文は必須です"),
  excerpt: z.string().optional(),
  thumbnail: z.string().optional(),
  category: z.enum(["tech", "culture", "report"]),
  tags: z.string().optional(),
  status: z.enum(["draft", "published"]),
});

export type BlogFormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

export async function createBlogPost(
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    thumbnail: formData.get("thumbnail") as string,
    category: formData.get("category") as string,
    tags: formData.get("tags") as string,
    status: formData.get("status") as string,
  };

  const result = BlogSchema.safeParse(raw);
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
  const existingSlug = await prisma.blogPost.findUnique({ where: { slug } });
  const finalSlug = existingSlug ? `${slug}-${Date.now().toString(36)}` : slug;

  await prisma.blogPost.create({
    data: {
      ...result.data,
      slug: finalSlug,
      authorId: session.user.id,
      publishedAt: result.data.status === "published" ? new Date() : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  prevState: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const raw = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    excerpt: formData.get("excerpt") as string,
    thumbnail: formData.get("thumbnail") as string,
    category: formData.get("category") as string,
    tags: formData.get("tags") as string,
    status: formData.get("status") as string,
  };

  const result = BlogSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const key = String(issue.path[0]);
      if (!fieldErrors[key]) fieldErrors[key] = [];
      fieldErrors[key].push(issue.message);
    }
    return { errors: fieldErrors };
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) throw new Error("Blog post not found");

  await prisma.blogPost.update({
    where: { id },
    data: {
      ...result.data,
      publishedAt:
        result.data.status === "published" && !existing.publishedAt
          ? new Date()
          : existing.publishedAt,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string): Promise<void> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.blogPost.delete({ where: { id } });

  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

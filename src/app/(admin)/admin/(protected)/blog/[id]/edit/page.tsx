import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateBlogPost } from "@/actions/blog";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) notFound();

  const boundAction = updateBlogPost.bind(null, id);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">ブログ記事編集</h1>
        <p className="mt-1 text-sm text-slate-400">{post.title}</p>
      </div>
      <ArticleForm
        type="blog"
        action={boundAction}
        defaultValues={{
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || "",
          thumbnail: post.thumbnail || "",
          category: post.category,
          tags: post.tags || "",
          status: post.status,
        }}
      />
    </div>
  );
}

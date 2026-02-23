import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate, getCategoryLabel } from "@/lib/utils";
import Breadcrumb from "@/components/common/Breadcrumb";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "記事が見つかりません" };
  return {
    title: post.title,
    description: post.excerpt || `${post.title} - 株式会社サンプル ブログ`,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "published" },
    include: { author: { select: { name: true } } },
  });

  if (!post) notFound();

  return (
    <div className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "ブログ", href: "/blog" },
            { label: post.title },
          ]}
        />

        <article>
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="accent">
                {getCategoryLabel(post.category)}
              </Badge>
              <time className="text-sm text-slate-500">
                {formatDate(post.publishedAt || post.createdAt)}
              </time>
              {post.author.name && (
                <span className="text-sm text-slate-500">
                  by {post.author.name}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {post.title}
            </h1>
            {post.tags && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.split(",").map((tag) => (
                  <span
                    key={tag.trim()}
                    className="rounded-full bg-navy-800 px-3 py-1 text-sm text-slate-400"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.thumbnail && (
            <div className="mb-10 overflow-hidden rounded-xl">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full object-cover"
              />
            </div>
          )}

          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-16 border-t border-surface-border pt-8">
          <Button href="/blog" variant="ghost">
            ← ブログ一覧に戻る
          </Button>
        </div>
      </div>
    </div>
  );
}

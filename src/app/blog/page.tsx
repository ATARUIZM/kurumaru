import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, getCategoryLabel } from "@/lib/utils";
import Breadcrumb from "@/components/common/Breadcrumb";
import SectionTitle from "@/components/common/SectionTitle";
import AnimatedDiv from "@/components/common/AnimatedDiv";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "ブログ",
  description: "株式会社サンプルのエンジニアリングブログ。技術記事やカルチャーについて発信しています。",
};

const ITEMS_PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const category = params.category;

  const where = {
    status: "published" as const,
    ...(category ? { category } : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      include: { author: { select: { name: true } } },
    }),
    prisma.blogPost.count({ where }),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const categories = [
    { value: "", label: "すべて" },
    { value: "tech", label: "テクノロジー" },
    { value: "culture", label: "カルチャー" },
    { value: "report", label: "レポート" },
  ];

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "ブログ" }]} />
        <SectionTitle title="ブログ" subtitle="技術記事・コラム" />

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value ? `/blog?category=${cat.value}` : "/blog"}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                (category || "") === cat.value
                  ? "bg-accent text-navy-950"
                  : "border border-surface-border text-slate-400 hover:border-accent hover:text-accent"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-slate-400 py-12">
            該当するブログ記事はありません。
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <AnimatedDiv key={post.id} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`}>
                  <Card hover className="h-full">
                    {post.thumbnail && (
                      <div className="mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="accent">
                        {getCategoryLabel(post.category)}
                      </Badge>
                      <time className="text-xs text-slate-500">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </time>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-white line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-slate-400 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    {post.tags && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.tags.split(",").map((tag) => (
                          <span
                            key={tag.trim()}
                            className="rounded bg-navy-800 px-2 py-0.5 text-xs text-slate-400"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                </Link>
              </AnimatedDiv>
            ))}
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/blog"
        />
      </div>
    </div>
  );
}

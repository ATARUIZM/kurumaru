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
  const news = await prisma.news.findUnique({ where: { slug } });
  if (!news) return { title: "ニュースが見つかりません" };
  return {
    title: news.title,
    description: news.excerpt || `${news.title} - 株式会社サンプルのニュース`,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = await prisma.news.findUnique({
    where: { slug, status: "published" },
    include: { author: { select: { name: true } } },
  });

  if (!news) notFound();

  return (
    <div className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "ニュース", href: "/news" },
            { label: news.title },
          ]}
        />

        <article>
          <header className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="accent">
                {getCategoryLabel(news.category)}
              </Badge>
              <time className="text-sm text-slate-500">
                {formatDate(news.publishedAt || news.createdAt)}
              </time>
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">
              {news.title}
            </h1>
          </header>

          <div
            className="prose-dark"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
        </article>

        <div className="mt-16 border-t border-surface-border pt-8">
          <Button href="/news" variant="ghost">
            ← ニュース一覧に戻る
          </Button>
        </div>
      </div>
    </div>
  );
}

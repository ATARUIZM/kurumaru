import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, getCategoryLabel } from "@/lib/utils";
import Breadcrumb from "@/components/common/Breadcrumb";
import SectionTitle from "@/components/common/SectionTitle";
import AnimatedDiv from "@/components/common/AnimatedDiv";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "株式会社サンプルの最新お知らせ、プレスリリース、お知らせをご覧いただけます。",
};

const ITEMS_PER_PAGE = 10;

export default async function NewsPage({
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

  const [news, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.news.count({ where }),
  ]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const categories = [
    { value: "", label: "すべて" },
    { value: "press", label: "プレスリリース" },
    { value: "news", label: "お知らせ" },
    { value: "info", label: "IR情報" },
  ];

  return (
    <div className="py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "お知らせ" }]} />
        <SectionTitle title="お知らせ" subtitle="最新のお知らせ" />

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value ? `/news?category=${cat.value}` : "/news"}
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

        {news.length === 0 ? (
          <p className="text-center text-slate-400 py-12">
            該当するお知らせはありません。
          </p>
        ) : (
          <AnimatedDiv>
            <div className="divide-y divide-surface-border">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group flex flex-col gap-2 py-6 transition-colors hover:bg-surface/30 px-4 -mx-4 rounded-lg sm:flex-row sm:items-center sm:gap-4"
                >
                  <time className="shrink-0 text-sm text-slate-500">
                    {formatDate(item.publishedAt || item.createdAt)}
                  </time>
                  <Badge variant="accent">
                    {getCategoryLabel(item.category)}
                  </Badge>
                  <span className="font-medium text-white transition-colors group-hover:text-accent">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedDiv>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/news"
        />
      </div>
    </div>
  );
}

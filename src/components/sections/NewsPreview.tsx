import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, getCategoryLabel } from "@/lib/utils";
import SectionTitle from "@/components/common/SectionTitle";
import AnimatedDiv from "@/components/common/AnimatedDiv";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default async function NewsPreview() {
  const news = await prisma.news.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
    take: 5,
  });

  return (
    <section className="bg-navy-900/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="お知らせ" subtitle="最新のお知らせ" />

        {news.length === 0 ? (
          <p className="text-center text-slate-400">
            お知らせはまだありません。
          </p>
        ) : (
          <AnimatedDiv>
            <div className="mx-auto max-w-3xl divide-y divide-surface-border">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="group flex items-start gap-4 py-5 transition-colors hover:bg-surface/30 px-4 -mx-4 rounded-lg"
                >
                  <time className="shrink-0 text-sm text-slate-500 pt-0.5">
                    {formatDate(item.publishedAt || item.createdAt)}
                  </time>
                  <Badge variant="accent">
                    {getCategoryLabel(item.category)}
                  </Badge>
                  <span className="text-white transition-colors group-hover:text-accent">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedDiv>
        )}

        <div className="mt-10 text-center">
          <Button href="/news" variant="outline">
            お知らせ一覧へ
          </Button>
        </div>
      </div>
    </section>
  );
}

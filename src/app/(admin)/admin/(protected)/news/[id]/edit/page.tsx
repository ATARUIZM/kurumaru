import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ArticleForm from "@/components/admin/ArticleForm";
import { updateNews } from "@/actions/news";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });

  if (!news) notFound();

  const boundAction = updateNews.bind(null, id);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">ニュース編集</h1>
        <p className="mt-1 text-sm text-slate-400">{news.title}</p>
      </div>
      <ArticleForm
        type="news"
        action={boundAction}
        defaultValues={{
          title: news.title,
          content: news.content,
          excerpt: news.excerpt || "",
          thumbnail: news.thumbnail || "",
          category: news.category,
          status: news.status,
        }}
      />
    </div>
  );
}

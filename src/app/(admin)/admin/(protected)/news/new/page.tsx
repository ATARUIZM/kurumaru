import ArticleForm from "@/components/admin/ArticleForm";
import { createNews } from "@/actions/news";

export default function NewNewsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">お知らせ作成</h1>
        <p className="mt-1 text-sm text-slate-400">新しいお知らせ記事を作成します</p>
      </div>
      <ArticleForm type="news" action={createNews} />
    </div>
  );
}

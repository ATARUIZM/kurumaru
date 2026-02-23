import ArticleForm from "@/components/admin/ArticleForm";
import { createBlogPost } from "@/actions/blog";

export default function NewBlogPostPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">ブログ記事作成</h1>
        <p className="mt-1 text-sm text-slate-400">新しいブログ記事を作成します</p>
      </div>
      <ArticleForm type="blog" action={createBlogPost} />
    </div>
  );
}

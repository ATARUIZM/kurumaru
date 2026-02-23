import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, getCategoryLabel, getStatusLabel } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { deleteBlogPost } from "@/actions/blog";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">ブログ管理</h1>
          <p className="mt-1 text-sm text-slate-400">
            {posts.length}件の記事
          </p>
        </div>
        <Button href="/admin/blog/new">新規作成</Button>
      </div>

      {posts.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-slate-400">ブログ記事はまだありません。</p>
          <Button href="/admin/blog/new" className="mt-4">
            最初の記事を作成
          </Button>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-border bg-navy-950/50 text-left text-sm text-slate-400">
                <th className="px-6 py-3 font-medium">タイトル</th>
                <th className="px-6 py-3 font-medium">カテゴリ</th>
                <th className="px-6 py-3 font-medium">ステータス</th>
                <th className="px-6 py-3 font-medium">作成日</th>
                <th className="px-6 py-3 font-medium">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="transition-colors hover:bg-surface/30"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="font-medium text-white hover:text-accent"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="accent">
                      {getCategoryLabel(post.category)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        post.status === "published" ? "success" : "warning"
                      }
                    >
                      {getStatusLabel(post.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {formatDate(post.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="rounded px-3 py-1 text-sm text-slate-400 transition-colors hover:bg-surface-light hover:text-white"
                      >
                        編集
                      </Link>
                      <DeleteButton
                        onDelete={async () => {
                          "use server";
                          await deleteBlogPost(post.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

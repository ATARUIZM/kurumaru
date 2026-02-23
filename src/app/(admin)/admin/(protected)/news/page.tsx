import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate, getCategoryLabel, getStatusLabel } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { deleteNews } from "@/actions/news";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminNewsPage() {
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true } } },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">お知らせ管理</h1>
          <p className="mt-1 text-sm text-slate-400">
            {news.length}件の記事
          </p>
        </div>
        <Button href="/admin/news/new">新規作成</Button>
      </div>

      {news.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-slate-400">お知らせ記事はまだありません。</p>
          <Button href="/admin/news/new" className="mt-4">
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
              {news.map((item) => (
                <tr
                  key={item.id}
                  className="transition-colors hover:bg-surface/30"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/news/${item.id}/edit`}
                      className="font-medium text-white hover:text-accent"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="accent">
                      {getCategoryLabel(item.category)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        item.status === "published" ? "success" : "warning"
                      }
                    >
                      {getStatusLabel(item.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/news/${item.id}/edit`}
                        className="rounded px-3 py-1 text-sm text-slate-400 transition-colors hover:bg-surface-light hover:text-white"
                      >
                        編集
                      </Link>
                      <DeleteButton
                        onDelete={async () => {
                          "use server";
                          await deleteNews(item.id);
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

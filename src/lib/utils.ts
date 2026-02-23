import { format } from "date-fns";
import { ja } from "date-fns/locale";
import slugify from "slugify";

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "yyyy年M月d日", { locale: ja });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "yyyy年M月d日 HH:mm", { locale: ja });
}

export function generateSlug(title: string): string {
  const slug = slugify(title, { lower: true, strict: true, locale: "ja" });
  if (!slug) {
    return Date.now().toString(36);
  }
  return slug;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    press: "プレスリリース",
    news: "お知らせ",
    info: "IR情報",
    tech: "テクノロジー",
    culture: "カルチャー",
    report: "レポート",
  };
  return labels[category] || category;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: "下書き",
    published: "公開",
    unread: "未読",
    read: "既読",
    replied: "返信済",
  };
  return labels[status] || status;
}

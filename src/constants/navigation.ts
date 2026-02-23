export const navigation = [
  { label: "ホーム", href: "/" },
  { label: "会社概要", href: "/about" },
  { label: "お知らせ", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
] as const;

export const adminNavigation = [
  { label: "ダッシュボード", href: "/admin", icon: "dashboard" },
  { label: "お知らせ管理", href: "/admin/news", icon: "news" },
] as const;

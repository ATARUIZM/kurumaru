export const navigation = [
  { label: "ホーム", href: "/" },
  { label: "会社概要", href: "/about" },
  { label: "ニュース", href: "/news" },
  { label: "お問い合わせ", href: "/contact" },
] as const;

export const adminNavigation = [
  { label: "ダッシュボード", href: "/admin", icon: "dashboard" },
  { label: "ニュース管理", href: "/admin/news", icon: "news" },
] as const;

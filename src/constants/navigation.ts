export const navigation = [
  { label: "ホーム", href: "/" },
  { label: "会社概要", href: "/about" },
  { label: "事業内容", href: "/services" },
  { label: "ニュース", href: "/news" },
  { label: "ブログ", href: "/blog" },
  { label: "採用情報", href: "/careers" },
  { label: "お問い合わせ", href: "/contact" },
] as const;

export const adminNavigation = [
  { label: "ダッシュボード", href: "/admin", icon: "dashboard" },
  { label: "ニュース管理", href: "/admin/news", icon: "news" },
  { label: "ブログ管理", href: "/admin/blog", icon: "blog" },
] as const;

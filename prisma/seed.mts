import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { hash } from "bcryptjs";

neonConfig.webSocketConstructor = ws;

const clientModule = await import("../src/generated/prisma/client.js");
const PrismaClient = clientModule.PrismaClient;
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await hash(
    process.env.ADMIN_PASSWORD || "admin123",
    12
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@example.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      hashedPassword,
      name: "管理者",
      role: "admin",
    },
  });

  console.log("Admin user created:", admin.email);

  const newsData = [
    {
      title: "AIを活用した新しいDXソリューションの提供を開始",
      slug: "ai-dx-solution-launch",
      content:
        "<h2>サービス概要</h2><p>当社は、最新のAI技術を活用した新しいDXソリューション「SmartDX」の提供を開始いたしました。</p><p>SmartDXは、企業の業務プロセスをAIで分析し、最適な自動化・効率化を提案するクラウドサービスです。導入企業は平均30%の業務効率改善を実現しています。</p><h2>主な特徴</h2><ul><li>AIによる業務プロセスの自動分析</li><li>カスタマイズ可能な自動化ワークフロー</li><li>リアルタイムダッシュボードによる可視化</li><li>既存システムとのシームレスな連携</li></ul><p>詳しくはお問い合わせください。</p>",
      excerpt: "最新のAI技術を活用した新しいDXソリューション「SmartDX」の提供を開始。平均30%の業務効率改善を実現。",
      category: "press",
      status: "published",
      publishedAt: new Date("2026-01-15"),
      authorId: admin.id,
    },
    {
      title: "シリーズAラウンドで5億円の資金調達を実施",
      slug: "series-a-funding",
      content:
        "<p>株式会社サンプルは、シリーズAラウンドにおいて、総額5億円の資金調達を実施いたしましたのでお知らせいたします。</p><h2>調達の目的</h2><p>今回の資金調達により、以下の領域への投資を加速してまいります。</p><ul><li>AIリサーチチームの拡充</li><li>プロダクト開発の加速</li><li>海外展開の準備</li></ul><p>引き続き、テクノロジーで社会課題を解決するという使命のもと、事業拡大に努めてまいります。</p>",
      excerpt: "シリーズAラウンドにおいて、総額5億円の資金調達を実施。AI研究開発とプロダクト開発を加速。",
      category: "press",
      status: "published",
      publishedAt: new Date("2026-01-08"),
      authorId: admin.id,
    },
    {
      title: "年末年始の営業について",
      slug: "year-end-notice-2025",
      content:
        "<p>平素は格別のお引き立てを賜り、厚く御礼申し上げます。</p><p>誠に勝手ながら、下記の期間を年末年始休業とさせていただきます。</p><h2>休業期間</h2><p>2025年12月28日（土）〜 2026年1月5日（日）</p><p>2026年1月6日（月）より通常営業いたします。</p><p>休業期間中のお問い合わせにつきましては、1月6日以降に順次対応させていただきます。</p>",
      excerpt: "年末年始の休業期間のお知らせ。12月28日〜1月5日。",
      category: "info",
      status: "published",
      publishedAt: new Date("2025-12-20"),
      authorId: admin.id,
    },
    {
      title: "オフィスを渋谷から千代田区に移転しました",
      slug: "office-relocation",
      content:
        "<p>この度、事業拡大に伴い、オフィスを千代田区に移転いたしましたのでお知らせいたします。</p><h2>新オフィス住所</h2><p>〒100-0001 東京都千代田区千代田1-1-1 サンプルビル 10F</p><p>より良い環境で、お客様へのサービス向上に努めてまいります。</p>",
      excerpt: "事業拡大に伴いオフィスを千代田区に移転。新オフィスでさらなるサービス向上を目指します。",
      category: "news",
      status: "published",
      publishedAt: new Date("2025-11-01"),
      authorId: admin.id,
    },
  ];

  for (const data of newsData) {
    await prisma.news.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
  }
  console.log("Sample news created:", newsData.length, "items");

  const blogData = [
    {
      title: "Next.js App Router移行ガイド：Pages Routerからの段階的移行戦略",
      slug: "nextjs-app-router-migration",
      content:
        '<h2>はじめに</h2><p>Next.js 13から導入されたApp Routerは、React Server Componentsをベースとした新しいルーティングシステムです。本記事では、Pages RouterからApp Routerへの段階的な移行戦略を解説します。</p><h2>移行の準備</h2><p>まず、プロジェクトの依存関係を最新版にアップデートしましょう。</p><pre><code>npm install next@latest react@latest react-dom@latest</code></pre><h2>ステップ1: app ディレクトリの作成</h2><p>既存の <code>pages</code> ディレクトリと並行して <code>app</code> ディレクトリを作成します。</p><h2>まとめ</h2><p>App Routerへの移行は段階的に行うことができます。まずは新しいページからApp Routerで作成し、既存ページは必要に応じて徐々に移行していくことをお勧めします。</p>',
      excerpt: "Pages RouterからApp Routerへの段階的な移行戦略を、実践的なステップで解説します。",
      category: "tech",
      tags: "Next.js,React,TypeScript",
      status: "published",
      publishedAt: new Date("2026-01-20"),
      authorId: admin.id,
    },
    {
      title: "エンジニアの成長を支える1on1ミーティングの設計",
      slug: "engineering-1on1-design",
      content:
        "<h2>なぜ1on1が重要なのか</h2><p>エンジニア組織において、1on1ミーティングは技術的な成長だけでなく、キャリア形成や心理的安全性の確保にも重要な役割を果たします。</p><h2>当社の1on1フレームワーク</h2><p>当社では以下のフレームワークで1on1を実施しています。</p><ul><li><strong>コンディションチェック</strong>（5分）：体調や仕事の状況を確認</li><li><strong>振り返り</strong>（15分）：前回からの進捗と学びを共有</li><li><strong>相談・議論</strong>（15分）：技術的な相談やキャリアの話</li><li><strong>ネクストアクション</strong>（5分）：次回までの目標設定</li></ul><h2>効果</h2><p>このフレームワーク導入後、エンジニア満足度調査のスコアが20%向上しました。</p>",
      excerpt: "エンジニアの成長を支える効果的な1on1ミーティングの設計と実施方法を紹介します。",
      category: "culture",
      tags: "マネジメント,組織,1on1",
      status: "published",
      publishedAt: new Date("2026-01-10"),
      authorId: admin.id,
    },
    {
      title: "Prisma ORMでSQLiteを使ったローカル開発環境の構築",
      slug: "prisma-sqlite-local-dev",
      content:
        '<h2>概要</h2><p>Prisma ORMとSQLiteを組み合わせることで、外部データベースサーバーなしで素早くローカル開発環境を構築できます。</p><h2>セットアップ</h2><pre><code>npm install @prisma/client\nnpm install -D prisma\nnpx prisma init --datasource-provider sqlite</code></pre><h2>スキーマ定義</h2><p><code>prisma/schema.prisma</code> でモデルを定義します。</p><h2>まとめ</h2><p>SQLite + Prismaの組み合わせは、プロトタイピングや個人開発に最適です。</p>',
      excerpt: "Prisma ORMとSQLiteを使った軽量なローカル開発環境の構築方法を解説します。",
      category: "tech",
      tags: "Prisma,SQLite,データベース",
      status: "published",
      publishedAt: new Date("2025-12-25"),
      authorId: admin.id,
    },
  ];

  for (const data of blogData) {
    await prisma.blogPost.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
  }
  console.log("Sample blog posts created:", blogData.length, "items");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

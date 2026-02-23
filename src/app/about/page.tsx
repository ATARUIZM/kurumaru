import type { Metadata } from "next";
import AnimatedDiv from "@/components/common/AnimatedDiv";
import SectionTitle from "@/components/common/SectionTitle";
import Card from "@/components/ui/Card";
import Breadcrumb from "@/components/common/Breadcrumb";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: "会社概要",
  description: `${siteConfig.name}の会社概要ページです。企業理念、事業内容、会社情報をご紹介します。`,
};

const companyInfo = [
  { label: "会社名", value: siteConfig.name },
  { label: "設立", value: siteConfig.founded },
  { label: "代表取締役", value: siteConfig.ceo },
  { label: "資本金", value: siteConfig.capital },
  { label: "従業員数", value: siteConfig.employees },
  { label: "所在地", value: siteConfig.address },
  { label: "Email", value: siteConfig.email },
  { label: "TEL", value: siteConfig.phone },
];

const team = [
  {
    name: "山田 太郎",
    role: "代表取締役 CEO",
    description: "大手IT企業でのエンジニア経験を経て、2020年に当社を設立。テクノロジーで社会課題を解決することを使命としている。",
  },
  {
    name: "鈴木 花子",
    role: "取締役 CTO",
    description: "AI・機械学習の研究者として10年以上のキャリアを持つ。当社の技術戦略とプロダクト開発を統括。",
  },
  {
    name: "佐藤 健一",
    role: "取締役 COO",
    description: "コンサルティングファーム出身。事業戦略の立案と組織マネジメントを担当。クライアントとの信頼関係構築に定評がある。",
  },
  {
    name: "田中 美咲",
    role: "デザイン部門 責任者",
    description: "UX/UIデザインのスペシャリスト。ユーザー中心設計の考え方でプロダクトの体験価値を最大化する。",
  },
];

export default function AboutPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "会社概要" }]} />

        {/* Mission */}
        <section className="mb-24">
          <SectionTitle title="ミッション" subtitle="私たちの使命" />
          <AnimatedDiv className="mx-auto max-w-3xl text-center">
            <p className="text-2xl font-bold leading-relaxed text-white md:text-3xl">
              テクノロジーの力で、
              <br />
              人々の可能性を広げる。
            </p>
            <p className="mt-6 text-lg text-slate-400">
              私たちは最先端のテクノロジーとクリエイティブな発想で、
              社会の課題を解決し、持続可能な未来を創造します。
              すべてのプロジェクトにおいて、品質と革新性を追求し、
              クライアントの期待を超える価値を提供します。
            </p>
          </AnimatedDiv>
        </section>

        {/* Company Info */}
        <section className="mb-24">
          <SectionTitle title="会社情報" />
          <AnimatedDiv className="mx-auto max-w-3xl">
            <Card>
              <dl className="divide-y divide-surface-border">
                {companyInfo.map((info) => (
                  <div
                    key={info.label}
                    className="flex flex-col py-4 sm:flex-row sm:items-center"
                  >
                    <dt className="mb-1 w-32 shrink-0 text-sm font-medium text-slate-400 sm:mb-0">
                      {info.label}
                    </dt>
                    <dd className="text-white">{info.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </AnimatedDiv>
        </section>

        {/* Team */}
        <section>
          <SectionTitle title="チーム" subtitle="経営メンバー" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <AnimatedDiv key={member.name} delay={i * 0.1}>
                <Card hover className="h-full text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent/20 to-accent-dark/20">
                    <span className="text-2xl font-bold text-accent">
                      {member.name[0]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{member.role}</p>
                  <p className="mt-3 text-sm text-slate-400">
                    {member.description}
                  </p>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

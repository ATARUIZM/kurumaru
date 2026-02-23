import type { Metadata } from "next";
import AnimatedDiv from "@/components/common/AnimatedDiv";
import SectionTitle from "@/components/common/SectionTitle";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "採用情報",
  description: "株式会社サンプルの採用情報ページです。一緒に未来を創る仲間を募集しています。",
};

const benefits = [
  { title: "フレックスタイム制", description: "コアタイム11:00-15:00の柔軟な勤務体制" },
  { title: "リモートワーク", description: "週3日までのリモートワークが可能" },
  { title: "書籍・研修費支援", description: "年間10万円までの学習費用を会社が負担" },
  { title: "最新機器の貸与", description: "MacBook Pro・外部モニター等を支給" },
  { title: "副業OK", description: "事前申請制で副業を許可" },
  { title: "各種社会保険完備", description: "健康保険・厚生年金・雇用保険・労災保険" },
];

const positions = [
  {
    title: "シニアフロントエンドエンジニア",
    type: "正社員",
    location: "東京（リモート可）",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "バックエンドエンジニア",
    type: "正社員",
    location: "東京（リモート可）",
    tags: ["Node.js", "Python", "AWS"],
  },
  {
    title: "AIエンジニア",
    type: "正社員",
    location: "東京（リモート可）",
    tags: ["Python", "PyTorch", "LLM"],
  },
  {
    title: "プロジェクトマネージャー",
    type: "正社員",
    location: "東京",
    tags: ["PM", "Agile", "Scrum"],
  },
];

export default function CareersPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "採用情報" }]} />

        {/* Hero */}
        <section className="mb-24 text-center">
          <AnimatedDiv>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              一緒に<span className="text-accent">未来</span>を創ろう
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              私たちは、テクノロジーで社会を変えるという志を持った仲間を探しています。
              多様なバックグラウンドを持つメンバーと共に、挑戦し成長できる環境があります。
            </p>
          </AnimatedDiv>
        </section>

        {/* Culture */}
        <section className="mb-24">
          <SectionTitle title="カルチャー" subtitle="私たちが大切にしていること" />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              { title: "挑戦と成長", description: "新しい技術やアイデアに積極的にチャレンジし、失敗から学ぶ文化を大切にしています。" },
              { title: "オープンコミュニケーション", description: "役職や年次に関係なく、誰もが意見を言える風通しの良い組織を目指しています。" },
              { title: "ワークライフバランス", description: "仕事もプライベートも充実させることで、最高のパフォーマンスを発揮できると信じています。" },
            ].map((item, i) => (
              <AnimatedDiv key={item.title} delay={i * 0.1}>
                <Card hover className="h-full text-center">
                  <h3 className="mb-3 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-24">
          <SectionTitle title="福利厚生" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <AnimatedDiv key={benefit.title} delay={i * 0.05}>
                <Card className="flex items-start gap-4">
                  <div className="shrink-0 rounded-lg bg-accent/10 p-2">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{benefit.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section>
          <SectionTitle title="募集職種" subtitle="現在募集中のポジション" />
          <div className="space-y-4">
            {positions.map((position, i) => (
              <AnimatedDiv key={position.title} delay={i * 0.1}>
                <Card hover className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {position.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                      <span>{position.type}</span>
                      <span className="text-surface-border">|</span>
                      <span>{position.location}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {position.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <Button href="/contact" variant="outline" size="sm">
                    応募する
                  </Button>
                </Card>
              </AnimatedDiv>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

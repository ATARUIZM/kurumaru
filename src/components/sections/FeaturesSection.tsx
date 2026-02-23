import AnimatedDiv from "@/components/common/AnimatedDiv";
import SectionTitle from "@/components/common/SectionTitle";
import Card from "@/components/ui/Card";

const features = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Webアプリケーション開発",
    description:
      "React/Next.jsを中心としたモダンなWebアプリケーションを設計・開発。スケーラブルで保守性の高いシステムを構築します。",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "AIソリューション",
    description:
      "機械学習・自然言語処理を活用したAIソリューションで、業務効率化と意思決定の高速化を実現します。",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "DXコンサルティング",
    description:
      "デジタルトランスフォーメーション戦略の立案から実行まで、企業の変革を包括的にサポートします。",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: "クラウドインフラ構築",
    description:
      "AWS/GCPを活用した堅牢なクラウドインフラの設計・構築・運用。セキュリティと可用性を両立します。",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="事業内容"
          subtitle="最先端のテクノロジーで、ビジネスの成長を加速させます"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <AnimatedDiv key={feature.title} delay={i * 0.1}>
              <Card hover className="h-full">
                <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </Card>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  );
}

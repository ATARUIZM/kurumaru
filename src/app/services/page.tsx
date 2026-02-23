import type { Metadata } from "next";
import AnimatedDiv from "@/components/common/AnimatedDiv";
import SectionTitle from "@/components/common/SectionTitle";
import Card from "@/components/ui/Card";
import Breadcrumb from "@/components/common/Breadcrumb";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "事業内容",
  description: "株式会社サンプルの事業内容をご紹介します。Webアプリケーション開発、AIソリューション、DXコンサルティング、クラウドインフラ構築を手がけています。",
};

const services = [
  {
    title: "Webアプリケーション開発",
    description:
      "React/Next.jsを中心としたモダンなWebアプリケーションを設計・開発します。SaaS、ECサイト、社内システムなど、あらゆるWebサービスの構築に対応。スケーラブルで保守性の高いアーキテクチャを採用し、ビジネスの成長に合わせた柔軟な拡張を実現します。",
    features: ["フルスタック開発", "SaaS構築", "API設計・開発", "パフォーマンス最適化"],
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: "AIソリューション",
    description:
      "機械学習・自然言語処理・画像認識などのAI技術を活用し、業務プロセスの自動化や意思決定支援を実現します。データの収集・分析からモデルの開発・運用まで、エンドツーエンドでサポートします。",
    features: ["機械学習モデル開発", "自然言語処理", "画像認識", "予測分析"],
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "DXコンサルティング",
    description:
      "デジタルトランスフォーメーション戦略の策定から実行支援まで、企業の変革を包括的にサポートします。現状分析、ロードマップ策定、プロジェクトマネジメントを通じて、確実なDX推進を実現します。",
    features: ["DX戦略策定", "業務プロセス改革", "テクノロジー選定", "チェンジマネジメント"],
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "クラウドインフラ構築",
    description:
      "AWS/GCPを活用した堅牢なクラウドインフラの設計・構築・運用を行います。セキュリティと可用性を両立したアーキテクチャで、ビジネスの安定運用と成長を支えます。",
    features: ["AWS/GCP設計", "コンテナ化・Kubernetes", "CI/CDパイプライン", "セキュリティ対策"],
    icon: (
      <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

export default function ServicesPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "事業内容" }]} />

        <SectionTitle
          title="事業内容"
          subtitle="テクノロジーの力で、ビジネスの課題を解決します"
        />

        <div className="space-y-12">
          {services.map((service, i) => (
            <AnimatedDiv key={service.title} delay={i * 0.1}>
              <Card className="p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                  <div className="shrink-0">
                    <div className="inline-flex rounded-xl bg-accent/10 p-4 text-accent">
                      {service.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-4 text-2xl font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="mb-6 text-slate-400 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-surface-border bg-surface px-3 py-1 text-sm text-slate-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedDiv>
          ))}
        </div>

        <AnimatedDiv className="mt-16 text-center">
          <p className="mb-6 text-lg text-slate-400">
            詳しいサービス内容については、お気軽にお問い合わせください。
          </p>
          <Button href="/contact" size="lg">
            お問い合わせ
          </Button>
        </AnimatedDiv>
      </div>
    </div>
  );
}

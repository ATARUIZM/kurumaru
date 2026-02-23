import AnimatedDiv from "@/components/common/AnimatedDiv";
import Button from "@/components/ui/Button";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-dark/20 via-accent/10 to-accent-dark/20" />
      <div className="absolute inset-0 bg-navy-950/80" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <AnimatedDiv>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            お車のことなら何でもお気軽にご相談ください
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
            平塚市で自動車販売・保険・整備に関するご相談を承っております。
            まずはお気軽にお問い合わせください。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg">
              お問い合わせ
            </Button>
            <Button href="/about" variant="outline" size="lg">
              会社概要・アクセス
            </Button>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
}

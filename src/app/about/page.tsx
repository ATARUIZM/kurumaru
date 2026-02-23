import type { Metadata } from "next";
import AnimatedDiv from "@/components/common/AnimatedDiv";
import SectionTitle from "@/components/common/SectionTitle";
import Card from "@/components/ui/Card";
import Breadcrumb from "@/components/common/Breadcrumb";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: "会社概要",
  description: `${siteConfig.name}の会社概要ページです。会社情報・所在地・営業時間をご確認いただけます。`,
};

const companyInfo = [
  { label: "会社名", value: siteConfig.name },
  { label: "所在地", value: siteConfig.address },
  { label: "TEL", value: siteConfig.phone },
  { label: "営業時間", value: "10:00〜18:00" },
  { label: "定休日", value: "火曜日・第3月曜日" },
];

export default function AboutPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "会社概要" }]} />

        {/* Company Info */}
        <section className="mb-24">
          <SectionTitle title="会社概要" />
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

        {/* Access */}
        <section>
          <SectionTitle title="アクセス" />
          <AnimatedDiv className="mx-auto max-w-3xl">
            <Card>
              <p className="mb-4 text-slate-400">{siteConfig.address}</p>
              <div className="aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3250.0!2d139.35!3d35.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z44CSMjU0LTAwODcg56We5aWI5bed55yM5bmz5aOh5biC6LGK55Sw5pys6YO95Lqs77yR77yW77yZ77yV4oiS77yR!5e0!3m2!1sja!2sjp!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Card>
          </AnimatedDiv>
        </section>
      </div>
    </div>
  );
}

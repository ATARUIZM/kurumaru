import type { Metadata } from "next";
import AnimatedDiv from "@/components/common/AnimatedDiv";
import Breadcrumb from "@/components/common/Breadcrumb";
import SectionTitle from "@/components/common/SectionTitle";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社くるまるへのお問い合わせはこちらから。自動車の購入・保険・整備に関するご相談など、お気軽にご連絡ください。",
};

export default function ContactPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <SectionTitle title="お問い合わせ" subtitle="お気軽にご相談ください" />

        <div className="space-y-6">
          {/* 連絡先 */}
          <AnimatedDiv>
            <Card>
              <h2 className="mb-6 text-lg font-bold text-gray-900">連絡先</h2>
              <dl className="divide-y divide-surface-border">
                <div className="flex flex-col py-4 sm:flex-row sm:items-center">
                  <dt className="mb-1 w-16 shrink-0 text-sm font-medium text-gray-500 sm:mb-0">Tel</dt>
                  <dd>
                    <a href="tel:0463318825" className="text-accent hover:underline">
                      0463-31-8825
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col py-4 sm:flex-row sm:items-center">
                  <dt className="mb-1 w-16 shrink-0 text-sm font-medium text-gray-500 sm:mb-0">FAX</dt>
                  <dd className="text-gray-900">0463-36-3273</dd>
                </div>
                <div className="flex flex-col py-4 sm:flex-row sm:items-center">
                  <dt className="mb-1 w-16 shrink-0 text-sm font-medium text-gray-500 sm:mb-0">Mail</dt>
                  <dd>
                    <a href="mailto:kurumaru0819@gmail.com" className="text-accent hover:underline">
                      kurumaru0819@gmail.com
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 rounded-lg bg-gray-50 px-4 py-3">
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">営業時間：</span>10:00〜18:00
                  　<span className="font-medium text-gray-700">休業日：</span>火曜日・第3月曜日
                </p>
              </div>
            </Card>
          </AnimatedDiv>

          {/* 事故時の連絡先 */}
          <AnimatedDiv delay={0.1}>
            <Card>
              <h2 className="mb-2 text-lg font-bold text-gray-900">事故時の連絡先</h2>
              <p className="mb-6 text-sm text-gray-500">
                事故が発生した際は、まず安全を確保し、下記の事故受付センターへご連絡ください。
              </p>
              <dl className="divide-y divide-surface-border">
                <div className="flex flex-col py-4 sm:flex-row sm:items-center">
                  <dt className="mb-1 shrink-0 text-sm font-medium text-gray-500 sm:mb-0 sm:w-64">
                    損保ジャパン 事故受付センター
                  </dt>
                  <dd>
                    <a href="tel:0120256110" className="text-accent hover:underline">
                      0120-256-110
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col py-4 sm:flex-row sm:items-center">
                  <dt className="mb-1 shrink-0 text-sm font-medium text-gray-500 sm:mb-0 sm:w-64">
                    AIG損保 事故受付センター
                  </dt>
                  <dd>
                    <a href="tel:0120019016" className="text-accent hover:underline">
                      0120-01-9016
                    </a>
                  </dd>
                </div>
              </dl>
            </Card>
          </AnimatedDiv>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Breadcrumb from "@/components/common/Breadcrumb";
import SectionTitle from "@/components/common/SectionTitle";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社くるまるへのお問い合わせはこちらから。自動車の購入・保険・整備に関するご相談など、お気軽にご連絡ください。",
};

export default function ContactPage() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "お問い合わせ" }]} />
        <SectionTitle
          title="お問い合わせ"
          subtitle="お気軽にご相談ください"
        />
        <ContactForm />
      </div>
    </div>
  );
}

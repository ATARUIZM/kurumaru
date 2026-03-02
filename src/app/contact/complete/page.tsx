import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "お問い合わせ完了",
};

export default function ContactCompletePage() {
  return (
    <div className="flex min-h-[60vh] items-center py-24">
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <Card className="p-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
            <svg
              className="h-8 w-8 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            お問い合わせありがとうございます
          </h1>
          <p className="mb-8 text-gray-500">
            お問い合わせ内容を受け付けました。
            <br />
            担当者より折り返しご連絡いたしますので、
            <br />
            しばらくお待ちください。
          </p>

          <Button href="/">トップページに戻る</Button>
        </Card>
      </div>
    </div>
  );
}

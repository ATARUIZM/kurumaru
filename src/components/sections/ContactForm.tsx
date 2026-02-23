"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/actions/contact";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState<ContactState, FormData>(
    submitContact,
    {}
  );

  return (
    <Card className="p-8">
      <form action={formAction} className="space-y-6">
        <Input
          id="name"
          name="name"
          label="お名前 *"
          placeholder="山田 太郎"
          error={state.errors?.name?.[0]}
          required
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="メールアドレス *"
          placeholder="example@email.com"
          error={state.errors?.email?.[0]}
          required
        />

        <Input
          id="company"
          name="company"
          label="会社名"
          placeholder="株式会社サンプル"
        />

        <Input
          id="phone"
          name="phone"
          type="tel"
          label="電話番号"
          placeholder="03-1234-5678"
        />

        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            件名 *
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full rounded-lg border border-surface-border bg-navy-900 px-4 py-3 text-white transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="">選択してください</option>
            <option value="サービスに関するお問い合わせ">
              サービスに関するお問い合わせ
            </option>
            <option value="お見積もりのご依頼">お見積もりのご依頼</option>
            <option value="採用に関するお問い合わせ">
              採用に関するお問い合わせ
            </option>
            <option value="その他">その他</option>
          </select>
          {state.errors?.subject && (
            <p className="mt-1 text-sm text-red-400">
              {state.errors.subject[0]}
            </p>
          )}
        </div>

        <Textarea
          id="message"
          name="message"
          label="お問い合わせ内容 *"
          placeholder="お問い合わせ内容をご記入ください"
          rows={6}
          error={state.errors?.message?.[0]}
          required
        />

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? "送信中..." : "送信する"}
        </Button>
      </form>
    </Card>
  );
}

"use client";

import { useActionState, useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import RichTextEditor from "./RichTextEditor";
import ImageUploader from "./ImageUploader";

type FormState = {
  errors?: Record<string, string[]>;
  message?: string;
};

interface ArticleFormProps {
  type: "news" | "blog";
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  defaultValues?: {
    title?: string;
    content?: string;
    excerpt?: string;
    thumbnail?: string;
    category?: string;
    tags?: string;
    status?: string;
  };
}

const newsCategories = [
  { value: "press", label: "プレスリリース" },
  { value: "news", label: "お知らせ" },
  { value: "info", label: "IR情報" },
];

const blogCategories = [
  { value: "tech", label: "テクノロジー" },
  { value: "culture", label: "カルチャー" },
  { value: "report", label: "レポート" },
];

export default function ArticleForm({
  type,
  action,
  defaultValues = {},
}: ArticleFormProps) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    action,
    {}
  );
  const [content, setContent] = useState(defaultValues.content || "");
  const [thumbnail, setThumbnail] = useState(defaultValues.thumbnail || "");

  const categories = type === "news" ? newsCategories : blogCategories;

  return (
    <form action={formAction}>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main content area */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="space-y-6 p-6">
            <Input
              id="title"
              name="title"
              label="タイトル"
              placeholder="記事のタイトルを入力"
              defaultValue={defaultValues.title}
              error={state.errors?.title?.[0]}
              required
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                本文
              </label>
              <RichTextEditor content={content} onChange={setContent} />
              <input type="hidden" name="content" value={content} />
              {state.errors?.content && (
                <p className="mt-1 text-sm text-red-400">
                  {state.errors.content[0]}
                </p>
              )}
            </div>

            <Textarea
              id="excerpt"
              name="excerpt"
              label="概要（一覧表示用）"
              placeholder="記事の概要を入力（省略可）"
              rows={3}
              defaultValue={defaultValues.excerpt}
            />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="space-y-6 p-6">
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                ステータス
              </label>
              <select
                id="status"
                name="status"
                defaultValue={defaultValues.status || "draft"}
                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-gray-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="draft">下書き</option>
                <option value="published">公開</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                カテゴリ
              </label>
              <select
                id="category"
                name="category"
                defaultValue={
                  defaultValues.category ||
                  (type === "news" ? "press" : "tech")
                }
                className="w-full rounded-lg border border-surface-border bg-white px-4 py-3 text-gray-900 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {type === "blog" && (
              <Input
                id="tags"
                name="tags"
                label="タグ（カンマ区切り）"
                placeholder="React, Next.js, TypeScript"
                defaultValue={defaultValues.tags}
              />
            )}
          </Card>

          <Card className="p-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              サムネイル画像
            </label>
            <ImageUploader
              value={thumbnail}
              onChange={setThumbnail}
              category={type}
            />
            <input type="hidden" name="thumbnail" value={thumbnail} />
          </Card>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "保存中..." : "保存する"}
          </Button>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState, useCallback } from "react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  category?: string;
}

export default function ImageUploader({
  value,
  onChange,
  category = "general",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "アップロードに失敗しました");
          return;
        }

        onChange(data.url);
      } catch {
        setError("アップロード中にエラーが発生しました");
      } finally {
        setUploading(false);
      }
    },
    [category, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) upload(file);
    },
    [upload]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) upload(file);
    },
    [upload]
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          dragActive
            ? "border-accent bg-accent/5"
            : "border-surface-border hover:border-accent/50"
        }`}
      >
        {value ? (
          <div className="space-y-3">
            <img
              src={value}
              alt="プレビュー"
              className="mx-auto max-h-48 rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-sm text-red-400 hover:text-red-300"
            >
              削除
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <svg
              className="mx-auto h-10 w-10 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-slate-400">
              {uploading
                ? "アップロード中..."
                : "ドラッグ&ドロップまたはクリックして画像を選択"}
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              disabled={uploading}
            />
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}

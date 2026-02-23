"use client";

import { useState } from "react";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  label?: string;
}

export default function DeleteButton({
  onDelete,
  label = "削除",
}: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={async () => {
            setDeleting(true);
            await onDelete();
            setDeleting(false);
            setConfirming(false);
          }}
          disabled={deleting}
          className="rounded px-3 py-1 text-sm text-red-400 transition-colors hover:bg-red-500/10"
        >
          {deleting ? "削除中..." : "確認"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded px-3 py-1 text-sm text-slate-400 transition-colors hover:bg-surface-light"
        >
          キャンセル
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded px-3 py-1 text-sm text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
    >
      {label}
    </button>
  );
}

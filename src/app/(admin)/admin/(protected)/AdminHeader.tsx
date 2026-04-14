"use client";

import { signOut } from "next-auth/react";

export default function AdminHeader({ userName }: { userName: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-surface-border bg-white px-8">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">{userName}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="rounded-lg border border-surface-border bg-white px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          ログアウト
        </button>
      </div>
    </header>
  );
}

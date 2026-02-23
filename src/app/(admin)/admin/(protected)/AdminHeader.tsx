"use client";

import { signOut } from "next-auth/react";

export default function AdminHeader({ userName }: { userName: string }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-surface-border bg-navy-950/50 px-8 backdrop-blur">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-400">{userName}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="rounded-lg bg-surface px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-surface-light hover:text-white"
        >
          ログアウト
        </button>
      </div>
    </header>
  );
}

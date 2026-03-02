"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-surface-border bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <span className="text-sm font-bold text-white">K</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {siteConfig.nameEn}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">
              メニュー
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-700">
              会社情報
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>{siteConfig.address}</li>
              <li>TEL: {siteConfig.phone}</li>
              <li>Email: {siteConfig.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-border pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

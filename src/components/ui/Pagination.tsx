import Link from "next/link";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-12 flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="rounded-lg border border-surface-border px-4 py-2 text-sm text-slate-400 transition-colors hover:border-accent hover:text-accent"
        >
          前へ
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={cn(
            "rounded-lg px-4 py-2 text-sm transition-colors",
            page === currentPage
              ? "bg-accent text-navy-950 font-medium"
              : "border border-surface-border text-slate-400 hover:border-accent hover:text-accent"
          )}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="rounded-lg border border-surface-border px-4 py-2 text-sm text-slate-400 transition-colors hover:border-accent hover:text-accent"
        >
          次へ
        </Link>
      )}
    </nav>
  );
}

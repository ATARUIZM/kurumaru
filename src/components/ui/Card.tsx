import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-surface-border bg-surface p-6",
        hover &&
          "transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent-glow hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}

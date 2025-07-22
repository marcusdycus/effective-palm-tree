import { cn } from "@/lib/utils";

export default function IndicatorBadge({
  children,
  className,
  count,
  icon,
  bgColor,
  size = "h-3 w-3",
}: {
  children: React.ReactNode;
  className?: string;
  count?: number;
  icon?: React.ReactNode;
  bgColor?: string;
  size?: string;
}) {
  return (
    <div className={cn("relative inline-flex", className)}>
      {children}
      <div
        className={cn(
          "absolute -right-1 -top-1 z-10 flex items-center justify-center rounded-full text-xs text-white",
          bgColor,
          size,
        )}
      >
        {count !== undefined ? (
          count
        ) : icon ? (
          <span className="flex h-full w-full items-center justify-center">
            {icon}
          </span>
        ) : null}
      </div>
    </div>
  );
}

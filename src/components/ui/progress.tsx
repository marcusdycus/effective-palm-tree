"use client";

import * as React from "react";
import { useCallback, useEffect } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

const FakeProgress = ({ className }: { className?: string }) => {
  const [loadingProgress, setLoadingProgress] = React.useState(0);

  const randomInterval = useCallback(
    (depth: number) => {
      const prev = loadingProgress;
      setTimeout(
        () => {
          setLoadingProgress((prev) =>
            prev >= 100 // reset when complete
              ? 0
              : prev >= 95 // guide towards completion
                ? 100
                : prev >= 89
                  ? prev + Math.floor(Math.random() * 5) // guide towards 95%
                  : prev + Math.floor(Math.random() * 10),
          );
          randomInterval(depth + 1);
        },
        prev === 100
          ? 2000 // pause on completion before resetting
          : Math.floor(Math.random() * 1000 * (2 - 1 / depth)) + 500, // logarithmic slowdown
      );
    },
    [loadingProgress],
  );

  useEffect(() => randomInterval(1), []);

  return <Progress className={className} value={loadingProgress} />;
};

export { FakeProgress, Progress };

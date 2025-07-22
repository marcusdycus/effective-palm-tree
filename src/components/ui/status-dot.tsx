import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const statusDotVariants = cva("h-10 w-10", {
  variants: {
    variant: {
      completed: "stroke-confirm text-confirm",
      running: "stroke-sky-500 text-sky-500",
      failed: "stroke-destructive text-destructive",
      pending: "stroke-muted text-muted",
    },
  },
  defaultVariants: {
    variant: "completed",
  },
});

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusDotVariants> {}

const StatusDot = React.forwardRef<HTMLDivElement, StatusDotProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(statusDotVariants({ variant, className }))}
        ref={ref}
        {...props}
      >
        <Dot size={40} className="h-full w-full" />
      </div>
    );
  },
);
StatusDot.displayName = "StatusDot";

export { StatusDot, statusDotVariants };

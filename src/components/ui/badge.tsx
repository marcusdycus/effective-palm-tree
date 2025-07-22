import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variantStyle: {
        filled: "rounded",
        outline: "rounded border bg-transparent",
      },
      variant: {
        default: "text-primary",
        confirm: "text-confirm",
        editing: "text-editing",
        pending: "text-pending",
        destructive: "text-destructive",
        secondary: "text-secondary",
        primary: "text-primary",
        ghost: "text-ghost-foreground bg-ghost-hover border-ghost-foreground",
      },
    },
    compoundVariants: [
      {
        variantStyle: "filled",
        variant: "default",
        className: "bg-outline",
      },

      {
        variantStyle: "outline",
        variant: "default",
        className: "bg-outline border-primary",
      },

      {
        variantStyle: "filled",
        variant: "confirm",
        className: "bg-confirm-badge-bg",
      },
      {
        variantStyle: "outline",
        variant: "confirm",
        className: "bg-confirm-badge-outline-bg border-confirm",
      },
      {
        variantStyle: "outline",
        variant: "secondary",
        className: "bg-secondary-100 border-secmdary text-secondary",
      },
      {
        variantStyle: "outline",
        variant: "primary",
        className: "bg-primary-100 border-primary text-primary",
      },
      {
        variantStyle: "filled",
        variant: "editing",
        className: "bg-editing-background",
      },
      {
        variantStyle: "outline",
        variant: "editing",
        className: "bg-editing-outline-bg border-editing",
      },
      {
        variantStyle: "outline",
        variant: "ghost",
        className: "bg-ghost-hover border-ghost-foreground",
      },
      {
        variantStyle: "filled",
        variant: "pending",
        className: "bg-pending-badge-bg",
      },
      {
        variantStyle: "outline",
        variant: "pending",
        className: "bg-pending-badge-outline-bg border-pending",
      },

      {
        variantStyle: "filled",
        variant: "destructive",
        className: "bg-destructive-badge-bg",
      },
      {
        variantStyle: "outline",
        variant: "destructive",
        className: "bg-destructive-badge-outline-bg border-destructive",
      },
    ],
    defaultVariants: {
      variantStyle: "filled",
      variant: "default",
    },
  },
);
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, variantStyle, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, variantStyle }), className)}
      {...props}
    />
  );
}

function BadgeSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-row", className)}>
      <Skeleton className="h-9 w-32" />
    </div>
  );
}

export { Badge, BadgeSkeleton, badgeVariants };

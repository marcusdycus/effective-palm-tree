import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "hover:bg-primary-700 border-primary-border bg-primary text-primary-foreground",
        secondary:
          "hover:bg-secondary-700 border border-secondary bg-secondary text-primary-foreground",
        outline:
          "hover:bg-primary-50 border border-input border-primary bg-white text-primary shadow-sm hover:text-primary",
        ghost:
          "hover:bg-ghost hover:bg-ghost-hover text-ghost-foreground border-ghost-border border bg-background shadow-sm",
        confirm:
          "hover:bg-confirm-hover border border-confirm-border bg-confirm text-confirm-foreground shadow",
        destructive:
          "border-destructive-border hover:bg-destructive-hover border bg-destructive text-destructive-foreground shadow-sm",
        link: "hover:bg-outline-hover bg-background  text-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

function ButtonSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-row", className)}>
      <Skeleton className="h-9 w-32" />
    </div>
  );
}

export { Button, ButtonSkeleton, buttonVariants };

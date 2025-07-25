"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

interface AccordionTriggerProps
  extends AccordionPrimitive.AccordionTriggerProps {
  displayLeftChevron?: boolean;
  actionsMenu?: React.ReactElement;
}

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, displayLeftChevron, actionsMenu, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        `flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]_.rotateIcon]:rotate-180`,
        className,
      )}
      {...props}
    >
      {displayLeftChevron && (
        <div className="flex-start flex space-x-20">
          <ChevronDownIcon className="rotateIcon mr-4 h-5 w-5 flex-none text-muted-foreground transition-transform duration-200" />
          {children}
        </div>
      )}
      {!displayLeftChevron && (
        <React.Fragment>
          {children}
          <ChevronDownIcon className="rotateIcon h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
        </React.Fragment>
      )}
    </AccordionPrimitive.Trigger>
    {actionsMenu}
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };

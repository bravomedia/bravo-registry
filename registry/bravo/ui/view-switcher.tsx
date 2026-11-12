"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/registry/bravo/lib/utils";

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "rounded-button inset-ring-2 inset-ring-border-strong",
        line: "gap-1 bg-transparent",
        category: "gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex min-h-10 items-center justify-center gap-2 px-3 py-2 font-body text-base leading-6 font-medium whitespace-nowrap text-text-primary outline-none transition-[background-color,color,box-shadow] focus-visible:z-10 focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-border-focus data-[state=active]:focus-visible:outline-border-focus-inverse disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
        "group-data-[variant=default]/tabs-list:first:rounded-l-button group-data-[variant=default]/tabs-list:last:rounded-r-button group-data-[orientation=vertical]/tabs:group-data-[variant=default]/tabs-list:first:rounded-t-button group-data-[orientation=vertical]/tabs:group-data-[variant=default]/tabs-list:first:rounded-bl-none group-data-[orientation=vertical]/tabs:group-data-[variant=default]/tabs-list:last:rounded-b-button group-data-[orientation=vertical]/tabs:group-data-[variant=default]/tabs-list:last:rounded-tr-none group-data-[variant=default]/tabs-list:hover:bg-surface-base-hover group-data-[variant=default]/tabs-list:data-[state=active]:bg-surface-strong group-data-[variant=default]/tabs-list:data-[state=active]:text-text-primary-inverse group-data-[variant=default]/tabs-list:data-[state=active]:hover:bg-surface-strong-hover",
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:text-foreground/60 group-data-[variant=line]/tabs-list:hover:text-foreground group-data-[variant=line]/tabs-list:data-[state=active]:text-foreground after:absolute after:bg-foreground after:opacity-0 group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-1.25 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        "group-data-[variant=category]/tabs-list:rounded-badge group-data-[variant=category]/tabs-list:px-4 group-data-[variant=category]/tabs-list:inset-ring-2 group-data-[variant=category]/tabs-list:inset-ring-border-subtle group-data-[variant=category]/tabs-list:hover:inset-ring-border-strong group-data-[variant=category]/tabs-list:focus-visible:outline-offset-2 group-data-[variant=category]/tabs-list:focus-visible:outline-border-focus group-data-[variant=category]/tabs-list:data-[state=active]:bg-surface-strong group-data-[variant=category]/tabs-list:data-[state=active]:text-text-primary-inverse group-data-[variant=category]/tabs-list:data-[state=active]:inset-ring-0 group-data-[variant=category]/tabs-list:data-[state=active]:hover:bg-surface-strong-hover group-data-[variant=category]/tabs-list:data-[state=active]:focus-visible:outline-border-focus",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  Tabs as ViewSwitcher,
  TabsList as ViewSwitcherList,
  TabsTrigger as ViewSwitcherTrigger,
  TabsContent as ViewSwitcherContent,
};
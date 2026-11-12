"use client";

import * as React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/bravo/ui/view-switcher";

function CategoryTabList(props: Omit<React.ComponentProps<typeof TabsList>, "variant">) {
  return <TabsList {...props} variant="category" />;
}

export {
  Tabs as CategoryTabs,
  CategoryTabList,
  TabsTrigger as CategoryTab,
  TabsContent as CategoryTabContent,
};
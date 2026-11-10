"use client";

import * as React from "react";
import { CircleCheck, CircleX, Info, LoaderCircle, TriangleAlert, X } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

import { cn } from "@/registry/bravo/lib/utils";

function Toaster({ className, toastOptions, icons, style, ...props }: ToasterProps) {
  return (
    <Sonner
      className={cn("toaster", className)}
      closeButton
      icons={{
        success: <CircleCheck aria-hidden className="size-5 fill-text-success text-surface-base" />,
        error: <CircleX aria-hidden className="size-5 fill-text-error text-surface-base" />,
        info: <Info aria-hidden className="size-5" />,
        warning: <TriangleAlert aria-hidden className="size-5" />,
        loading: <LoaderCircle aria-hidden className="size-5 animate-spin" />,
        close: <X aria-hidden className="size-6" />,
        ...icons,
      }}
      style={{ "--width": "360px", ...style } as React.CSSProperties}
      toastOptions={{
        ...toastOptions,
        unstyled: toastOptions?.unstyled ?? true,
        closeButtonAriaLabel: toastOptions?.closeButtonAriaLabel ?? "Stäng",
        classNames: {
          ...toastOptions?.classNames,
          toast: cn("group grid w-full grid-cols-[20px_minmax(0,1fr)_32px] items-center gap-x-2 gap-y-1 rounded-default bg-surface-base p-3 font-body text-base leading-6 text-text-primary shadow-md", toastOptions?.classNames?.toast),
          icon: cn("col-start-1 row-start-1 flex size-5 items-center justify-center", toastOptions?.classNames?.icon),
          content: cn("contents", toastOptions?.classNames?.content),
          title: cn("col-span-2 col-start-1 row-start-1 min-w-0 wrap-break-word font-bold group-has-data-icon:col-span-1 group-has-data-icon:col-start-2", toastOptions?.classNames?.title),
          description: cn("col-span-2 col-start-1 row-start-2 min-w-0 wrap-break-word font-regular text-text-secondary", toastOptions?.classNames?.description),
          closeButton: cn("col-start-3 row-span-2 row-start-1 flex size-8 items-center justify-center rounded-full text-text-primary outline-none hover:bg-surface-base-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-focus", toastOptions?.classNames?.closeButton),
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
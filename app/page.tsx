import * as React from "react";
import { HelloWorld } from "@/registry/new-york/blocks/hello-world/hello-world";
import { ExampleForm } from "@/registry/new-york/blocks/example-form/example-form";
import PokemonPage from "@/registry/new-york/blocks/complex-component/page";
import { ExampleCard } from "@/registry/new-york/blocks/example-with-css/example-card";
import { H1, H2, H3, H4, H5, H6 } from "@/registry/components/typography";
// This page displays items from the custom registry.
// You are free to implement this with your own design as needed.

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-112.5 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A simple hello world component
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-100 relative">
            <HelloWorld />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-112.5 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A contact form with Zod validation.
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-125 relative">
            <ExampleForm />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-112.5 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A complex component showing hooks, libs and components.
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-100 relative">
            <PokemonPage />
          </div>
        </div>

        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-112.5 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              A login form with a CSS file.
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-100 relative">
            <ExampleCard />
          </div>
        </div>
        <div className="flex flex-col gap-4 border rounded-lg p-4 min-h-112.5 relative">
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-muted-foreground sm:pl-3">
              Typography components.
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center min-h-100 relative">
            <H1>h1 heading component</H1>
            <H2>h2 heading component</H2>
            <H3>h3 heading component</H3>
            <H4>h4 heading component</H4>
            <H5>h5 heading component</H5>
            <H6>h6 heading component</H6>
          </div>
        </div>
      </main>
    </div>
  );
}

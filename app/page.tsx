import { Info } from "lucide-react";

import { H1, H2, H3, Lead, Muted } from "@/registry/bravo/components/typography";
import { Button } from "@/registry/bravo/ui/button";
import { ButtonLink } from "@/registry/bravo/ui/button-link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/bravo/ui/card";
import { Input } from "@/registry/bravo/ui/input";
import { Label } from "@/registry/bravo/ui/label";
import { Textarea } from "@/registry/bravo/ui/textarea";

const buttonRows = [
  { label: "Solid", variant: "default" },
  { label: "Solid (inverse)", variant: "inverse", inverse: true },
  { label: "Outlined", variant: "outline" },
  { label: "Outlined (inverse)", variant: "outline-inverse", inverse: true },
  { label: "Destructive", variant: "destructive" },
] as const;

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <H1>Bravo Registry</H1>
        <Lead>Components for Bravo sites, installable with the shadcn CLI.</Lead>
      </header>

      <main className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <H2>Heading 2</H2>
            <H3>Heading 3</H3>
            <Muted>Muted text</Muted>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {buttonRows.map(({ label, variant, ...row }) => (
              <div
                key={variant}
                className={
                  "inverse" in row
                    ? "flex flex-col gap-3 rounded-lg bg-bg-section-strong p-4 text-text-primary-inverse"
                    : "flex flex-col gap-3 p-4"
                }
              >
                <span className="text-sm font-semibold">{label}</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant={variant}>Btn text</Button>
                  <Button variant={variant} disabled>
                    Btn text
                  </Button>
                  <Button variant={variant}>
                    <Info />
                    Btn text
                    <Info />
                  </Button>
                  <Button variant={variant} disabled>
                    <Info />
                    Btn text
                    <Info />
                  </Button>
                  {variant !== "destructive" && (
                    <>
                      <Button variant={variant} size="icon" aria-label="Info">
                        <Info />
                      </Button>
                      <Button
                        variant={variant}
                        size="icon"
                        aria-label="Info"
                        disabled
                      >
                        <Info />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form fields</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Button link</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-8">
            <ButtonLink href="#button-link">
              <Info />
              Btn text
              <Info />
            </ButtonLink>
            <ButtonLink href="#button-link" disabled>
              <Info />
              Btn text
              <Info />
            </ButtonLink>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

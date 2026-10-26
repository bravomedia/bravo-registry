import { H1, H2, H3, Lead, Muted } from "@/registry/bravo/components/typography";
import { Button } from "@/registry/bravo/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/bravo/ui/card";
import { Input } from "@/registry/bravo/ui/input";
import { Label } from "@/registry/bravo/ui/label";
import { Textarea } from "@/registry/bravo/ui/textarea";

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
          <CardContent className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
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
      </main>
    </div>
  );
}

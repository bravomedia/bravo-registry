import { Info } from "lucide-react";

import {
  H1,
  Heading,
  Lead,
  PreHeading,
  Text,
  TextLink,
} from "@/registry/bravo/ui/typography";
import { Button } from "@/registry/bravo/ui/button";
import { ButtonLink } from "@/registry/bravo/ui/button-link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/bravo/ui/card";
import { DateInput } from "@/registry/bravo/ui/date-input";
import { Field } from "@/registry/bravo/ui/field";
import { Input } from "@/registry/bravo/ui/input";
import { NativeSelect } from "@/registry/bravo/ui/native-select";
import { NumberInput } from "@/registry/bravo/ui/number-input";
import { PasswordInput } from "@/registry/bravo/ui/password-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bravo/ui/select";
import { ShortcutCard } from "@/registry/bravo/ui/shortcut-card";
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
        <Lead>
          Components for Bravo sites, installable with the shadcn CLI.
        </Lead>
      </header>

      <main className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <PreHeading>Pre-heading</PreHeading>
            <Heading as="h2" size="xl">
              Heading xl
            </Heading>
            <Heading as="h2" size="lg">
              Heading lg
            </Heading>
            <Heading as="h3" size="md">
              Heading md
            </Heading>
            <Heading as="h4" size="sm">
              Heading sm
            </Heading>
            <Text size="lg">Large</Text>
            <Text size="lg" weight="bold">
              Large Bold
            </Text>
            <TextLink size="lg" href="#typography">
              Large Link
            </TextLink>
            <Text>Default</Text>
            <Text weight="bold">Default Bold</Text>
            <TextLink href="#typography">Default Link</TextLink>
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

        <Card id="form-fields">
          <CardHeader>
            <CardTitle>Form fields</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Field
              label="Text"
              tooltip="Hjälptext för fältet"
              description="Description"
            >
              <Input name="text" placeholder="Placeholder" />
            </Field>
            <Field label="Text (error)" error="Error message">
              <Input name="text_error" defaultValue="Text" />
            </Field>
            <Field label="Text (disabled)" description="Description" disabled>
              <Input name="text_disabled" placeholder="Placeholder" />
            </Field>
            <Field label="Native select" description="Description">
              <NativeSelect name="native_select" placeholder="Välj alternativ">
                <option value="a">Option</option>
                <option value="b">Option 2</option>
              </NativeSelect>
            </Field>
            <Field label="Native select (error)" error="Error message">
              <NativeSelect name="native_select_error" defaultValue="a">
                <option value="a">Option</option>
              </NativeSelect>
            </Field>
            <Field label="Select" description="Description">
              <Select name="select">
                <SelectTrigger>
                  <SelectValue placeholder="Välj alternativ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Option</SelectItem>
                  <SelectItem value="b">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Select (error)" error="Error message">
              <Select name="select_error" defaultValue="a">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Option</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Select (disabled)" disabled>
              <Select name="select_disabled" defaultValue="a">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">Option</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Number" description="Description">
              <NumberInput name="number" unit="mm" placeholder="0" />
            </Field>
            <Field label="Number (error)" error="Error message">
              <NumberInput name="number_error" unit="mm" defaultValue={0} />
            </Field>
            <Field label="Password" description="Description">
              <PasswordInput name="password" />
            </Field>
            <Field label="Password (error)" error="Error message">
              <PasswordInput name="password_error" defaultValue="secret" />
            </Field>
            <Field label="Datepicker" description="Description">
              <DateInput name="date" />
            </Field>
            <Field label="Datepicker (disabled)" disabled>
              <DateInput name="date_disabled" />
            </Field>
            <Field label="Textarea" description="Description">
              <Textarea name="textarea" placeholder="Placeholder" />
            </Field>
            <Field label="Textarea (error)" error={["Error message"]}>
              <Textarea name="textarea_error" defaultValue="Text" />
            </Field>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shortcut card</CardTitle>
          </CardHeader>
          <CardContent>
            <ShortcutCard href="#form-fields" className="w-70.5">
              Form fields
            </ShortcutCard>
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

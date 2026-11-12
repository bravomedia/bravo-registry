import Link from "next/link";
import { Info, LayoutGrid, List, LoaderCircle, Search } from "lucide-react";
import type { Section } from "@bravomedia/content-platform";
import type { MediaTextSection } from "@bravomedia/content-platform-section-media-text";
import type { TextSection as TextSectionData } from "@bravomedia/content-platform-section-text";

import {
  H1,
  Heading,
  Lead,
  Meta,
  PreHeading,
  Text,
  TextLink,
  Typography,
} from "@/registry/bravo/ui/typography";
import { Button } from "@/registry/bravo/ui/button";
import { ArticleCard } from "@/registry/bravo/ui/article-card";
import { Badge } from "@/registry/bravo/ui/badge";
import { Breadcrumbs } from "@/registry/bravo/ui/breadcrumbs";
import { ButtonLink } from "@/registry/bravo/ui/button-link";
import {
  CategoryTab,
  CategoryTabContent,
  CategoryTabList,
  CategoryTabs,
} from "@/registry/bravo/ui/category-tab";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/bravo/ui/card";
import { Checkbox } from "@/registry/bravo/ui/checkbox";
import { CheckboxGroupExample } from "@/app/checkbox-group-example";
import { ContactCard } from "@/registry/bravo/ui/contact-card";
import { DateInput } from "@/registry/bravo/ui/date-input";
import { Faq, FaqContent, FaqItem, FaqTrigger } from "@/registry/bravo/ui/faq";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/bravo/ui/dialog-box";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/bravo/ui/dropdown-menu";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/bravo/ui/field";
import { Input } from "@/registry/bravo/ui/input";
import { ImageCard } from "@/registry/bravo/ui/image-card";
import { Label } from "@/registry/bravo/ui/label";
import { ButtonIcon } from "@/registry/bravo/ui/button-icon";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/bravo/ui/input-group";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/bravo/ui/native-select";
import { NumberInput } from "@/registry/bravo/ui/number-input";
import { PaginationExample } from "@/app/pagination-example";
import { PaginationProgressiveExample } from "@/app/pagination-progressive-example";
import { PasswordInput } from "@/registry/bravo/ui/password-input";
import { ProductCard } from "@/registry/bravo/ui/product-card";
import { RadioGroup, RadioGroupItem } from "@/registry/bravo/ui/radio-group";
import { SearchBar } from "@/registry/bravo/ui/search-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/bravo/ui/select";
import { SectionsPageTemplate } from "@/registry/bravo/ui/sections-page-template";
import { Divider } from "@/registry/bravo/ui/separator";
import { ShortcutCard } from "@/registry/bravo/ui/shortcut-card";
import { Textarea } from "@/registry/bravo/ui/textarea";
import { SearchBarExample } from "@/app/search-bar-example";
import { ToastExample } from "@/app/toast-example";
import { UspCard } from "@/registry/bravo/ui/usp-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/bravo/ui/tooltip";
import {
  ViewSwitcher,
  ViewSwitcherContent,
  ViewSwitcherList,
  ViewSwitcherTrigger,
} from "@/registry/bravo/ui/view-switcher";

const buttonRows = [
  { label: "Solid", variant: "default" },
  { label: "Solid (inverse)", variant: "inverse", inverse: true },
  { label: "Secondary", variant: "secondary" },
  { label: "Outlined", variant: "outline" },
  { label: "Outlined (inverse)", variant: "outline-inverse", inverse: true },
  { label: "Ghost", variant: "ghost" },
  { label: "Ghost (inverse)", variant: "ghost-inverse", inverse: true },
  { label: "Destructive", variant: "destructive" },
] as const;

const mediaTextExample: MediaTextSection = {
  mediaPosition: "left",
  media: {
    url: "/spotlight-example.png",
    type: "image",
    driver: "filesystem",
    title: "Exempelbild",
  },
  label: "En minirubrik",
  headline: "Detta är en exempelrubrik",
  body: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices tempus est nec pulvinar. Mauris non malesuada mi, eu viverra mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
          },
        ],
      },
    ],
  },
  links: [
    {
      type: "route",
      url: "#sections",
      label: "Läs mer",
      newTab: false,
      nofollow: false,
      sponsored: false,
    },
    {
      type: "url",
      url: "https://example.com",
      label: "Extern länk",
      newTab: true,
      nofollow: false,
      sponsored: false,
    },
  ],
};

const textExample: TextSectionData = {
  label: "En minirubrik",
  headline: "Detta är en exempelrubrik",
  body: mediaTextExample.body,
  links: mediaTextExample.links,
};

const sections: Section[] = [
  {
    type: "spotlight",
    data: {
      media: mediaTextExample.media,
      headline: "Exempelrubrik",
      body: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultrices tempus est nec pulvinar. Mauris non malesuada mi, eu viverra mi. Pellentesque habitant.",
              },
            ],
          },
        ],
      },
      links: mediaTextExample.links,
    },
  },
  { type: "mediaText", data: mediaTextExample },
  {
    type: "mediaText",
    data: { ...mediaTextExample, variant: "subtle", mediaPosition: "right" },
  },
  { type: "mediaText", data: { ...mediaTextExample, variant: "strong" } },
  { type: "text", data: textExample },
  { type: "text", data: { ...textExample, variant: "subtle" } },
  { type: "text", data: { ...textExample, variant: "strong" } },
];

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const requestedPage = Number((await searchParams).page);
  const currentPage = Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= 50 ? requestedPage : 25;

  return (
    <>
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
              <Heading as="h5" size="xs">
                Heading xs
              </Heading>
              <Text size="lg">Large</Text>
              <Text size="lg" weight="bold">
                Large Bold
              </Text>
              <TextLink size="lg" href="#typography">
                Large Link
              </TextLink>
              <Text>Default</Text>
              <Text weight="medium">Default Medium</Text>
              <Text weight="bold">Default Bold</Text>
              <TextLink href="#typography">Default Link</TextLink>
              <Meta>Meta lg</Meta>
              <Meta weight="bold">Meta lg bold</Meta>
              <Meta size="sm">Meta sm</Meta>
              <Meta size="sm" weight="bold">Meta sm bold</Meta>
              <Typography variant="input-value">Input value</Typography>
              <Typography variant="input-helper">Input helper</Typography>
              <Typography variant="input-label">Input label</Typography>
            </CardContent>
          </Card>

          <Card id="badge">
            <CardHeader>
              <CardTitle>Badge</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3 bg-background-subtle">
              <Badge>Standard</Badge>
              <Badge variant="secondary">Sekundär</Badge>
              <Badge variant="inverse">Inverterad</Badge>
              <Badge variant="sale">Rea</Badge>
              <Badge variant="brand">Varumärke</Badge>
              <Badge asChild variant="brand"><Link href="#badge">Länk</Link></Badge>
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
                      ? "flex flex-col gap-3 rounded-lg bg-background-strong p-4 text-text-primary-inverse"
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
                    <Button variant={variant} size="md">Btn text</Button>
                    <Button variant={variant} aria-label="Laddar" aria-busy="true" className="relative" disabled>
                      <span className="invisible">Btn text</span>
                      <LoaderCircle aria-hidden className="absolute animate-spin" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card id="article-card">
            <CardHeader>
              <CardTitle>Article card</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <ArticleCard
                src="/spotlight-example.png"
                alt=""
                heading="Nyheter från verksamheten"
                summary="Här kan du läsa mer om det senaste som händer hos oss."
                date="14 augusti 2026"
                dateTime="2026-08-14"
                href="#form-fields"
                linkText="Läs artikeln"
              />
              <ArticleCard
                asChild
                src="/spotlight-example.png"
                alt=""
                aspectRatio="3:2"
                heading="Så utvecklar vi våra tjänster"
                summary="Vi arbetar tillsammans för att göra våra tjänster bättre."
              >
                <Link href="#form-fields">Läs artikeln</Link>
              </ArticleCard>
              <ArticleCard
                className="sm:col-span-2"
                src="/spotlight-example.png"
                alt=""
                aspectRatio="2:1"
                heading="En plats för fler möjligheter"
                summary="Ta del av våra senaste initiativ och kommande aktiviteter."
                href="#form-fields"
                linkText="Läs artikeln"
              />
            </CardContent>
          </Card>

          <Card id="usp-card">
            <CardHeader>
              <CardTitle>USP card</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <UspCard
                heading="Nära till allt"
                description="Här finns plats för både vardagens behov och nya möjligheter."
                href="#usp-card"
                linkText="Läs mer"
              />
              <UspCard
                asChild
                variant="inverse"
                heading="Nära till allt"
                description="Här finns plats för både vardagens behov och nya möjligheter."
              >
                <Link href="#usp-card">Läs mer</Link>
              </UspCard>
            </CardContent>
          </Card>

          <Card id="contact-card">
            <CardHeader>
              <CardTitle>Contact card</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <ContactCard
                className="max-w-117"
                href="#contact-card"
                src="/spotlight-example.png"
                alt=""
                name="Anna Andersson"
                jobTitle="Webbutvecklare"
                email="anna.andersson@example.com"
                phone="+46 70 123 45 67"
              />
              <ContactCard
                asChild
                className="max-w-117"
                src="/spotlight-example.png"
                alt=""
                name="Erik Eriksson"
                jobTitle="Projektledare"
                email="erik.eriksson@example.com"
                phone="+46 70 234 56 78"
              >
                <Link href="#contact-card" />
              </ContactCard>
            </CardContent>
          </Card>

          <Card id="product-card">
            <CardHeader>
              <CardTitle>Product card</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <ProductCard
                href="#product-card"
                src="/spotlight-example.png"
                alt=""
                title="Produktnamn"
                metadata="Kategori eller varumärke"
                badge="Nyhet"
                price={{ amount: "499", fraction: "90" }}
              />
              <ProductCard
                asChild
                src="/spotlight-example.png"
                alt=""
                title="Produktnamn"
                metadata="Kategori eller varumärke"
                badge="Nyhet"
                price={{ amount: "499", fraction: "90" }}
                originalPrice={{ amount: "599", fraction: "90" }}
              >
                <Link href="#product-card" />
              </ProductCard>
            </CardContent>
          </Card>

          <Card id="image-card">
            <CardHeader>
              <CardTitle>Image card</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ImageCard href="#form-fields" src="/spotlight-example.png" alt="" label="Tjänster" />
                <ImageCard asChild src="/spotlight-example.png" alt="" label="Aktuellt" variant="inverse">
                  <Link href="#form-fields" />
                </ImageCard>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ImageCard href="#form-fields" src="/spotlight-example.png" alt="" label="Våra verksamheter" aspectRatio="3:2" />
                <ImageCard href="#form-fields" src="/spotlight-example.png" alt="" label="Om oss" aspectRatio="3:2" variant="inverse" />
              </div>
            </CardContent>
          </Card>

          <Card id="faq">
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Faq type="multiple" defaultValue={["contact"]}>
                <FaqItem value="contact">
                  <FaqTrigger>Hur kontaktar jag er?</FaqTrigger>
                  <FaqContent>Du kan kontakta oss via telefon eller e-post. Vi svarar så snart vi kan.</FaqContent>
                </FaqItem>
                <FaqItem value="hours">
                  <FaqTrigger>Vilka öppettider har ni?</FaqTrigger>
                  <FaqContent>Vi har öppet måndag till fredag, klockan 9 till 16.</FaqContent>
                </FaqItem>
              </Faq>
              <div className="bg-background-strong p-6">
                <Faq type="multiple" variant="inverse" defaultValue={["contact"]}>
                  <FaqItem value="contact">
                    <FaqTrigger>Hur kontaktar jag er?</FaqTrigger>
                    <FaqContent>Du kan kontakta oss via telefon eller e-post. Vi svarar så snart vi kan.</FaqContent>
                  </FaqItem>
                  <FaqItem value="hours">
                    <FaqTrigger>Vilka öppettider har ni?</FaqTrigger>
                    <FaqContent>Vi har öppet måndag till fredag, klockan 9 till 16.</FaqContent>
                  </FaqItem>
                </Faq>
              </div>
            </CardContent>
          </Card>

          <Card id="dropdown-menu">
            <CardHeader>
              <CardTitle>Dropdown menu</CardTitle>
            </CardHeader>
            <CardContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary">Öppna meny</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild><Link href="#typography"><Info aria-hidden />Text</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="#form-fields"><Info aria-hidden />Text</Link></DropdownMenuItem>
                    <DropdownMenuItem disabled><Info aria-hidden />Text</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild><Link href="#pagination"><Info aria-hidden />text</Link></DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dialog box</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Öppna dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rubrik</DialogTitle>
                    <DialogDescription>Detta är en exempeltext</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary" size="md" className="font-medium">Avbryt</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button size="md" className="font-medium">Bekräfta</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Öppna destruktiv dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ta bort</DialogTitle>
                    <DialogDescription>Är du säker på att du vill ta bort detta?</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary" size="md" className="font-medium">Avbryt</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="destructive" size="md" className="font-medium">Ta bort</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Toast</CardTitle>
            </CardHeader>
            <CardContent>
              <ToastExample />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Divider</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Text>Innehåll ovanför</Text>
              <Divider />
              <Text>Innehåll nedanför</Text>
              <div className="flex h-6 items-center gap-4">
                <Text>Vänster</Text>
                <Divider orientation="vertical" />
                <Text>Höger</Text>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tooltip</CardTitle>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">Mer information</Button>
                  </TooltipTrigger>
                  <TooltipContent>Detta är en hjälptext.</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>View switcher</CardTitle>
            </CardHeader>
            <CardContent>
              <ViewSwitcher defaultValue="list">
                <ViewSwitcherList aria-label="Välj vy">
                  <ViewSwitcherTrigger value="list"><List aria-hidden />Lista</ViewSwitcherTrigger>
                  <ViewSwitcherTrigger value="grid"><LayoutGrid aria-hidden />Rutnät</ViewSwitcherTrigger>
                </ViewSwitcherList>
                <ViewSwitcherContent value="list">
                  <ul className="font-body text-text-primary">
                    <li>Första objektet</li>
                    <li>Andra objektet</li>
                  </ul>
                </ViewSwitcherContent>
                <ViewSwitcherContent value="grid">
                  <ul className="grid grid-cols-2 gap-3 font-body text-text-primary">
                    <li className="rounded-inner bg-surface-subtle p-3">Första objektet</li>
                    <li className="rounded-inner bg-surface-subtle p-3">Andra objektet</li>
                  </ul>
                </ViewSwitcherContent>
              </ViewSwitcher>
            </CardContent>
          </Card>

          <Card id="category-tab">
            <CardHeader>
              <CardTitle>Category tab</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryTabs defaultValue="all">
                <CategoryTabList aria-label="Välj kategori">
                  <CategoryTab value="all"><Info aria-hidden />Alla</CategoryTab>
                  <CategoryTab value="news">Nyheter</CategoryTab>
                  <CategoryTab value="events">Evenemang</CategoryTab>
                </CategoryTabList>
                <CategoryTabContent value="all"><Text>Alla kategorier</Text></CategoryTabContent>
                <CategoryTabContent value="news"><Text>Senaste nyheterna</Text></CategoryTabContent>
                <CategoryTabContent value="events"><Text>Kommande evenemang</Text></CategoryTabContent>
              </CategoryTabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button icon</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {buttonRows.map(({ label, variant, ...row }) => (
                <div
                  key={variant}
                  className={
                    "inverse" in row
                      ? "flex flex-col gap-3 rounded-lg bg-background-strong p-4 text-text-primary-inverse"
                      : "flex flex-col gap-3 p-4"
                  }
                >
                  <span className="text-sm font-semibold">{label}</span>
                  <div className="flex flex-wrap items-center gap-3">
                    {(["lg", "md", "sm"] as const).map((size) => (
                      <ButtonIcon key={size} variant={variant} size={size} aria-label="Information">
                        <Info aria-hidden />
                      </ButtonIcon>
                    ))}
                    <ButtonIcon variant={variant} aria-label="Information" disabled>
                      <Info aria-hidden />
                    </ButtonIcon>
                    <ButtonIcon variant={variant} aria-label="Laddar" aria-busy="true" disabled>
                      <LoaderCircle aria-hidden className="animate-spin" />
                    </ButtonIcon>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Checkbox</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6 sm:grid-cols-2">
                <Field label="Val" className="gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox name="checkbox_checked" defaultChecked />
                    <FieldLabel className="text-base leading-6 font-regular">Valt alternativ</FieldLabel>
                  </div>
                </Field>
                <Field label="Val" className="gap-2">
                  <div className="flex items-center gap-2">
                    <Checkbox name="checkbox_unchecked" />
                    <FieldLabel className="text-base leading-6 font-regular">Ej valt alternativ</FieldLabel>
                  </div>
                </Field>
                <Field label="Val" className="gap-2" disabled>
                  <div className="flex items-center gap-2">
                    <Checkbox name="checkbox_disabled_checked" defaultChecked />
                    <FieldLabel className="text-base leading-6 font-regular group-data-[disabled=true]/field:text-text-disabled group-data-[disabled=true]/field:opacity-100">Valt alternativ</FieldLabel>
                  </div>
                </Field>
                <Field label="Val" className="gap-2" disabled>
                  <div className="flex items-center gap-2">
                    <Checkbox name="checkbox_disabled_unchecked" />
                    <FieldLabel className="text-base leading-6 font-regular group-data-[disabled=true]/field:text-text-disabled group-data-[disabled=true]/field:opacity-100">Ej valt alternativ</FieldLabel>
                  </div>
                </Field>
                <Field className="gap-2" error="Du måste göra ett val">
                  <div className="flex items-center gap-2">
                    <Checkbox name="checkbox_error" />
                    <FieldLabel className="text-base leading-6 font-regular">Bekräfta ditt val</FieldLabel>
                  </div>
                </Field>
                <CheckboxGroupExample />
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radio Group</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6 sm:grid-cols-2">
                <Field label="Välj alternativ" className="gap-2">
                  <RadioGroup name="radio_choice" defaultValue="one">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="one" id="radio-one" />
                      <Label htmlFor="radio-one" className="font-regular">Alternativ ett</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="two" id="radio-two" />
                      <Label htmlFor="radio-two" className="font-regular">Alternativ två</Label>
                    </div>
                  </RadioGroup>
                </Field>
                <Field label="Inaktiverat val" className="gap-2" disabled>
                  <RadioGroup name="radio_disabled" defaultValue="one">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="one" id="radio-disabled-one" />
                      <Label htmlFor="radio-disabled-one" className="font-regular peer-disabled:text-text-disabled">Alternativ ett</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="two" id="radio-disabled-two" />
                      <Label htmlFor="radio-disabled-two" className="font-regular peer-disabled:text-text-disabled">Alternativ två</Label>
                    </div>
                  </RadioGroup>
                </Field>
                <Field label="Bekräfta val" className="gap-2" error="Välj ett alternativ">
                  <RadioGroup name="radio_error">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="radio-error-yes" />
                      <Label htmlFor="radio-error-yes" className="font-regular">Ja</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="radio-error-no" />
                      <Label htmlFor="radio-error-no" className="font-regular">Nej</Label>
                    </div>
                  </RadioGroup>
                </Field>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Breadcrumbs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Breadcrumbs
                linkAs={Link}
                breadcrumbs={[
                  { title: "Tjänster", href: "/tjanster" },
                  { title: "Bygga och bo", href: "/tjanster/bygga-och-bo" },
                ]}
              />
              <Breadcrumbs
                breadcrumbs={[
                  { title: "Tjänster", href: { url: "/tjanster", method: "get" } },
                  { title: "Bygga och bo", href: "/tjanster/bygga-och-bo" },
                  { title: "Bygglov", href: "/tjanster/bygga-och-bo/bygglov" },
                ]}
              />
              <Breadcrumbs
                linkAs={Link}
                breadcrumbs={[
                  { title: "Tjänster", href: "/tjanster" },
                  { title: "Bygga och bo", href: "/tjanster/bygga-och-bo" },
                  { title: "Bygglov", href: "/tjanster/bygga-och-bo/bygglov" },
                  { title: "Ansökan", href: "/tjanster/bygga-och-bo/bygglov/ansokan" },
                  { title: "Handlingar", href: "/tjanster/bygga-och-bo/bygglov/ansokan/handlingar" },
                ]}
              />
            </CardContent>
          </Card>

          <Card id="pagination">
            <CardHeader>
              <CardTitle>Pagination</CardTitle>
            </CardHeader>
            <CardContent>
              <PaginationExample currentPage={currentPage} />
            </CardContent>
          </Card>

          <Card id="pagination-progressive">
            <CardHeader>
              <CardTitle>Pagination progressive</CardTitle>
            </CardHeader>
            <CardContent>
              <PaginationProgressiveExample />
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
                <NativeSelect
                  name="native_select"
                  placeholder="Välj alternativ"
                >
                  <NativeSelectOption value="a">Option</NativeSelectOption>
                  <NativeSelectOption value="b">Option 2</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field label="Native select (error)" error="Error message">
                <NativeSelect name="native_select_error" defaultValue="a">
                  <NativeSelectOption value="a">Option</NativeSelectOption>
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
              <Field label="Sök">
                <SearchBar name="query" />
              </Field>
              <SearchBarExample />
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
              <Field label="Input group" description="Description">
                <InputGroup>
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput name="search" placeholder="Sök" />
                </InputGroup>
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Field (composed)</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldSet>
                <FieldLegend>Adress</FieldLegend>
                <FieldDescription>
                  Vart ska vi skicka beställningen?
                </FieldDescription>
                <FieldGroup>
                  <Field>
                    <FieldLabel>Gatuadress</FieldLabel>
                    <Input name="street" />
                  </Field>
                  <FieldSeparator>eller</FieldSeparator>
                  <Field data-invalid>
                    <FieldLabel>Postnummer</FieldLabel>
                    <Input name="zip" aria-invalid defaultValue="123" />
                    <FieldError errors={["Ogiltigt postnummer"]} />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shortcut card</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <ShortcutCard href="#form-fields" className="w-70.5">
                Form fields
              </ShortcutCard>
              <ShortcutCard asChild className="w-70.5">
                <Link href="#form-fields">Router link</Link>
              </ShortcutCard>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button link</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {(["default", "secondary", "inverse"] as const).map((variant) => (
                <div
                  key={variant}
                  className={variant === "inverse" ? "flex flex-wrap items-center gap-8 rounded-lg bg-background-strong p-4" : "flex flex-wrap items-center gap-8 p-4"}
                >
                  <ButtonLink href="#form-fields" variant={variant}>
                    <Info aria-hidden />
                    Btn text
                    <Info aria-hidden />
                  </ButtonLink>
                  <ButtonLink href="#form-fields" variant={variant} disabled>
                    <Info aria-hidden />
                    Btn text
                    <Info aria-hidden />
                  </ButtonLink>
                </div>
              ))}
              <ButtonLink asChild><Link href="#form-fields">Form fields</Link></ButtonLink>
            </CardContent>
          </Card>
        </main>
      </div>

      <SectionsPageTemplate
        content={{ sections }}
        linkAs={Link}
        id="sections"
      />
    </>
  );
}

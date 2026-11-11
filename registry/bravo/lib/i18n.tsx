"use client"

import * as React from "react"

// Keys match lang/{locale}/bravo.php so trans("bravo") can be passed straight to the provider.
const en = {
  breadcrumbs: {
    label: "Breadcrumb",
    home: "Home",
    more: "More",
    showHidden: "Show previous pages",
  },
  dialog: {
    close: "Close",
  },
  field: {
    moreInfo: "More information",
  },
  pagination: {
    label: "Pagination",
    previous: "Previous page",
    next: "Next page",
    page: "Page :page",
    pageOf: "Page :page of :total",
  },
  paginationProgressive: {
    status: "Showing :visible of :total",
    progress: "Results shown",
    loadMore: "Load more",
  },
  passwordInput: {
    show: "Show password",
    hide: "Hide password",
  },
  searchBar: {
    placeholder: "Search...",
    clear: "Clear search",
  },
  toast: {
    close: "Close",
  },
}

type BravoStrings = typeof en
type BravoNamespace = keyof BravoStrings
type BravoStringsInput = { [K in BravoNamespace]?: Partial<BravoStrings[K]> }

const sv: BravoStrings = {
  breadcrumbs: {
    label: "Brödsmulor",
    home: "Startsida",
    more: "Fler",
    showHidden: "Visa tidigare sidor",
  },
  dialog: {
    close: "Stäng",
  },
  field: {
    moreInfo: "Mer information",
  },
  pagination: {
    label: "Sidnumrering",
    previous: "Föregående sida",
    next: "Nästa sida",
    page: "Sida :page",
    pageOf: "Sida :page av :total",
  },
  paginationProgressive: {
    status: "Visar :visible av :total",
    progress: "Visade resultat",
    loadMore: "Ladda fler",
  },
  passwordInput: {
    show: "Visa lösenord",
    hide: "Dölj lösenord",
  },
  searchBar: {
    placeholder: "Sök...",
    clear: "Rensa sökning",
  },
  toast: {
    close: "Stäng",
  },
}

const bravoStrings: Record<string, BravoStrings> = { en, sv }

const BravoI18nContext = React.createContext({ locale: "en", strings: en })

function withoutUndefined<T extends object>(values: T | undefined) {
  return Object.fromEntries(Object.entries(values ?? {}).filter(([, value]) => typeof value === "string")) as T
}

function mergeStrings(base: BravoStrings, strings: BravoStringsInput | undefined): BravoStrings {
  const merged = { ...base }

  for (const namespace of Object.keys(base) as BravoNamespace[]) {
    const overrides = strings?.[namespace]
    // trans() returns the key as a string when the lang file is missing.
    if (typeof overrides !== "object" || overrides === null) continue

    Object.assign(merged, { [namespace]: { ...base[namespace], ...withoutUndefined(overrides) } })
  }

  return merged
}

function BravoI18nProvider({
  locale = "en",
  strings,
  children,
}: {
  locale?: string
  strings?: BravoStringsInput
  children: React.ReactNode
}) {
  const value = React.useMemo(() => {
    const base = bravoStrings[locale.toLowerCase().split(/[-_]/)[0]] ?? en

    return { locale, strings: mergeStrings(base, strings) }
  }, [locale, strings])

  return <BravoI18nContext.Provider value={value}>{children}</BravoI18nContext.Provider>
}

function useBravoLocale() {
  return React.useContext(BravoI18nContext).locale
}

function useBravoStrings<K extends BravoNamespace>(namespace: K, overrides?: Partial<BravoStrings[K]>): BravoStrings[K] {
  const strings = React.useContext(BravoI18nContext).strings[namespace]

  return overrides ? { ...strings, ...withoutUndefined(overrides) } : strings
}

function interpolate(string: string, values: Record<string, string | number>) {
  return string.replace(/:(\w+)/g, (match, key: string) => (key in values ? String(values[key]) : match))
}

export {
  BravoI18nProvider,
  bravoStrings,
  interpolate,
  useBravoLocale,
  useBravoStrings,
  type BravoStrings,
  type BravoStringsInput,
}

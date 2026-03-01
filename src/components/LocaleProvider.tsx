"use client";

import { createContext, useContext, useState, useEffect, useCallback, startTransition, type ReactNode } from "react";
import { type Locale, type TranslationKey, getLocale, setLocale as persistLocale, t as translate } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "ko",
  setLocale: () => {},
  t: (key) => key,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ko");

  useEffect(() => {
    startTransition(() => {
      setLocaleState(getLocale());
    });
  }, []);

  const handleSetLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    persistLocale(l);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translate(key, locale),
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

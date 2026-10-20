import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'vi' | 'en'
export type Localized<T> = Record<Lang, T>

const STORAGE_KEY = 'durex-lang'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void }
const LangCtx = createContext<Ctx | null>(null)

function readSaved(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'vi' || v === 'en') return v
  } catch {
    /* storage blocked */
  }
  return 'vi'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readSaved)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* storage blocked */
    }
  }, [])
  const toggle = useCallback(() => setLang(lang === 'vi' ? 'en' : 'vi'), [lang, setLang])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle])
  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export function useLang() {
  const c = useContext(LangCtx)
  if (!c) throw new Error('useLang must be used inside <LangProvider>')
  return c
}

/** Picks the current-language half of a `{ vi, en }` dictionary. */
export function useT<T>(dict: Localized<T>): T {
  return dict[useLang().lang]
}

export const fmtNum = (n: number, lang: Lang) => n.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')

/** Sets the browser tab title for the current page. */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = `${title} · Durex Fetherlite`
  }, [title])
}

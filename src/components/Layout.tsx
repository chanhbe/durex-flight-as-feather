import { Suspense, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { Icon } from './ui'
import { useApp } from './AppProvider'
import { NAV, UI, type PolicyKind } from '../data/content'
import { HeartBalloon, RoundBalloon } from './Balloons'
import { useLang, type Lang } from '../i18n'

const SKIES: Record<string, string> = {
  '/': 'linear-gradient(180deg,#2587db 0%,#5aaef0 30%,#a9dbfb 65%,#f5fafe 100%)',
  '/san-pham': 'linear-gradient(180deg,#87CEEB 0%,#B9E5FB 50%,#EDF7FD 100%)',
  '/uu-dai': 'linear-gradient(180deg,#2587db 0%,#75bbf0 50%,#f5fafe 100%)',
  '/cam-nang': 'linear-gradient(180deg,#188fe5 0%,#4fb2f8 35%,#9fd8ff 70%,#f5fafe 100%)',
  '/ho-tro': 'linear-gradient(180deg,#2177c7 0%,#5ba7e8 50%,#cae6fc 100%)',
}

const TAGLINES: Record<string, Record<Lang, string>> = {
  '/san-pham': { vi: 'FETHERLITE', en: 'FETHERLITE' },
  '/uu-dai': { vi: 'CHẠM NHẸ YÊU SÂU', en: 'TOUCH LIGHTLY' },
}

function SkyBackground({ path }: { path: string }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={path}
          className="absolute inset-0"
          style={{ background: SKIES[path] ?? SKIES['/'] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
      <div className="absolute -top-16 -left-20 h-96 w-96 rounded-full bg-white/30 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-primary-fixed/40 blur-3xl" />
      <div className="absolute right-0 bottom-24 h-96 w-96 rounded-full bg-tertiary-fixed/25 blur-3xl" />
      <div className="absolute top-[18%] h-24 w-72 animate-drift rounded-full bg-white/40 blur-2xl [animation-duration:80s]" />
      <div className="absolute top-[55%] h-20 w-60 animate-drift rounded-full bg-white/35 blur-2xl [animation-delay:-35s] [animation-duration:95s]" />
      <HeartBalloon color="pink" className="absolute top-[30%] left-[4%] w-8 animate-floating opacity-50 blur-[1px] [animation-duration:6s]" />
      <HeartBalloon color="blue" className="absolute top-[70%] right-[6%] w-10 animate-floating opacity-50 blur-[1px] [animation-delay:-2s] [animation-duration:7s]" />
    </div>
  )
}

/** VI / EN pill switch with a sliding thumb. */
export function LangSwitch({ id, light }: { id: string; light?: boolean }) {
  const { lang, setLang } = useLang()
  const t = UI[lang]
  return (
    <div
      role="radiogroup"
      aria-label={t.language}
      className={`flex rounded-full p-0.5 text-[11px] font-extrabold ${light ? 'bg-white/30 backdrop-blur-md' : 'bg-white/60'}`}
    >
      {(['vi', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={lang === l}
          onClick={() => setLang(l)}
          className={`relative rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === l ? 'text-white' : light ? 'text-white/90' : 'text-primary'
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId={`lang-${id}`}
              className="absolute inset-0 -z-10 rounded-full bg-primary"
              transition={{ type: 'spring', stiffness: 500, damping: 34 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  )
}

function TopBar({ onMenu }: { onMenu: () => void }) {
  const { openBuy } = useApp()
  const { lang } = useLang()
  const t = UI[lang]
  const { pathname } = useLocation()
  const tagline = TAGLINES[pathname]?.[lang]
  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-white/40 shadow-[0_14px_35px_rgba(11,74,130,0.12)] backdrop-blur-md">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <button
          aria-label={t.menuOpen}
          onClick={onMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all hover:bg-surface-container/50 active:scale-95 md:hidden"
        >
          <Icon name="menu" className="text-[24px]" />
        </button>
        <Link
          to="/"
          aria-label={t.home}
          className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center md:static md:translate-x-0 md:items-start"
        >
          <span className="text-headline-md font-black tracking-tight text-primary uppercase">durex</span>
          {tagline && <span className="-mt-1 text-[9px] font-bold tracking-widest text-primary/75 uppercase">{tagline}</span>}
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-label-lg whitespace-nowrap transition-colors lg:px-4 ${
                  isActive ? 'text-white' : 'text-primary hover:bg-white/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="desk-nav"
                      className="absolute inset-0 -z-10 rounded-full bg-crimson shadow-crimson"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {n.label[lang]}
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LangSwitch id="top" />
          <button
            aria-label={t.buy}
            onClick={() => openBuy()}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary transition-all hover:bg-surface-container/50 active:scale-95"
          >
            <Icon name="shopping_bag" className="text-[24px]" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-crimson ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  )
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang()
  const t = UI[lang]
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            aria-label="Menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="glass-strong absolute inset-y-0 left-0 flex w-[80%] max-w-xs flex-col rounded-r-xl p-6"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-headline-md font-black text-primary uppercase">durex</span>
              <button
                aria-label={t.menuClose}
                onClick={onClose}
                autoFocus
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container"
              >
                <Icon name="close" />
              </button>
            </div>
            <nav className="space-y-2">
              {NAV.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i + 0.1 }}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-full px-4 py-3 text-label-lg transition-all ${
                        isActive ? 'bg-crimson text-white shadow-crimson' : 'text-primary hover:bg-white/60'
                      }`
                    }
                  >
                    <Icon name={n.icon} />
                    {n.label[lang]}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex items-center justify-between rounded-full bg-white/50 py-1.5 pr-1.5 pl-4">
              <span className="text-label-md text-primary">{t.language}</span>
              <LangSwitch id="drawer" />
            </div>
            <p className="mt-auto text-label-sm text-on-surface-variant">{t.campaign}</p>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BottomNav() {
  const { lang } = useLang()
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-white/60 bg-white/70 shadow-[0_-10px_30px_rgba(11,74,130,0.14)] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 pt-2">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            className={({ isActive }) =>
              `relative flex min-w-[64px] flex-col items-center justify-center rounded-full px-3 py-1 transition-transform active:scale-95 ${
                isActive ? 'text-white' : 'text-on-surface-variant hover:text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav"
                    className="absolute inset-0 -z-10 rounded-full bg-crimson shadow-crimson"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                <Icon name={n.icon} fill={isActive} className="text-[22px]" />
                <span className="text-label-sm whitespace-nowrap">{n.label[lang]}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export function Footer() {
  const { openPolicy } = useApp()
  const { lang } = useLang()
  const t = UI[lang]
  const socials = [
    { label: 'TikTok', href: 'https://www.tiktok.com/@durex', icon: 'music_note' },
    { label: 'Facebook', href: 'https://www.facebook.com/DurexVietnam', icon: 'thumb_up' },
    { label: 'Instagram', href: 'https://www.instagram.com/durex', icon: 'photo_camera' },
  ]
  const policies: { kind: PolicyKind; label: string }[] = [
    { kind: 'privacy', label: lang === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy' },
    { kind: 'terms', label: lang === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Use' },
    { kind: 'delivery', label: lang === 'vi' ? 'Chính sách giao hàng kín đáo' : 'Discreet Delivery Policy' },
    { kind: 'rules', label: lang === 'vi' ? 'Thể lệ chương trình' : 'Campaign Rules' },
  ]
  return (
    <footer className="relative mt-10 overflow-hidden">
      <img
        src="/assets/ad-play-your-way.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-right opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-navy/95" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 pt-10 pb-32 text-white md:grid-cols-3 md:px-8 md:pb-12">
        <div>
          <span className="inline-flex rounded-full border-2 border-white px-4 py-0.5 text-2xl font-bold tracking-tight lowercase">durex</span>
          <p className="mt-3 max-w-xs text-sm text-white/80">{t.footerAbout}</p>
        </div>
        <div>
          <h4 className="mb-3 text-label-sm text-white/70 uppercase">{t.follow}</h4>
          <ul className="space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-white/10 py-2 pr-5 pl-2 transition-colors hover:bg-white/20"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    <Icon name={s.icon} className="text-lg" />
                  </span>
                  <span className="text-sm font-semibold">{s.label}</span>
                  <Icon name="arrow_outward" className="text-base opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-label-sm text-white/70 uppercase">{t.policies}</h4>
          <ul className="space-y-2.5 text-sm">
            {policies.map((p) => (
              <li key={p.kind}>
                <button onClick={() => openPolicy(p.kind)} className="text-left text-white/90 hover:underline">
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[11px] text-white/60 md:col-span-3">{t.legal}</p>
      </div>
    </footer>
  )
}

const AGE_KEY = 'durex-age-ok'

function AgeGate() {
  const { lang } = useLang()
  const t = UI[lang]
  const [state, setState] = useState<'ask' | 'ok' | 'blocked'>(() => {
    try {
      return localStorage.getItem(AGE_KEY) === '1' ? 'ok' : 'ask'
    } catch {
      return 'ask'
    }
  })

  useEffect(() => {
    if (state === 'ok') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [state])

  const accept = () => {
    try {
      localStorage.setItem(AGE_KEY, '1')
    } catch {
      /* storage blocked: gate shows again next visit */
    }
    setState('ok')
  }

  return (
    <AnimatePresence>
      {state !== 'ok' && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-5"
          style={{ background: SKIES['/'] }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <HeartBalloon color="pink" className="absolute top-[10%] left-[10%] w-16 animate-floating" />
          <HeartBalloon color="blue" className="absolute top-[18%] right-[12%] w-12 animate-floating [animation-delay:-2s]" />
          <RoundBalloon color="pink" className="absolute bottom-[8%] left-[6%] w-14 animate-floating opacity-70 [animation-delay:-1s]" />
          <div className="absolute top-4 right-4">
            <LangSwitch id="gate" light />
          </div>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', damping: 22 }}
            className="glass-strong relative w-full max-w-sm rounded-xl p-7 text-center shadow-cloud"
          >
            <span className="inline-flex rounded-full border-2 border-primary px-4 py-0.5 text-2xl font-bold tracking-tight text-primary lowercase">
              durex
            </span>
            <AnimatePresence mode="wait">
              {state === 'ask' ? (
                <motion.div key="ask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-crimson text-xl font-black text-white shadow-crimson">
                    18+
                  </div>
                  <h2 id="age-title" className="mt-4 text-headline-md font-bold text-primary">
                    {t.ageTitle}
                  </h2>
                  <p className="mt-2 text-sm text-on-surface-variant">{t.ageBody}</p>
                  <div className="mt-6 space-y-2.5">
                    <button
                      onClick={accept}
                      autoFocus
                      className="w-full rounded-full bg-crimson px-6 py-3.5 text-label-lg font-bold text-white shadow-crimson transition-transform active:scale-95"
                    >
                      {t.ageYes}
                    </button>
                    <button
                      onClick={() => setState('blocked')}
                      className="w-full rounded-full border border-outline-variant/60 bg-white px-6 py-3 text-label-lg font-semibold text-on-surface-variant transition-transform active:scale-95"
                    >
                      {t.ageNo}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="blocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mx-auto mt-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-fixed text-primary">
                    <Icon name="waving_hand" className="text-3xl" />
                  </div>
                  <h2 id="age-title" className="mt-4 text-headline-md font-bold text-primary">
                    {t.ageBlockedTitle}
                  </h2>
                  <p className="mt-2 text-sm text-on-surface-variant">{t.ageBlockedBody}</p>
                  <button onClick={() => setState('ask')} className="mt-6 text-label-md font-bold text-primary hover:underline">
                    {t.ageBack}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PageLoader() {
  const { lang } = useLang()
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-primary">
      <RoundBalloon color="pink" className="h-20 w-auto animate-floating [animation-duration:1.6s]" />
      <span className="text-label-md">{UI[lang].loading}</span>
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const { lang } = useLang()
  const [menu, setMenu] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    setMenu(false)
  }, [pathname])

  return (
    <div className="relative min-h-dvh">
      <a
        href="#main"
        className="fixed top-2 left-2 z-[110] -translate-y-20 rounded-full bg-crimson px-4 py-2 text-sm font-bold text-white transition-transform focus:translate-y-0"
      >
        {UI[lang].skip}
      </a>
      <SkyBackground path={pathname} />
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-crimson" />
      <TopBar onMenu={() => setMenu(true)} />
      <Drawer open={menu} onClose={() => setMenu(false)} />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          tabIndex={-1}
          key={pathname}
          className="outline-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<PageLoader />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BottomNav />
      <AgeGate />
    </div>
  )
}

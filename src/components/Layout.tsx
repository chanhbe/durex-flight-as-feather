import { Suspense, useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import { DurexLogo, Icon } from './ui'
import { useApp } from './AppProvider'
import { NAV, UI, type PolicyKind } from '../data/content'
import { Feather, HeartBalloon, RoundBalloon } from './Balloons'
import { useLang, type Lang } from '../i18n'

const SKIES: Record<string, string> = {
  '/': 'linear-gradient(180deg, #1877cb 0%, #4da5ed 24%, #9cd3fa 54%, #eaf5fd 85%, #f5fafe 100%)',
  '/san-pham': 'linear-gradient(180deg, #1c7ecf 0%, #68b5f3 32%, #b5e1fc 65%, #f5fafe 100%)',
  '/uu-dai': 'linear-gradient(180deg, #1b73c4 0%, #58a9ee 35%, #a6d8fc 70%, #f5fafe 100%)',
  '/cam-nang': 'linear-gradient(180deg, #1571bf 0%, #4ea9f2 32%, #9ad3fb 68%, #f5fafe 100%)',
  '/ho-tro': 'linear-gradient(180deg, #186bb5 0%, #489ce4 35%, #9fd3fa 70%, #f5fafe 100%)',
}

const TAGLINES: Record<string, Record<Lang, string>> = {
  '/san-pham': { vi: 'FETHERLITE ULTRA THIN', en: 'FETHERLITE ULTRA THIN' },
  '/uu-dai': { vi: 'CHẠM NHẸ YÊU SÂU', en: 'TOUCH LIGHTLY · LOVE DEEPLY' },
  '/cam-nang': { vi: 'CẨM NANG YÊU TINH TẾ', en: 'INTIMACY & CONFIDENCE' },
  '/ho-tro': { vi: 'TƯ VẤN KÍN ĐÁO 24/7', en: 'DISCREET SUPPORT 24/7' },
}

function SkyBackground({ path }: { path: string }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          className="absolute inset-0"
          style={{ background: SKIES[path] ?? SKIES['/'] }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Atmospheric sensory glows */}
      <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-white/35 blur-3xl" />
      <div className="absolute top-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-[#8cc8ff]/30 blur-3xl" />
      <div className="absolute top-2/3 -left-20 h-[480px] w-[480px] rounded-full bg-[#ffa6ca]/20 blur-3xl" />
      <div className="absolute right-0 bottom-10 h-[520px] w-[520px] rounded-full bg-[#a1c9ff]/25 blur-3xl" />

      {/* Luminous drifting cloud wisps */}
      <div className="absolute top-[16%] h-28 w-96 animate-drift rounded-full bg-white/40 blur-3xl [animation-duration:90s]" />
      <div className="absolute top-[52%] h-24 w-80 animate-drift rounded-full bg-white/30 blur-3xl [animation-delay:-45s] [animation-duration:110s]" />

      {/* Floating background decorative balloons with subtle blur depth */}
      <HeartBalloon
        color="pink"
        className="absolute top-[28%] left-[4%] w-10 animate-floating opacity-40 blur-[1px] [animation-duration:8s]"
      />
      <HeartBalloon
        color="blue"
        className="absolute top-[68%] right-[5%] w-12 animate-floating opacity-45 blur-[1px] [animation-delay:-3s] [animation-duration:9s]"
      />
      <div className="absolute top-[45%] left-[8%] w-8 opacity-30 animate-feather-sway">
        <Feather />
      </div>
    </div>
  )
}

/** Luxury VI / EN pill switch with smooth sliding thumb */
export function LangSwitch({ id, light }: { id: string; light?: boolean }) {
  const { lang, setLang } = useLang()
  const t = UI[lang]
  return (
    <div
      role="radiogroup"
      aria-label={t.language}
      className={`flex items-center rounded-full p-1 text-[11px] font-bold tracking-wider transition-all ${
        light
          ? 'border border-white/40 bg-white/20 shadow-sm backdrop-blur-xl'
          : 'border border-white/80 bg-white/70 shadow-cloud-sm backdrop-blur-xl'
      }`}
    >
      {(['vi', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={lang === l}
          onClick={() => setLang(l)}
          className={`relative z-10 rounded-full px-2.5 py-1 uppercase transition-colors duration-200 ${
            lang === l ? 'text-white' : light ? 'text-white/90 hover:text-white' : 'text-primary hover:text-crimson'
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId={`lang-thumb-${id}`}
              className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
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
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/50 shadow-[0_10px_30px_rgba(11,74,130,0.08)] backdrop-blur-2xl transition-all duration-300">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-2.5 md:px-8">
        {/* Mobile Hamburger */}
        <button
          aria-label={t.menuOpen}
          onClick={onMenu}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/60 text-primary shadow-sm transition-all hover:bg-white active:scale-95 md:hidden"
        >
          <Icon name="menu" className="text-[22px]" />
        </button>

        {/* Brand Logo with Official Durex Lozenge */}
        <Link
          to="/"
          aria-label={t.home}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 transition-transform md:static md:translate-x-0 md:items-start"
        >
          <DurexLogo variant="blue" size="md" className="group-hover:opacity-90" />
          {tagline && (
            <span className="hidden text-[9px] font-extrabold tracking-[0.16em] text-primary/75 uppercase md:inline-block">
              {tagline}
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/80 bg-white/60 p-1.5 shadow-cloud-sm backdrop-blur-xl md:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-[14px] font-bold tracking-tight whitespace-nowrap transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-primary/90 hover:text-primary hover:bg-white/50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="desk-nav-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-crimson to-crimson-deep shadow-crimson"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  {n.label[lang]}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          <LangSwitch id="top" />
          <button
            aria-label={t.buy}
            onClick={() => openBuy()}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/70 text-primary shadow-cloud-sm backdrop-blur-xl transition-all duration-300 hover:border-crimson/40 hover:bg-white hover:text-crimson active:scale-95"
          >
            <Icon name="shopping_bag" className="text-[22px] transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-crimson ring-2 ring-white" />
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
        <motion.div
          className="fixed inset-0 z-[70] md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#06192d]/50 backdrop-blur-md" onClick={onClose} />
          <motion.aside
            aria-label="Menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="absolute inset-y-0 left-0 flex w-[84%] max-w-xs flex-col border-r border-white/80 bg-white/90 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-8 flex items-center justify-between border-b border-surface-container/60 pb-4">
              <DurexLogo variant="blue" size="md" />
              <button
                aria-label={t.menuClose}
                onClick={onClose}
                autoFocus
                className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
              >
                <Icon name="close" className="text-xl" />
              </button>
            </div>

            <nav className="space-y-2">
              {NAV.map((n, i) => (
                <motion.div
                  key={n.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                >
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 rounded-full px-4 py-3 text-label-lg font-bold tracking-tight transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-crimson to-crimson-deep text-white shadow-crimson'
                          : 'text-primary hover:bg-white/70'
                      }`
                    }
                  >
                    <Icon name={n.icon} className="text-xl" />
                    {n.label[lang]}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-8 flex items-center justify-between rounded-full border border-white/80 bg-white/70 p-2 pl-4 shadow-sm backdrop-blur-xl">
              <span className="text-label-md font-bold text-primary">{t.language}</span>
              <LangSwitch id="drawer" />
            </div>

            <div className="mt-auto border-t border-surface-container/60 pt-4">
              <p className="text-[12px] font-semibold text-primary/80">{t.campaign}</p>
              <p className="mt-1 text-[11px] text-on-surface-variant/70">Durex Official D2C Experience</p>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BottomNav() {
  const { lang } = useLang()
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 px-4 pb-2 md:hidden">
      <div className="mx-auto flex max-w-sm items-center justify-around rounded-full border border-white/80 bg-white/85 px-3 py-2 shadow-[0_12px_40px_rgba(11,74,130,0.2)] backdrop-blur-2xl ring-1 ring-white/90">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === '/'}
            className={({ isActive }) =>
              `relative flex min-w-[56px] flex-col items-center justify-center rounded-full px-2.5 py-1 transition-transform active:scale-95 ${
                isActive ? 'text-white' : 'text-on-surface-variant hover:text-primary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-crimson to-crimson-deep shadow-crimson"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <Icon name={n.icon} fill={isActive} className="text-[20px]" />
                <span className="mt-0.5 text-[10px] font-bold tracking-tight whitespace-nowrap">{n.label[lang]}</span>
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

  const trustBadges = [
    {
      icon: 'lock',
      title: lang === 'vi' ? '100% Giao Hàng Kín Đáo' : '100% Discreet Packaging',
      desc: lang === 'vi' ? 'Che tên sản phẩm trên mọi kiện hàng' : 'No product name on the box',
    },
    {
      icon: 'verified',
      title: lang === 'vi' ? '100% Chính Hãng Durex' : '100% Authentic Durex',
      desc: lang === 'vi' ? 'Nhập khẩu trực tiếp từ Reckitt Benckiser' : 'Direct from Reckitt Benckiser',
    },
    {
      icon: 'health_and_safety',
      title: lang === 'vi' ? 'Chuẩn Y Tế Quốc Tế' : 'Global Medical Standard',
      desc: lang === 'vi' ? 'Kiểm nghiệm điện tử nghiêm ngặt 5 bước' : '5-step electronic safety testing',
    },
  ]

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/20 bg-[#06192d] text-white">
      {/* Background artwork blend */}
      <img
        src="/assets/ad-play-your-way.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-right opacity-15 mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#06192d]/85 via-[#06192d]/95 to-[#001024]" />

      <div className="relative mx-auto max-w-6xl px-5 pt-12 pb-32 md:px-8 md:pb-14">
        {/* Trust Badges Bar */}
        <div className="mb-12 grid grid-cols-1 gap-4 border-b border-white/10 pb-10 md:grid-cols-3 md:gap-6">
          {trustBadges.map((badge) => (
            <div
              key={badge.title}
              className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-crimson/20 text-crimson">
                <Icon name={badge.icon} className="text-2xl" />
              </div>
              <div>
                <p className="text-label-md font-bold text-white">{badge.title}</p>
                <p className="text-[12px] text-white/70">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Links */}
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <DurexLogo variant="white" size="lg" />
            <p className="mt-4 max-w-sm text-body-md text-white/75 leading-relaxed">{t.footerAbout}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80">
                <Icon name="verified_user" className="text-sm text-crimson" /> Global Quality
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80">
                <Icon name="favorite" className="text-sm text-[#ffa6ca]" /> Better Together
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-label-sm font-extrabold tracking-wider text-white/60 uppercase">{t.follow}</h4>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 pr-5 pl-2 transition-all duration-300 hover:border-white/30 hover:bg-white/15"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:scale-110">
                      <Icon name={s.icon} className="text-base" />
                    </span>
                    <span className="text-sm font-semibold text-white/90 group-hover:text-white">{s.label}</span>
                    <Icon name="arrow_outward" className="text-sm opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-label-sm font-extrabold tracking-wider text-white/60 uppercase">{t.policies}</h4>
            <ul className="space-y-2.5 text-sm">
              {policies.map((p) => (
                <li key={p.kind}>
                  <button
                    onClick={() => openPolicy(p.kind)}
                    className="text-left text-white/75 transition-colors hover:text-white hover:underline"
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 border-t border-white/10 pt-6 text-[12px] text-white/50 leading-relaxed">
          <p>{t.legal}</p>
          <p className="mt-2 text-white/40">© {new Date().getFullYear()} Durex Vietnam. All rights reserved. Designed for Weightless Intimacy.</p>
        </div>
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
      /* storage blocked */
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
          style={{ background: 'linear-gradient(135deg, #06192d 0%, #002d62 50%, #06192d 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          {/* Ambient lighting in gate */}
          <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-crimson/20 blur-3xl animate-ambient-breathe" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#006aff]/25 blur-3xl" />

          <HeartBalloon color="pink" className="absolute top-[8%] left-[8%] w-16 animate-floating opacity-50" />
          <HeartBalloon color="blue" className="absolute top-[16%] right-[10%] w-14 animate-floating opacity-50 [animation-delay:-2s]" />
          <RoundBalloon color="pink" className="absolute bottom-[8%] left-[6%] w-14 animate-floating opacity-40 [animation-delay:-1s]" />

          <div className="absolute top-5 right-5 z-20">
            <LangSwitch id="gate" light />
          </div>

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-8 text-center text-white shadow-2xl backdrop-blur-3xl ring-1 ring-white/30"
          >
            {/* Top Specular Rim */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            <div className="flex justify-center">
              <DurexLogo variant="white" size="lg" />
            </div>

            <AnimatePresence mode="wait">
              {state === 'ask' ? (
                <motion.div key="ask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-crimson to-[#ff3366] text-2xl font-black text-white shadow-glow-red">
                    18+
                  </div>
                  <h2 id="age-title" className="mt-5 font-display text-headline-md font-extrabold tracking-tight text-white md:text-headline-lg">
                    {t.ageTitle}
                  </h2>
                  <p className="mt-2.5 text-sm text-white/80 leading-relaxed">{t.ageBody}</p>

                  <div className="mt-8 space-y-3">
                    <button
                      onClick={accept}
                      autoFocus
                      className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-[#ff2a54] via-crimson to-[#ba0a12] py-4 text-label-lg font-bold tracking-wide text-white shadow-crimson transition-all duration-300 hover:brightness-110 active:scale-95"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {t.ageYes} <Icon name="arrow_forward" className="text-lg transition-transform group-hover:translate-x-1" />
                      </span>
                    </button>
                    <button
                      onClick={() => setState('blocked')}
                      className="w-full rounded-full border border-white/20 bg-white/10 py-3.5 text-label-md font-semibold text-white/80 transition-all hover:bg-white/20 hover:text-white active:scale-95"
                    >
                      {t.ageNo}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="blocked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white">
                    <Icon name="waving_hand" className="text-3xl" />
                  </div>
                  <h2 id="age-title" className="mt-5 font-display text-headline-md font-bold text-white">
                    {t.ageBlockedTitle}
                  </h2>
                  <p className="mt-2.5 text-sm text-white/80 leading-relaxed">{t.ageBlockedBody}</p>
                  <button
                    onClick={() => setState('ask')}
                    className="mt-6 inline-flex items-center gap-2 text-label-md font-bold text-[#a1c9ff] transition-colors hover:text-white hover:underline"
                  >
                    <Icon name="arrow_back" className="text-base" /> {t.ageBack}
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-primary">
      <div className="relative">
        <RoundBalloon color="pink" className="h-20 w-auto animate-floating [animation-duration:2s]" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3 w-12 rounded-full bg-primary/10 blur-sm" />
      </div>
      <span className="font-display text-label-md font-bold tracking-wide uppercase">{UI[lang].loading}</span>
    </div>
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const { lang } = useLang()
  const [menu, setMenu] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 32 })

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

      {/* Top Reading Progress Bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-crimson via-[#ff2a54] to-primary shadow-sm"
      />

      <TopBar onMenu={() => setMenu(true)} />
      <Drawer open={menu} onClose={() => setMenu(false)} />

      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          tabIndex={-1}
          key={pathname}
          className="outline-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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

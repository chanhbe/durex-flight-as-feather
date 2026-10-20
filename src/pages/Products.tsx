import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react'
import { CtaButton, Icon, Reveal, Stars } from '../components/ui'
import { HeartBalloon } from '../components/Balloons'
import { useApp } from '../components/AppProvider'
import { PACKS, PRODUCTS, REVIEWS, STORES, formatVnd, type PackId, type StoreKey } from '../data/content'
import { useLang, useT, useTitle } from '../i18n'

const T = {
  vi: {
    title: 'Sản Phẩm',
    crumb: 'Dòng Siêu Mỏng Nhẹ',
    slogan: 'Chạm Nhẹ Yêu Sâu',
    introAlt: 'Durex Better Together – 4 dòng sản phẩm Fetherlite, Classic, Pleasuremax, Performa',
    introKicker: 'Tổng quan sản phẩm',
    introBody: '4 dòng sản phẩm – một cam kết: an toàn để thăng hoa trọn vẹn.',
    marqueeLabel: 'Dải sản phẩm Durex',
    h1: 'Bí Mật Của Sự Nhẹ Nhàng',
    h1Sub: 'Mỏng manh tựa làn mây trời, đánh thức từng điểm chạm thăng hoa chân thật nhất.',
    productAlt: 'Durex Fetherlite hộp và bao',
    invisible: 'Cảm giác vô hình',
    rotate: 'Xoay 3D',
    dragHint: 'Kéo ngang hoặc dùng phím ← → để xoay sản phẩm',
    specsTitle: 'Thông Số Kỹ Thuật',
    specsBadge: 'Chuẩn Y Tế Quốc Tế',
    specs: [
      { label: 'Độ mỏng ấn tượng', desc: 'Mỏng hơn 20% so với bao cao su thông thường.' },
      { label: 'Chất bôi trơn', text: 'Silicone Cao Cấp', desc: 'Mượt mà, không bết dính, duy trì cảm giác tự nhiên.' },
      { label: 'Kích thước chuẩn', desc: 'Vừa vặn ôm khít, thiết kế Easy-On dễ mang.' },
      { label: 'Chất liệu thuần khiết', text: 'Mủ Cao Su Tự Nhiên', desc: 'Không mùi cao su nồng, lành tính với da nhạy cảm.' },
    ],
    featuresTitle: 'Đặc Tính Nổi Bật',
    features: [
      { title: '100% Kiểm Nghiệm Điện Tử', desc: 'Mỗi chiếc bao cao su đều trải qua 5 giai đoạn kiểm định nghiêm ngặt về độ bền kéo, áp suất không khí và vi lỗ châm kim.' },
      { title: 'Kiểm Nghiệm Da Liễu An Toàn', desc: 'Được kiểm chứng không gây kích ứng cho các vùng da nhạy cảm nhất, cho sự yên tâm trọn vẹn suốt khoảnh khắc yêu.' },
      { title: 'Thiết Kế Easy-On Định Hình', desc: 'Dáng bao thông minh dễ đeo vào, có đầu chứa tinh dịch thoải mái, ngăn ngừa hiện tượng tuột hoặc tràn.' },
    ],
    feelings: [
      { kicker: 'Cảm giác tối thượng', title: 'Chạm tinh tế', desc: 'Mềm mại tựa bóng bay, gợi xúc cảm tự nhiên chân thực.' },
      { kicker: 'Êm ái dồi dào', title: 'Bôi trơn mượt', desc: 'Thêm lượng gel bôi trơn cao cấp cho từng khoảnh khắc.' },
    ],
    reviewsTitle: 'Đánh Giá Thực Tế',
    reviewsSub: 'Từ hơn 14.800 cặp đôi trẻ',
    reviewN: (n: number) => `Đánh giá ${n}`,
    secure: 'Đóng gói bảo mật 100% che tên sản phẩm',
    buyNow: 'MUA NGAY - GIAO HOẢ TỐC 2H',
    channels: 'Kênh Phân Phối Chính Hãng',
    trust: [
      { t: 'Kín Đáo Tuyệt Đối', d: 'Không in tên món hàng ngoài kiện' },
      { t: '100% Chính Hãng', d: 'Nhập khẩu trực tiếp từ Durex' },
    ],
  },
  en: {
    title: 'Products',
    crumb: 'Ultra-Thin Range',
    slogan: 'Touch Lightly, Love Deeply',
    introAlt: 'Durex Better Together – the Fetherlite, Classic, Pleasuremax and Performa range',
    introKicker: 'Product overview',
    introBody: '4 product lines – one promise: safety so you can fully let go.',
    marqueeLabel: 'Durex product range',
    h1: 'The Secret to Lightness',
    h1Sub: 'Light as a cloud, awakening every touch with the most natural feel.',
    productAlt: 'Durex Fetherlite box and condom',
    invisible: 'Barely-there feel',
    rotate: 'Rotate 3D',
    dragHint: 'Drag sideways or use ← → keys to rotate',
    specsTitle: 'Specifications',
    specsBadge: 'International medical standard',
    specs: [
      { label: 'Impressively thin', desc: '20% thinner than standard condoms.' },
      { label: 'Lubricant', text: 'Premium Silicone', desc: 'Smooth, non-sticky and natural-feeling.' },
      { label: 'Standard width', desc: 'A snug fit with an easy-on shape.' },
      { label: 'Pure material', text: 'Natural Latex', desc: 'No strong rubber smell, gentle on sensitive skin.' },
    ],
    featuresTitle: 'Key Features',
    features: [
      { title: '100% Electronically Tested', desc: 'Every condom passes 5 strict stages of testing for tensile strength, air burst pressure and pinholes.' },
      { title: 'Dermatologically Tested', desc: 'Proven not to irritate even the most sensitive skin, for complete peace of mind.' },
      { title: 'Easy-On Shaped Design', desc: 'A smart shape that goes on easily, with a comfortable reservoir tip to prevent slipping or leaks.' },
    ],
    feelings: [
      { kicker: 'Ultimate sensation', title: 'Delicate touch', desc: 'Soft as a balloon, for a genuinely natural feel.' },
      { kicker: 'Rich & silky', title: 'Smooth lubrication', desc: 'Extra premium lubricant for every moment.' },
    ],
    reviewsTitle: 'Real Reviews',
    reviewsSub: 'From 14,800+ young couples',
    reviewN: (n: number) => `Review ${n}`,
    secure: '100% discreet packaging – product name hidden',
    buyNow: 'BUY NOW – 2-HOUR EXPRESS DELIVERY',
    channels: 'Official retailers',
    trust: [
      { t: 'Totally Discreet', d: 'No product name on the parcel' },
      { t: '100% Authentic', d: 'Imported directly from Durex' },
    ],
  },
}

const SPEC_META = [
  { icon: 'compress', bg: 'bg-primary-fixed text-primary', value: 0.045, decimals: 3, unit: 'mm' },
  { icon: 'water_drop', bg: 'bg-blush/30 text-secondary', fill: true },
  { icon: 'straighten', bg: 'bg-primary-fixed text-primary', value: 52.5, decimals: 1, unit: 'mm' },
  { icon: 'eco', bg: 'bg-blush/30 text-secondary' },
]
const FEATURE_META = [
  { icon: 'verified_user', bg: 'bg-secondary' },
  { icon: 'favorite', bg: 'bg-primary' },
  { icon: 'touch_app', bg: 'bg-primary-container' },
]
const FEELING_IMG = [
  { img: '/assets/feel-touch.webp', title: 'Delicate Touch', icon: 'touch_app' },
  { img: '/assets/feel-lube.webp', title: 'Smooth Lubrication', icon: 'water_drop' },
]

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: setVal })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{val.toFixed(decimals)}</span>
}

function ProductMarquee() {
  const { openBuy } = useApp()
  const { lang } = useLang()
  const t = useT(T)
  const items = [...PRODUCTS, ...PRODUCTS]
  return (
    <section aria-label={t.marqueeLabel} className="group relative -mx-5 overflow-hidden py-2 md:mx-0 md:rounded-xl">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#a7dcf6] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#a7dcf6] to-transparent" />
      <div className="flex w-max animate-marquee gap-3 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
        {items.map((p, i) => (
          <button
            key={i}
            onClick={() => openBuy({ product: p.id })}
            tabIndex={i >= PRODUCTS.length ? -1 : 0}
            aria-hidden={i >= PRODUCTS.length || undefined}
            className="glass flex w-44 shrink-0 flex-col items-center rounded-lg p-4 text-center shadow-cloud-sm transition-transform hover:-translate-y-1 active:scale-95 md:w-56"
          >
            <div className={`mb-2 flex h-32 w-full items-center justify-center rounded-2xl bg-gradient-to-br ${p.tint} p-2`}>
              <img src={p.img} alt={`Durex ${p.name}`} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain drop-shadow-lg" />
            </div>
            <span className="text-label-lg font-bold text-primary">{p.name}</span>
            <span className="text-[11px] text-on-surface-variant">{p.tagline[lang]}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function ShowcaseCard({ pack, setPack }: { pack: PackId; setPack: (p: PackId) => void }) {
  const t = useT(T)
  const { lang } = useLang()
  const rotate = useMotionValue(0)
  const spring = useSpring(rotate, { stiffness: 80, damping: 14 })
  const shineBg = useTransform(
    spring,
    (r) => `linear-gradient(105deg, transparent ${50 + Math.sin((r * Math.PI) / 180) * 40}%, rgba(255,255,255,.55), transparent)`,
  )
  const [spinning, setSpinning] = useState(false)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    rotate.set(rotate.get() + 360)
    setTimeout(() => setSpinning(false), 1400)
  }

  return (
    <section className="relative overflow-hidden rounded-xl border-t border-white/60 bg-white/25 p-6 shadow-cloud backdrop-blur-[18px] md:p-8">
      <div className="relative z-20 mb-2 space-y-1 text-center">
        <span className="inline-block rounded-full bg-crimson px-3 py-0.5 text-label-sm text-white shadow-[0_8px_20px_rgba(229,27,36,0.35)]">
          FETHERLITE ULTRA THIN
        </span>
        <h1 className="text-headline-lg-mobile text-primary md:text-headline-lg">{t.h1}</h1>
        <p className="mx-auto max-w-xs text-body-md text-on-surface-variant">{t.h1Sub}</p>
      </div>

      <div className="relative my-1 flex h-72 w-full animate-float-slow items-center justify-center [perspective:900px] md:h-80">
        <div className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-gradient-to-tr from-white/70 to-primary-fixed/50 blur-xl" />
        <HeartBalloon color="pink" className="absolute top-0 left-[12%] z-0 w-14 animate-floating" />
        <HeartBalloon color="blue" className="absolute top-6 right-[14%] z-0 w-11 animate-floating [animation-delay:-2s]" />
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDrag={(_, info) => rotate.set(rotate.get() + info.delta.x * 1.2)}
          tabIndex={0}
          role="img"
          aria-label={t.productAlt}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') rotate.set(rotate.get() - 30)
            if (e.key === 'ArrowRight') rotate.set(rotate.get() + 30)
          }}
          style={{ rotateY: spring }}
          className="relative z-10 h-full cursor-grab rounded-2xl [transform-style:preserve-3d] active:cursor-grabbing"
        >
          <img
            src="/assets/p-fetherlite.webp"
            alt=""
            draggable={false}
            className="h-full w-auto object-contain drop-shadow-[0_18px_25px_rgba(0,94,163,0.22)] select-none"
          />
          <motion.div className="pointer-events-none absolute inset-0 mix-blend-overlay" style={{ background: shineBg }} />
        </motion.div>

        <div className="absolute bottom-4 left-1 z-20 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-2.5 py-1.5 shadow-[0_6px_18px_rgba(11,74,130,0.12)] backdrop-blur-md">
          <Icon name="air" fill className="text-[16px] text-secondary" />
          <span className="text-label-sm text-on-surface">{t.invisible}</span>
        </div>
        <button
          onClick={spin}
          className="absolute right-1 bottom-4 z-20 flex items-center gap-1 rounded-full border border-white/60 bg-primary/90 px-3 py-1.5 text-white shadow-primary backdrop-blur-md transition-transform active:scale-95"
        >
          <Icon name="360" className={`text-[16px] ${spinning ? 'animate-spin' : ''}`} />
          <span className="text-label-sm">{t.rotate}</span>
        </button>
      </div>
      <p className="-mt-1 mb-2 text-center text-[11px] text-on-surface-variant/80">{t.dragHint}</p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 pt-2">
        {PACKS.map((p) => {
          const active = p.id === pack
          return (
            <button
              key={p.id}
              onClick={() => setPack(p.id)}
              aria-pressed={active}
              className={`relative rounded-full px-4 py-1.5 text-label-md transition-colors ${
                active ? 'text-white' : 'border border-white/70 bg-white/60 text-primary hover:bg-white/90'
              }`}
            >
              {active && <motion.span layoutId="pack-pill" className="absolute inset-0 -z-10 rounded-full bg-primary shadow-primary" />}
              {p.label[lang]}
              {p.note && ` (${p.note[lang]})`}
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Reviews() {
  const t = useT(T)
  const { lang } = useLang()
  const reviews = REVIEWS[lang]
  const ref = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null
      if (!card) return
      setIdx(Math.round(el.scrollLeft / (card.offsetWidth + 12)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      const el = ref.current
      const card = el?.firstElementChild as HTMLElement | null
      if (!el || !card) return
      const next = (idx + 1) % reviews.length
      el.scrollTo({ left: next * (card.offsetWidth + 12), behavior: 'smooth' })
    }, 4000)
    return () => clearInterval(timer)
  }, [idx, paused, reviews.length])

  const go = (i: number) => {
    const el = ref.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollTo({ left: i * (card.offsetWidth + 12), behavior: 'smooth' })
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="flex items-center gap-1.5 text-headline-md text-primary">
            <Icon name="favorite" fill className="text-secondary" /> {t.reviewsTitle}
          </h2>
          <p className="text-label-sm text-on-surface-variant">{t.reviewsSub}</p>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/60 bg-white/70 px-2.5 py-1">
          <span className="text-sm font-bold text-primary">4.9</span>
          <Stars />
        </div>
      </div>
      <div
        ref={ref}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:scroll-px-0 md:px-0"
      >
        {reviews.map((r) => (
          <article
            key={r.name}
            className="flex max-w-[280px] min-w-[270px] shrink-0 snap-start flex-col justify-between rounded-lg border border-white/60 bg-white/50 p-4 shadow-[0_8px_20px_rgba(11,74,130,0.06)] backdrop-blur-md md:max-w-[320px] md:min-w-[320px]"
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-label-md font-bold text-primary">{r.name}</span>
                <span className="text-label-sm text-on-surface-variant/70">{r.when}</span>
              </div>
              <Stars className="mb-2" />
              <p className="text-sm text-on-surface-variant italic">“{r.text}”</p>
            </div>
            <div className="mt-3 flex items-center gap-1.5 border-t border-surface-variant/40 pt-2 text-xs text-primary">
              <Icon name="check_circle" fill className="text-[14px]" />
              <span>{r.via}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="flex justify-center gap-1.5">
        {reviews.map((_, i) => (
          <button
            key={i}
            aria-label={t.reviewN(i + 1)}
            aria-current={i === idx}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-primary' : 'w-1.5 bg-primary/30'}`}
          />
        ))}
      </div>
    </section>
  )
}

export function Products() {
  const t = useT(T)
  const { lang } = useLang()
  useTitle(t.title)
  const { openBuy } = useApp()
  const [pack, setPack] = useState<PackId>('3')
  const current = PACKS.find((p) => p.id === pack) ?? PACKS[0]
  const discount = Math.round((1 - current.price / current.was) * 100)

  return (
    <div className="mx-auto max-w-lg space-y-6 px-5 pt-3 pb-4 md:max-w-6xl md:space-y-10 md:px-8 md:pt-8">
      <section className="flex items-center justify-between gap-2 pt-1">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/60 px-3 py-1 text-primary shadow-sm backdrop-blur-md">
          <Icon name="clock_loader_40" fill className="text-[16px]" />
          <span className="text-label-sm uppercase">{t.crumb}</span>
        </div>
        <span className="rounded-full border border-white/50 bg-white/40 px-2.5 py-0.5 text-label-sm text-primary/80 backdrop-blur-sm">
          {t.slogan}
        </span>
      </section>

      {/* Giới thiệu sản phẩm */}
      <Reveal className="relative overflow-hidden rounded-xl shadow-cloud">
        <picture>
          <source media="(min-width: 768px)" srcSet="/assets/products-hero.webp" />
          <img src="/assets/products-hero-m.webp" alt={t.introAlt} className="aspect-square w-full object-cover md:aspect-[16/9]" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent md:hidden" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:hidden">
          <p className="text-label-sm text-white/80 uppercase">{t.introKicker}</p>
          <h2 className="font-display text-[30px] leading-tight font-extrabold text-white uppercase">Better Together</h2>
          <p className="mt-1 text-sm text-white/90">{t.introBody}</p>
        </div>
      </Reveal>

      <ProductMarquee />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
        <Reveal>
          <ShowcaseCard pack={pack} setPack={setPack} />
        </Reveal>

        <div className="space-y-6">
          <Reveal className="space-y-3">
            <div className="flex items-center justify-between gap-2 px-1">
              <h2 className="flex items-center gap-2 text-headline-md text-primary">
                <Icon name="tune" className="text-[22px]" /> {t.specsTitle}
              </h2>
              <span className="text-right text-label-sm text-primary/75">{t.specsBadge}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
              {SPEC_META.map((s, i) => {
                const txt = t.specs[i]
                return (
                  <motion.div
                    key={s.icon}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4 }}
                    className="flex flex-col justify-between rounded-lg border border-white/40 border-t-white/70 bg-white/40 p-4 shadow-cloud-sm backdrop-blur-[14px]"
                  >
                    <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full ${s.bg}`}>
                      <Icon name={s.icon} fill={s.fill} className="text-[20px]" />
                    </div>
                    <div>
                      <span className="block text-label-sm text-on-surface-variant uppercase">{txt.label}</span>
                      {s.value !== undefined ? (
                        <div className="text-headline-lg-mobile font-bold text-primary">
                          <CountUp to={s.value} decimals={s.decimals} />
                          <span className="ml-0.5 text-xs font-normal">{s.unit}</span>
                        </div>
                      ) : (
                        <div className="text-headline-md leading-tight font-bold text-primary">{txt.text}</div>
                      )}
                      <p className="mt-0.5 text-label-sm font-medium text-on-surface-variant/90">{txt.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Reveal>

          <Reveal className="rounded-xl border border-white/40 border-t-white/80 bg-white/35 p-5 shadow-cloud backdrop-blur-[16px]">
            <h3 className="mb-3 text-headline-md text-primary">{t.featuresTitle}</h3>
            <div className="space-y-3">
              {FEATURE_META.map((f, i) => (
                <motion.div
                  key={f.icon}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/60 p-3"
                >
                  <div className={`shrink-0 rounded-full p-2 text-white shadow-md ${f.bg}`}>
                    <Icon name={f.icon} className="text-[18px]" />
                  </div>
                  <div>
                    <h4 className="text-label-lg font-bold text-primary">{t.features[i].title}</h4>
                    <p className="text-sm text-on-surface-variant">{t.features[i].desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Cảm giác — 2 rounded rectangles */}
      <section className="grid gap-4 md:grid-cols-2 md:gap-6">
        {FEELING_IMG.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="group overflow-hidden rounded-xl border border-white/60 bg-white/40 shadow-cloud backdrop-blur-md">
              <div className="overflow-hidden">
                <img
                  src={f.img}
                  alt={`${f.title} – ${t.feelings[i].title}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-3 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-primary">
                  <Icon name={f.icon} fill={i === 1} />
                </span>
                <div>
                  <p className="text-label-sm text-crimson uppercase">{t.feelings[i].kicker}</p>
                  <h3 className="text-label-lg font-bold text-primary">{t.feelings[i].title}</h3>
                  <p className="text-xs text-on-surface-variant">{t.feelings[i].desc}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <Reviews />

      {/* Buy now */}
      <Reveal className="space-y-4 rounded-xl border border-white/70 bg-gradient-to-b from-white/70 to-white/40 p-5 text-center shadow-[0_16px_36px_rgba(11,74,130,0.14)] backdrop-blur-xl md:mx-auto md:max-w-xl md:p-8">
        <div className="space-y-1">
          <p className="text-label-md text-on-surface-variant">Durex Fetherlite · {current.label[lang]}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-on-surface-variant line-through">{formatVnd(current.was, lang)}</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={current.price}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-headline-lg-mobile font-bold text-crimson"
              >
                {formatVnd(current.price, lang)}
              </motion.span>
            </AnimatePresence>
            <span className="rounded-full bg-secondary-fixed px-2 py-0.5 text-label-sm text-on-secondary-fixed-variant">-{discount}%</span>
          </div>
          <p className="text-label-sm text-on-surface-variant">{t.secure}</p>
        </div>
        <CtaButton pulse className="w-full px-6 py-4 text-label-lg" onClick={() => openBuy({ product: 'fetherlite', pack })}>
          <Icon name="local_mall" fill className="text-[20px]" />
          <span className="tracking-wide">{t.buyNow}</span>
        </CtaButton>
        <div className="pt-2">
          <span className="mb-2 block text-label-sm tracking-wider text-on-surface-variant/80 uppercase">{t.channels}</span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(Object.keys(STORES) as StoreKey[]).map((k) => (
              <a
                key={k}
                href={STORES[k].url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-outline-variant/40 bg-white px-3 py-1.5 text-xs font-semibold text-primary transition-transform hover:-translate-y-0.5"
              >
                <span className="h-2 w-2 rounded-full" style={{ background: STORES[k].dot }} />
                {STORES[k].name}
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="grid grid-cols-2 gap-2 pb-2 text-center md:mx-auto md:max-w-xl">
        {t.trust.map((x, i) => (
          <div key={x.t} className="rounded-lg border border-white/50 bg-white/30 p-3 backdrop-blur-md">
            <Icon name={i === 0 ? 'lock' : 'verified'} className="mb-1 text-[20px] text-primary" />
            <span className="block text-label-sm font-bold text-primary">{x.t}</span>
            <span className="text-[10px] text-on-surface-variant">{x.d}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react'
import { CtaButton, DurexLogo, Icon, Reveal, Stars } from '../components/ui'
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
    introKicker: 'Hệ Sinh Thái Cảm Xúc',
    introTitle: 'Better Together',
    introBody: '4 dòng sản phẩm – một cam kết vững bền: an toàn tuyệt đối để xúc cảm thăng hoa trọn vẹn.',
    marqueeLabel: 'Dải sản phẩm Durex chính hãng',
    h1: 'Bí Mật Của Sự Nhẹ Nhàng',
    h1Sub: 'Mỏng manh tựa làn mây trời, đánh thức từng điểm chạm xúc cảm chân thật nhất.',
    productAlt: 'Hộp Durex Fetherlite và bao cao su siêu mỏng',
    invisible: 'Cảm giác vô hình 0.045mm',
    rotate: 'Xoay 3D',
    dragHint: 'Kéo ngang hoặc chạm phím ← → để xoay sản phẩm 360°',
    specsTitle: 'Thông Số Kỹ Thuật',
    specsBadge: 'Chuẩn Y Tế Quốc Tế ISO 4074',
    specs: [
      { label: 'Độ mỏng ấn tượng', desc: 'Mỏng hơn 20% so với bao cao su thông thường.' },
      { label: 'Chất bôi trơn', text: 'Silicone Cao Cấp', desc: 'Mượt mà, không bết dính, duy trì cảm giác tự nhiên.' },
      { label: 'Kích thước chuẩn', desc: 'Vừa vặn ôm khít 52.5mm, dáng Easy-On dễ mang.' },
      { label: 'Chất liệu thuần khiết', text: 'Mủ Cao Su Tự Nhiên', desc: 'Không mùi nồng, lành tính với mọi làn da nhạy cảm.' },
    ],
    featuresTitle: 'Đặc Tính Nổi Bật',
    features: [
      {
        title: '100% Kiểm Nghiệm Điện Tử',
        desc: 'Mỗi chiếc bao đều trải qua 5 giai đoạn kiểm nghiệm nghiêm ngặt về áp suất không khí, độ giãn kéo và vi lỗ châm kim.',
      },
      {
        title: 'Kiểm Nghiệm Da Liễu An Toàn',
        desc: 'Được kiểm chứng da liễu không gây kích ứng cho các vùng da nhạy cảm nhất, cho sự an tâm trọn vẹn suốt khoảnh khắc yêu.',
      },
      {
        title: 'Thiết Kế Easy-On Định Hình',
        desc: 'Dáng bao thông minh dễ đeo vào, đầu chứa tinh dịch thoải mái giúp ôm khít tự nhiên, ngăn ngừa hiện tượng tuột hoặc tràn.',
      },
    ],
    feelings: [
      { kicker: 'Cảm giác tối thượng', title: 'Chạm Tinh Tế', desc: 'Mềm mại tựa bóng bay lụa, gợi xúc cảm da-chạm-da chân thực.' },
      { kicker: 'Êm ái dồi dào', title: 'Bôi Trơn Mượt', desc: 'Gấp đôi lượng gel bôi trơn cao cấp cho từng chuyển động êm dịu.' },
    ],
    reviewsTitle: 'Đánh Giá Thực Tế',
    reviewsSub: 'Từ hơn 14.800+ cặp đôi đã trải nghiệm',
    reviewN: (n: number) => `Đánh giá ${n}`,
    secure: 'Đóng gói bảo mật 100% · Che tên sản phẩm trên vận đơn',
    buyNow: 'MUA NGAY - GIAO HOẢ TỐC 2H',
    channels: 'Kênh Phân Phối Chính Hãng',
    trust: [
      { t: 'Kín Đáo Tuyệt Đối', d: 'Hộp carton trơn không in tên món hàng' },
      { t: '100% Chính Hãng', d: 'Nhập khẩu trực tiếp từ Reckitt Benckiser' },
    ],
    save: 'Tiết kiệm',
  },
  en: {
    title: 'Products',
    crumb: 'Ultra-Thin Range',
    slogan: 'Touch Lightly, Love Deeply',
    introAlt: 'Durex Better Together – Fetherlite, Classic, Pleasuremax, Performa range',
    introKicker: 'Sensory Ecosystem',
    introTitle: 'Better Together',
    introBody: '4 product lines – one enduring promise: total safety for your deepest sensations to take flight.',
    marqueeLabel: 'Official Durex product range',
    h1: 'The Secret to Lightness',
    h1Sub: 'Light as a cloud, awakening every touch with the most natural skin-to-skin feeling.',
    productAlt: 'Durex Fetherlite box and ultra-thin condom',
    invisible: 'Barely-there 0.045mm',
    rotate: 'Rotate 3D',
    dragHint: 'Drag horizontally or use ← → arrow keys to spin 360°',
    specsTitle: 'Specifications',
    specsBadge: 'International ISO 4074 Standard',
    specs: [
      { label: 'Impressively thin', desc: '20% thinner than standard condoms.' },
      { label: 'Lubricant', text: 'Premium Silicone', desc: 'Smooth, non-sticky and natural feeling.' },
      { label: 'Standard width', desc: 'Snug 52.5mm fit with an ergonomic Easy-On shape.' },
      { label: 'Pure material', text: 'Natural Latex', desc: 'No strong rubber smell, gentle on sensitive skin.' },
    ],
    featuresTitle: 'Key Features',
    features: [
      {
        title: '100% Electronically Tested',
        desc: 'Every condom passes 5 strict stages of testing for tensile strength, air burst pressure and pinholes.',
      },
      {
        title: 'Dermatologically Tested',
        desc: 'Clinically proven gentle and hypoallergenic for even the most sensitive skin.',
      },
      {
        title: 'Easy-On Shaped Design',
        desc: 'Smart contoured shape with reservoir tip for easy application and complete peace of mind.',
      },
    ],
    feelings: [
      { kicker: 'Ultimate sensation', title: 'Delicate Touch', desc: 'Soft as a silk balloon for a true skin-on-skin feeling.' },
      { kicker: 'Rich & silky', title: 'Smooth Lubrication', desc: 'Extra premium silicone lubricant for seamless intimacy.' },
    ],
    reviewsTitle: 'Real Reviews',
    reviewsSub: 'From 14,800+ young couples worldwide',
    reviewN: (n: number) => `Review ${n}`,
    secure: '100% discreet packaging · No product name on parcel',
    buyNow: 'BUY NOW – 2-HOUR EXPRESS DELIVERY',
    channels: 'Official Retailers',
    trust: [
      { t: 'Totally Discreet', d: 'Plain outer box with zero product markings' },
      { t: '100% Authentic', d: 'Directly imported from Reckitt Benckiser' },
    ],
    save: 'Save',
  },
}

const SPEC_META = [
  { icon: 'compress', color: 'from-[#ff2a54] to-crimson', value: 0.045, decimals: 3, unit: 'mm' },
  { icon: 'water_drop', color: 'from-[#006aff] to-primary', fill: true },
  { icon: 'straighten', color: 'from-[#006aff] to-primary', value: 52.5, decimals: 1, unit: 'mm' },
  { icon: 'eco', color: 'from-[#ff2a54] to-[#ffa6ca]', fill: true },
]

const FEATURE_META = [
  { icon: 'verified_user', color: 'bg-gradient-to-tr from-crimson to-[#ff3366]' },
  { icon: 'favorite', color: 'bg-gradient-to-tr from-primary to-[#006aff]' },
  { icon: 'accessibility_new', color: 'bg-gradient-to-tr from-[#00508f] to-sky' },
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
    const c = animate(0, to, { duration: 1.5, ease: [0.16, 1, 0.3, 1], onUpdate: setVal })
    return () => c.stop()
  }, [inView, to])

  return <span ref={ref}>{val.toFixed(decimals)}</span>
}

/** Product marquee with luxury glass cards & brand color gradients */
function ProductMarquee() {
  const { openBuy } = useApp()
  const { lang } = useLang()
  const t = useT(T)
  const items = [...PRODUCTS, ...PRODUCTS]

  return (
    <section aria-label={t.marqueeLabel} className="group relative -mx-5 overflow-hidden py-3 md:mx-0 md:rounded-[32px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#9cd3fa] via-[#9cd3fa]/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#9cd3fa] via-[#9cd3fa]/80 to-transparent" />

      <div className="flex w-max animate-marquee gap-4 group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
        {items.map((p, i) => (
          <button
            key={i}
            onClick={() => openBuy({ product: p.id })}
            tabIndex={i >= PRODUCTS.length ? -1 : 0}
            aria-hidden={i >= PRODUCTS.length || undefined}
            className="group/card relative flex w-48 shrink-0 flex-col items-center overflow-hidden rounded-[26px] border border-white/80 bg-white/70 p-4 text-center shadow-cloud backdrop-blur-xl transition-all duration-400 hover:-translate-y-2 hover:bg-white/90 hover:shadow-luxury active:scale-95 md:w-60"
          >
            {/* Top specular reflection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

            <div className={`mb-3 flex h-36 w-full items-center justify-center rounded-[20px] bg-gradient-to-br ${p.tint} p-3 shadow-inner`}>
              <img
                src={p.img}
                alt={`Durex ${p.name}`}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)] transition-transform duration-500 ease-out group-hover/card:scale-110"
              />
            </div>

            <span className="font-display text-[15px] font-extrabold tracking-tight text-primary group-hover/card:text-crimson transition-colors">
              {p.name}
            </span>
            <span className="mt-0.5 text-[11px] font-semibold text-on-surface-variant leading-tight">
              {p.tagline[lang]}
            </span>

            <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-primary opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
              <span>{lang === 'vi' ? 'Xem chi tiết' : 'View details'}</span>
              <Icon name="arrow_forward" className="text-sm" />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

/** 3D Interactive Showcase Stage for Fetherlite */
function ShowcaseCard({ pack, setPack }: { pack: PackId; setPack: (p: PackId) => void }) {
  const t = useT(T)
  const { lang } = useLang()
  const rotate = useMotionValue(0)
  const spring = useSpring(rotate, { stiffness: 90, damping: 16 })
  const shineBg = useTransform(
    spring,
    (r) =>
      `linear-gradient(115deg, transparent ${40 + Math.sin((r * Math.PI) / 180) * 35}%, rgba(255,255,255,0.7), transparent)`,
  )
  const [spinning, setSpinning] = useState(false)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    rotate.set(rotate.get() + 360)
    setTimeout(() => setSpinning(false), 1400)
  }

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/75 p-6 shadow-luxury ring-1 ring-white/90 backdrop-blur-2xl md:p-8">
      {/* Specular hairline border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      {/* Header Badge & Title */}
      <div className="relative z-20 space-y-2 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson/25 bg-crimson/10 px-4 py-1 text-[11px] font-extrabold tracking-widest text-crimson uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" /> FETHERLITE ULTRA THIN
        </span>
        <h1 className="font-display text-headline-lg-mobile font-black tracking-tight text-primary md:text-[34px]">
          {t.h1}
        </h1>
        <p className="mx-auto max-w-sm text-body-md font-medium text-on-surface-variant leading-relaxed">
          {t.h1Sub}
        </p>
      </div>

      {/* 3D Stage with Lighting & Shadows */}
      <div className="relative my-4 flex h-76 w-full animate-float-slow items-center justify-center [perspective:1000px] md:h-84">
        {/* Soft Pedestal Aura */}
        <div className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-gradient-to-tr from-white via-[#a1c9ff]/40 to-crimson/15 blur-2xl" />

        {/* Ambient Heart Balloons */}
        <HeartBalloon color="pink" className="pointer-events-none absolute top-2 left-[8%] z-0 w-14 animate-floating opacity-60 drop-shadow-md" />
        <HeartBalloon color="blue" className="pointer-events-none absolute top-8 right-[10%] z-0 w-12 animate-floating [animation-delay:-2s] opacity-60 drop-shadow-md" />

        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-5 rounded-full bg-primary/20 blur-md" />

        {/* 3D Draggable Object */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDrag={(_, info) => rotate.set(rotate.get() + info.delta.x * 1.3)}
          tabIndex={0}
          role="img"
          aria-label={t.productAlt}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') rotate.set(rotate.get() - 30)
            if (e.key === 'ArrowRight') rotate.set(rotate.get() + 30)
          }}
          style={{ rotateY: spring }}
          className="relative z-10 flex h-full cursor-grab items-center justify-center [transform-style:preserve-3d] active:cursor-grabbing"
        >
          <img
            src="/assets/p-fetherlite.webp"
            alt=""
            draggable={false}
            className="h-full w-auto object-contain drop-shadow-[0_24px_35px_rgba(0,40,90,0.3)] select-none"
          />
          <motion.div className="pointer-events-none absolute inset-0 mix-blend-overlay rounded-2xl" style={{ background: shineBg }} />
        </motion.div>

        {/* Micro-Badges on Stage */}
        <div className="absolute bottom-3 left-2 z-20 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 shadow-cloud-sm backdrop-blur-md">
          <Icon name="air" fill className="text-[16px] text-crimson" />
          <span className="text-[11px] font-bold text-primary">{t.invisible}</span>
        </div>

        <button
          onClick={spin}
          className="group absolute right-2 bottom-3 z-20 flex items-center gap-1.5 rounded-full border border-white/80 bg-gradient-to-r from-primary to-[#006aff] px-3.5 py-1.5 text-white shadow-primary backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Icon name="360" className={`text-[17px] transition-transform ${spinning ? 'animate-spin' : 'group-hover:rotate-180'}`} />
          <span className="text-[11px] font-bold tracking-wide uppercase">{t.rotate}</span>
        </button>
      </div>

      <p className="mt-1 mb-4 text-center text-[11px] font-semibold text-on-surface-variant/70">
        <Icon name="touch_app" className="inline text-sm align-text-bottom mr-1" />
        {t.dragHint}
      </p>

      {/* Pack Size Selector with savings badge */}
      <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 border-t border-surface-container/60 pt-4">
        {PACKS.map((p) => {
          const active = p.id === pack
          const savePct = Math.round((1 - p.price / p.was) * 100)
          return (
            <button
              key={p.id}
              onClick={() => setPack(p.id)}
              aria-pressed={active}
              className={`group relative flex items-center gap-2 rounded-full px-5 py-2 text-label-md font-bold transition-all duration-300 active:scale-95 ${
                active
                  ? 'text-white shadow-primary'
                  : 'border border-white/80 bg-white/60 text-primary hover:bg-white hover:border-primary/30'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="pack-active-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary via-[#006aff] to-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span>{p.label[lang]}</span>
              {p.id === '12' && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${
                    active ? 'bg-crimson text-white' : 'bg-crimson/15 text-crimson'
                  }`}
                >
                  {t.save} {savePct}%
                </span>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}

/** Reviews Testimonials Carousel */
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
      setIdx(Math.round(el.scrollLeft / (card.offsetWidth + 16)))
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
      el.scrollTo({ left: next * (card.offsetWidth + 16), behavior: 'smooth' })
    }, 4500)
    return () => clearInterval(timer)
  }, [idx, paused, reviews.length])

  const go = (i: number) => {
    const el = ref.current
    const card = el?.firstElementChild as HTMLElement | null
    if (el && card) el.scrollTo({ left: i * (card.offsetWidth + 16), behavior: 'smooth' })
  }

  return (
    <section className="space-y-4 pt-4">
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-crimson/20 bg-crimson/10 px-3 py-0.5 text-[11px] font-bold tracking-wider text-crimson uppercase">
            <Icon name="verified" className="text-xs" /> Verified Customer Feedback
          </div>
          <h2 className="mt-1 font-display text-headline-md font-black tracking-tight text-primary md:text-headline-lg">
            {t.reviewsTitle}
          </h2>
          <p className="text-label-sm text-on-surface-variant font-medium">{t.reviewsSub}</p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-1.5 shadow-cloud-sm backdrop-blur-xl">
          <span className="font-display text-base font-black text-primary">4.9</span>
          <Stars />
          <span className="text-[11px] font-semibold text-on-surface-variant/70">/ 5.0</span>
        </div>
      </div>

      <div
        ref={ref}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 py-2 md:mx-0 md:scroll-px-0 md:px-0"
      >
        {reviews.map((r) => (
          <article
            key={r.name}
            className="group relative flex max-w-[290px] min-w-[280px] shrink-0 snap-start flex-col justify-between rounded-[24px] border border-white/80 bg-white/75 p-5 shadow-cloud backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-luxury md:max-w-[340px] md:min-w-[340px]"
          >
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-[#006aff] text-[12px] font-black text-white">
                    {r.name.slice(0, 1)}
                  </div>
                  <div>
                    <span className="block font-display text-label-md font-bold text-primary">{r.name}</span>
                    <span className="block text-[11px] text-on-surface-variant/70">{r.when}</span>
                  </div>
                </div>
                <Stars />
              </div>

              <p className="text-[13.5px] leading-relaxed text-on-surface-variant font-medium italic">
                “{r.text}”
              </p>
            </div>

            <div className="mt-4 flex items-center gap-1.5 border-t border-surface-container/60 pt-3 text-[11px] font-bold text-primary">
              <Icon name="verified" fill className="text-[14px] text-crimson" />
              <span>{r.via}</span>
              <span className="ml-auto text-[10px] text-on-surface-variant/60 uppercase">100% Verified</span>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-2 pt-1">
        {reviews.map((_, i) => (
          <button
            key={i}
            aria-label={t.reviewN(i + 1)}
            aria-current={i === idx}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? 'w-8 bg-gradient-to-r from-primary to-crimson' : 'w-2 bg-primary/25 hover:bg-primary/50'
            }`}
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
    <div className="mx-auto max-w-lg space-y-8 px-5 pt-4 pb-10 md:max-w-6xl md:space-y-12 md:px-8 md:pt-10">
      {/* Editorial Breadcrumbs & Campaign Slogan */}
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-1.5 text-primary shadow-cloud-sm backdrop-blur-xl">
          <DurexLogo variant="blue" size="sm" />
          <span className="text-on-surface-variant/40">/</span>
          <span className="text-[11px] font-extrabold tracking-wider text-primary uppercase">{t.crumb}</span>
        </div>

        <span className="rounded-full border border-white/70 bg-white/50 px-4 py-1 text-[11px] font-extrabold tracking-widest text-primary/80 uppercase backdrop-blur-md">
          {t.slogan}
        </span>
      </section>

      {/* Flagship Hero Banner: Better Together */}
      <Reveal className="group relative overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-luxury ring-1 ring-white/90">
        <picture>
          <source media="(min-width: 768px)" srcSet="/assets/products-hero.webp" />
          <img
            src="/assets/products-hero-m.webp"
            alt={t.introAlt}
            className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:aspect-[21/9]"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-t from-[#06192d]/85 via-[#06192d]/35 to-transparent md:bg-gradient-to-r md:from-[#06192d]/80 md:via-[#06192d]/30 md:to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:top-0 md:bottom-auto md:max-w-md md:p-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md">
            <Icon name="favorite" className="text-xs text-crimson" fill /> {t.introKicker}
          </span>
          <h2 className="mt-2.5 font-display text-[32px] font-black uppercase tracking-tight text-white md:text-[44px] md:leading-[1.05]">
            {t.introTitle}
          </h2>
          <p className="mt-2 text-sm text-white/90 leading-relaxed font-medium md:text-body-md">
            {t.introBody}
          </p>
        </div>
      </Reveal>

      {/* Product Family Marquee */}
      <ProductMarquee />

      {/* 3D Showcase & Specifications Dual Layout */}
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
        <Reveal>
          <ShowcaseCard pack={pack} setPack={setPack} />
        </Reveal>

        <div className="space-y-6">
          {/* Technical Specs Pods */}
          <Reveal className="space-y-3">
            <div className="flex items-center justify-between gap-2 px-1">
              <h2 className="flex items-center gap-2 font-display text-headline-md font-black tracking-tight text-primary">
                <Icon name="tune" className="text-[22px] text-crimson" /> {t.specsTitle}
              </h2>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-right text-[11px] font-bold text-primary uppercase">
                {t.specsBadge}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                    className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-white/80 bg-white/75 p-4 shadow-cloud backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-luxury"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                    <div className="mb-3 flex items-center justify-between">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr ${s.color} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                        <Icon name={s.icon} fill={s.fill} className="text-[22px]" />
                      </div>
                      <span className="text-[10px] font-black text-on-surface-variant/50 uppercase tracking-widest">
                        0{i + 1}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-on-surface-variant/80 uppercase tracking-wider">
                        {txt.label}
                      </span>
                      {s.value !== undefined ? (
                        <div className="font-display text-[26px] font-black text-primary leading-tight">
                          <CountUp to={s.value} decimals={s.decimals} />
                          <span className="ml-1 text-sm font-bold text-primary/70">{s.unit}</span>
                        </div>
                      ) : (
                        <div className="font-display text-[18px] font-black text-primary leading-tight mt-0.5">
                          {txt.text}
                        </div>
                      )}
                      <p className="mt-1 text-[11.5px] leading-snug text-on-surface-variant font-medium">
                        {txt.desc}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </Reveal>

          {/* Key Medical Innovations & Features */}
          <Reveal className="rounded-[28px] border border-white/80 bg-white/75 p-6 shadow-luxury ring-1 ring-white/90 backdrop-blur-2xl">
            <h3 className="mb-4 font-display text-headline-md font-bold text-primary">{t.featuresTitle}</h3>
            <div className="space-y-3.5">
              {FEATURE_META.map((f, i) => (
                <motion.div
                  key={f.icon}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-start gap-3.5 rounded-[20px] border border-white/80 bg-white/70 p-3.5 transition-all duration-300 hover:bg-white hover:shadow-cloud-sm"
                >
                  <div className={`shrink-0 rounded-2xl p-2.5 text-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${f.color}`}>
                    <Icon name={f.icon} className="text-[20px]" />
                  </div>
                  <div>
                    <h4 className="font-display text-[14px] font-bold text-primary group-hover:text-crimson transition-colors">
                      {t.features[i].title}
                    </h4>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-on-surface-variant font-medium">
                      {t.features[i].desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Sensory Feelings Showcase: Delicate Touch & Smooth Lubrication */}
      <section className="grid gap-5 md:grid-cols-2 md:gap-7">
        {FEELING_IMG.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.1}>
            <div className="group overflow-hidden rounded-[32px] border border-white/80 bg-white/75 shadow-luxury ring-1 ring-white backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
              <div className="overflow-hidden bg-[#eaf4fc]">
                <img
                  src={f.img}
                  alt={`${f.title} – ${t.feelings[i].title}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>

              <div className="flex items-center gap-4 p-5 md:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-[#006aff] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Icon name={f.icon} fill={i === 1} className="text-2xl" />
                </span>
                <div>
                  <p className="text-[11px] font-extrabold tracking-wider text-crimson uppercase">{t.feelings[i].kicker}</p>
                  <h3 className="font-display text-headline-md font-bold text-primary">{t.feelings[i].title}</h3>
                  <p className="mt-0.5 text-[12.5px] text-on-surface-variant font-medium leading-relaxed">{t.feelings[i].desc}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Flagship D2C Conversion Card */}
      <Reveal className="relative overflow-hidden rounded-[32px] border border-white/80 bg-gradient-to-b from-white/90 via-white/80 to-white/95 p-6 text-center shadow-luxury ring-1 ring-white backdrop-blur-2xl md:mx-auto md:max-w-2xl md:p-10">
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-44 w-80 rounded-full bg-crimson/10 blur-3xl" />

        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[11px] font-bold text-primary uppercase">
            <Icon name="verified" className="text-xs text-crimson" /> Durex Fetherlite Official Checkout
          </span>

          <h3 className="font-display text-headline-md font-black text-primary md:text-headline-lg">
            Durex Fetherlite · {current.label[lang]}
          </h3>

          <div className="flex items-center justify-center gap-3 pt-2">
            <span className="text-body-md font-semibold text-on-surface-variant/60 line-through">
              {formatVnd(current.was, lang)}
            </span>

            <AnimatePresence mode="wait">
              <motion.span
                key={current.price}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-display text-[34px] font-black text-crimson drop-shadow-sm md:text-[40px]"
              >
                {formatVnd(current.price, lang)}
              </motion.span>
            </AnimatePresence>

            <span className="rounded-full bg-crimson px-2.5 py-1 text-[11px] font-black text-white shadow-sm">
              -{discount}%
            </span>
          </div>

          <p className="text-[12px] font-semibold text-on-surface-variant">{t.secure}</p>
        </div>

        <div className="relative z-10 mt-6">
          <CtaButton
            pulse
            className="w-full py-4 text-label-lg shadow-crimson md:text-body-md"
            onClick={() => openBuy({ product: 'fetherlite', pack })}
          >
            <Icon name="local_mall" fill className="text-2xl" />
            <span className="tracking-wide font-display font-extrabold">{t.buyNow}</span>
          </CtaButton>
        </div>

        {/* Official Channels */}
        <div className="relative z-10 pt-6">
          <span className="mb-3 block text-[11px] font-extrabold tracking-widest text-on-surface-variant/70 uppercase">
            {t.channels}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {(Object.keys(STORES) as StoreKey[]).map((k) => (
              <a
                key={k}
                href={STORES[k].url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-4 py-2 text-xs font-bold text-primary shadow-cloud-sm transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-md"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: STORES[k].dot }} />
                <span>{STORES[k].name}</span>
                <Icon name="arrow_outward" className="text-xs opacity-60 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Discrete Guarantee Seals */}
      <section className="grid grid-cols-2 gap-3 pt-2 text-center md:mx-auto md:max-w-xl">
        {t.trust.map((x, i) => (
          <div
            key={x.t}
            className="rounded-[20px] border border-white/70 bg-white/50 p-4 shadow-cloud-sm backdrop-blur-xl"
          >
            <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon name={i === 0 ? 'lock' : 'verified'} className="text-[20px] text-crimson" />
            </div>
            <span className="block font-display text-[13px] font-bold text-primary">{x.t}</span>
            <span className="text-[11px] font-medium text-on-surface-variant/80">{x.d}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

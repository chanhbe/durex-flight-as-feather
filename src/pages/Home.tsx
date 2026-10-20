import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { AirButton, CtaButton, Icon, Reveal } from '../components/ui'
import { Feather, HeartBalloon } from '../components/Balloons'
import { useT, useTitle } from '../i18n'

const T = {
  vi: {
    title: 'Trạm Cất Cánh',
    kicker: 'Trạm Cất Cánh · Durex Fetherlite',
    h1: ['Nhẹ Như', 'Bay'],
    lead: 'Siêu mỏng · Vô hình · Nhẹ tênh. Thả lỏng và cảm nhận trọn vẹn từng điểm chạm.',
    cta: 'NHẬN VÉ BAY',
    explore: 'Khám phá Fetherlite',
    pause: 'Tạm dừng video',
    play: 'Phát video',
    introKicker: 'Chạm nhẹ · Yêu sâu',
    introTitle: 'An toàn là để thăng hoa trọn vẹn',
    introBody:
      'Khi không còn lo lắng, cảm xúc mới thật sự cất cánh. Durex Fetherlite mỏng hơn 20% so với bao cao su thông thường – để hai bạn gần nhau hơn, mà vẫn an toàn tuyệt đối.',
    features: ['Bảo vệ tin cậy', 'Ôm vừa vặn', 'Mọi khoảnh khắc', 'Thêm thăng hoa'],
    kvAlt: 'Light as a Feather – cặp thỏ bóng bay xanh hồng nắm tay trên mây',
    kvKicker: 'Key visual chiến dịch',
    bannerTitle: ['Mỏng 0.045mm.', 'Nhẹ như không.'],
    bannerBody: 'Truyền nhiệt tức thì, ôm khít tự nhiên, thiết kế Easy-On. Cảm giác “vô hình” mà bạn chưa từng thử.',
    bannerCta: 'Xem sản phẩm',
    boxAlt: 'Hộp Durex Fetherlite',
    stationsTitle: 'Lịch trình chuyến bay',
    stationsSub: '4 trạm dừng của hành trình “Nhẹ Như Bay”',
    stations: [
      { title: 'Bí Mật Sự Nhẹ Nhàng', desc: 'Khám phá dải sản phẩm & thông số Fetherlite' },
      { title: 'Phòng Chờ Bay', desc: 'Bơm bóng nhận E-Voucher 20%' },
      { title: 'Góc Tự Tin Cất Cánh', desc: 'Cẩm nang yêu an toàn & thăng hoa' },
      { title: 'Trạm Hỗ Trợ Kín Đáo', desc: 'FAQ & gửi thắc mắc ẩn danh' },
    ],
    galleryTitle: 'Bộ sưu tập “Better Together”',
    gallerySub: 'Vuốt ngang để xem thêm',
    galleryDesk: '6 khoảnh khắc bóng bay – dùng mũi tên để xem thêm',
    stop: 'Trạm',
    prev: 'Ảnh trước',
    next: 'Ảnh tiếp theo',
    galleryLabel: 'Bộ sưu tập ảnh chiến dịch',
    finalTitle: 'Sẵn sàng cất cánh?',
    finalBody: 'Chơi “Bơm bóng nhận quà” để nhận E-Voucher giảm 20% cho Durex Fetherlite.',
  },
  en: {
    title: 'Departure Gate',
    kicker: 'Departure Gate · Durex Fetherlite',
    h1: ['Light as', 'a Feather'],
    lead: 'Ultra thin · Barely there · Weightless. Let go and feel every single touch.',
    cta: 'GET YOUR BOARDING PASS',
    explore: 'Explore Fetherlite',
    pause: 'Pause video',
    play: 'Play video',
    introKicker: 'Touch lightly · Love deeply',
    introTitle: 'Safe is how you truly let go',
    introBody:
      'When the worry disappears, the feelings take off. Durex Fetherlite is 20% thinner than standard condoms – so you can feel closer while staying fully protected.',
    features: ['Trusted protection', 'Comfortable fit', 'Every moment', 'More pleasure'],
    kvAlt: 'Light as a Feather – blue and pink balloon bunnies holding hands above the clouds',
    kvKicker: 'Campaign key visual',
    bannerTitle: ['0.045mm thin.', 'Barely there.'],
    bannerBody: 'Instant warmth, a natural close fit and an Easy-On shape. An “invisible” feeling you’ve never tried before.',
    bannerCta: 'See the product',
    boxAlt: 'Durex Fetherlite box',
    stationsTitle: 'Flight itinerary',
    stationsSub: '4 stops on the “Light as a Feather” journey',
    stations: [
      { title: 'The Secret to Lightness', desc: 'Explore the range & Fetherlite specs' },
      { title: 'Departure Lounge', desc: 'Pump a balloon, win a 20% E-Voucher' },
      { title: 'Confidence Corner', desc: 'Guides to safe, blissful love' },
      { title: 'Discreet Help Desk', desc: 'FAQ & anonymous questions' },
    ],
    galleryTitle: 'The “Better Together” collection',
    gallerySub: 'Swipe to see more',
    galleryDesk: '6 balloon moments – use the arrows to browse',
    stop: 'Stop',
    prev: 'Previous image',
    next: 'Next image',
    galleryLabel: 'Campaign image collection',
    finalTitle: 'Ready for take-off?',
    finalBody: 'Play “Pump & Win” to get a 20% E-Voucher for Durex Fetherlite.',
  },
}

const FEATURE_ICONS = ['verified_user', 'eco', 'favorite', 'auto_awesome']

// Illustration-only crops (headline + logo band removed) so card text never fights the artwork.
const STATIONS = [
  { to: '/san-pham', icon: 'category', img: '/assets/st-more-play.webp' },
  { to: '/uu-dai', icon: 'celebration', img: '/assets/st-explore-together.webp' },
  { to: '/cam-nang', icon: 'menu_book', img: '/assets/st-feel-closer.webp' },
  { to: '/ho-tro', icon: 'support_agent', img: '/assets/st-small-moments.webp' },
]

const GALLERY = ['ad-better-together', 'ad-more-play', 'ad-feel-closer', 'ad-explore-together', 'ad-small-moments', 'ad-play-your-way']

function Hero() {
  const t = useT(T)
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(!reduce)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Respect "reduce motion": keep the video still unless the viewer presses play.
  useEffect(() => {
    if (reduce) {
      videoRef.current?.pause()
      setPlaying(false)
    }
  }, [reduce])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section ref={ref} className="relative -mt-[65px] h-[100svh] min-h-[640px] overflow-hidden">
      <motion.video
        ref={videoRef}
        aria-hidden
        style={{ y: videoY }}
        className="absolute inset-0 h-full w-full bg-[#4a90d9] object-cover object-[55%_center]"
        src="/assets/hero.mp4"
        preload="auto"
        autoPlay={!reduce}
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2587db]/70 via-transparent to-[#2587db]/60" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#5aaef0] to-transparent" />

      <HeartBalloon color="pink" className="absolute top-[18%] right-[6%] w-14 animate-floating md:right-[12%] md:w-24" />
      <HeartBalloon color="blue" className="absolute top-[30%] left-[5%] w-10 animate-floating [animation-delay:-1.5s] md:left-[8%] md:w-16" />
      <motion.div
        aria-hidden
        className="absolute top-[42%] right-[20%] w-6 md:w-10"
        animate={{ y: [0, 30, 0], x: [0, -12, 0], rotate: [0, 25, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Feather />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center px-5 pt-28 text-center md:items-start md:px-8 md:pt-40 md:text-left"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/30 px-4 py-1.5 text-label-md text-white uppercase backdrop-blur-md"
        >
          <Icon name="flight_takeoff" fill className="text-base" /> {t.kicker}
        </motion.span>
        <motion.h1
          key={t.h1[0]}
          initial={{ opacity: 0, y: 30, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.01em' }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-[clamp(40px,12.5vw,52px)] leading-[1] font-extrabold text-white uppercase [text-shadow:0_4px_18px_rgba(0,0,0,0.15)] md:text-[96px]"
        >
          {t.h1[0]}
          <br />
          {t.h1[1]}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-4 max-w-sm text-body-lg font-medium text-white/95 [text-shadow:0_1px_8px_rgba(0,40,80,0.35)]"
        >
          {t.lead}
        </motion.p>

        <div className="mt-auto mb-28 flex w-full flex-col items-center gap-3 md:mb-24 md:w-auto md:flex-row">
          <CtaButton pulse className="w-full max-w-xs px-8 py-4 text-label-lg md:w-auto" onClick={() => navigate('/uu-dai')}>
            <Icon name="confirmation_number" fill className="text-xl" /> {t.cta}
          </CtaButton>
          <AirButton className="px-6 py-3.5 text-label-lg text-white" onClick={() => navigate('/san-pham')}>
            {t.explore} <Icon name="arrow_forward" className="text-lg" />
          </AirButton>
        </div>
      </motion.div>

      <button
        onClick={toggle}
        aria-label={playing ? t.pause : t.play}
        className="absolute right-5 bottom-28 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/25 text-white backdrop-blur-md md:right-8 md:bottom-10"
      >
        <Icon name={playing ? 'pause' : 'play_arrow'} fill />
      </button>
      <motion.div
        aria-hidden
        className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2 text-white/80 md:bottom-6"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <Icon name="keyboard_double_arrow_down" />
      </motion.div>
    </section>
  )
}

/*
 * Card frames use concentric corners: outer radius 28px, 6px glass rim, inner radius 22px.
 */
const FRAME =
  'rounded-[28px] bg-white/55 p-1.5 shadow-cloud ring-1 ring-white/80 backdrop-blur-xl transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(11,74,130,0.22)]'

function Stations() {
  const t = useT(T)
  return (
    <section>
      <Reveal className="mb-4 px-1 md:mb-6">
        <h2 className="text-headline-md font-bold text-primary md:text-headline-lg">{t.stationsTitle}</h2>
        <p className="text-label-md text-on-surface-variant">{t.stationsSub}</p>
      </Reveal>
      <ol className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {STATIONS.map((s, i) => (
          <motion.li
            key={s.to}
            className="h-full"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={s.to} className={`group flex h-full flex-col active:scale-[0.98] ${FRAME}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-primary-fixed">
                <img
                  src={s.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-bottom transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white/85 py-1 pr-2.5 pl-1 text-[10px] font-extrabold tracking-wider text-primary uppercase shadow-sm backdrop-blur-md">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white transition-colors duration-300 group-hover:bg-crimson">
                    <Icon name={s.icon} className="text-[13px]" />
                  </span>
                  {t.stop} 0{i + 1}
                </span>
              </div>
              <div className="flex flex-1 items-start gap-2 px-2.5 pt-3 pb-2.5 md:px-3 md:pb-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] leading-tight font-bold text-primary md:text-label-lg">{t.stations[i].title}</h3>
                  <p className="mt-1 text-[11.5px] leading-snug text-on-surface-variant md:text-[12.5px]">{t.stations[i].desc}</p>
                </div>
                <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-fixed/70 text-primary transition-colors duration-300 group-hover:bg-crimson group-hover:text-white md:flex">
                  <Icon name="arrow_forward" className="text-[18px] transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

function Gallery() {
  const t = useT(T)
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ start: true, end: false, progress: 0, idx: 0 })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const card = el.querySelector<HTMLElement>('[data-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth
    setPos({
      start: el.scrollLeft < 4,
      end: el.scrollLeft > max - 4,
      progress: max > 0 ? el.scrollLeft / max : 1,
      idx: Math.min(GALLERY.length - 1, Math.round(el.scrollLeft / step)),
    })
  }, [])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const go = (dir: 1 | -1) => {
    const el = ref.current
    const card = el?.querySelector<HTMLElement>('[data-card]')
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' })
  }

  // Soft fade only on the side that still has hidden cards, exactly as wide as the gutter
  // so the snapped card is never dimmed.
  const mask = `linear-gradient(to right, ${pos.start ? '#000' : 'transparent'} 0, #000 var(--g), #000 calc(100% - var(--g)), ${
    pos.end ? '#000' : 'transparent'
  } 100%)`

  const arrow =
    'flex h-11 w-11 items-center justify-center rounded-full bg-white/70 text-primary shadow-cloud-sm ring-1 ring-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-crimson active:scale-90 disabled:pointer-events-none disabled:opacity-35'

  return (
    <section aria-label={t.galleryLabel} className="mt-10 md:mt-16">
      <div className="mx-auto flex max-w-lg items-end justify-between gap-4 px-5 md:max-w-6xl md:px-8">
        <Reveal className="px-1">
          <h2 className="text-headline-md font-bold text-primary md:text-headline-lg">{t.galleryTitle}</h2>
          <p className="text-label-md text-on-surface-variant">
            <span className="md:hidden">{t.gallerySub}</span>
            <span className="hidden md:inline">{t.galleryDesk}</span>
          </p>
        </Reveal>
        <div className="hidden shrink-0 gap-2 md:flex">
          <button aria-label={t.prev} onClick={() => go(-1)} disabled={pos.start} className={arrow}>
            <Icon name="arrow_back" />
          </button>
          <button aria-label={t.next} onClick={() => go(1)} disabled={pos.end} className={arrow}>
            <Icon name="arrow_forward" />
          </button>
        </div>
      </div>

      {/* Full-bleed track: --g is the content column's left edge, so the first card lines up with the heading. */}
      <div
        ref={ref}
        onScroll={measure}
        tabIndex={0}
        aria-label={t.galleryLabel}
        style={{ maskImage: mask, WebkitMaskImage: mask, paddingInline: 'var(--g)', scrollPaddingInline: 'var(--g)' }}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain py-6 outline-none [--g:max(1.25rem,calc((100%_-_32rem)/2_+_1.25rem))] md:[--g:max(2rem,calc((100%_-_72rem)/2_+_2rem))]"
      >
        {GALLERY.map((g, i) => (
          <motion.figure
            key={g}
            data-card
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i, 3) * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`group w-[76vw] max-w-[320px] shrink-0 snap-start md:w-[340px] md:max-w-none lg:w-[360px] ${FRAME}`}
          >
            <div className="overflow-hidden rounded-[22px]">
              <img
                src={`/assets/${g}.webp`}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] select-none group-hover:scale-[1.04]"
              />
            </div>
          </motion.figure>
        ))}
      </div>

      <div className="mx-auto flex max-w-lg items-center gap-4 px-6 md:max-w-6xl md:px-9">
        <span className="w-16 shrink-0 text-label-md font-bold text-primary tabular-nums">
          {String(pos.idx + 1).padStart(2, '0')}
          <span className="font-semibold text-on-surface-variant/60"> / {String(GALLERY.length).padStart(2, '0')}</span>
        </span>
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/60">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-crimson"
            animate={{ width: `${Math.max(1 / GALLERY.length, pos.progress) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 30 }}
          />
        </div>
      </div>
    </section>
  )
}

export function Home() {
  const t = useT(T)
  useTitle(t.title)
  const navigate = useNavigate()
  const kvRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: kvRef, offset: ['start end', 'end start'] })
  const kvScale = useTransform(scrollYProgress, [0, 1], [1.15, 1])

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-lg space-y-10 px-5 pt-6 md:max-w-6xl md:space-y-16 md:px-8">
        {/* Giới thiệu ngắn */}
        <Reveal className="glass rounded-xl p-6 text-center shadow-cloud md:p-12">
          <span className="text-label-sm text-crimson uppercase">{t.introKicker}</span>
          <h2 className="mx-auto mt-2 max-w-2xl font-display text-headline-lg-mobile font-extrabold text-primary md:text-headline-lg">
            {t.introTitle}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-body-md text-on-surface-variant md:text-body-lg">{t.introBody}</p>
          <div className="mt-6 grid grid-cols-4 gap-2 md:mx-auto md:max-w-xl">
            {t.features.map((label, i) => (
              <motion.div
                key={FEATURE_ICONS[i]}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, type: 'spring', stiffness: 260, damping: 18 }}
                className="flex flex-col items-center gap-1.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-white/60 text-primary shadow-cloud-sm">
                  <Icon name={FEATURE_ICONS[i]} />
                </span>
                <span className="text-[11px] leading-tight font-semibold text-primary">{label}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Key visual */}
        <Reveal>
          <div ref={kvRef} className="relative overflow-hidden rounded-xl shadow-cloud">
            <picture>
              <source media="(min-width: 768px)" srcSet="/assets/hero.webp" />
              <motion.img
                style={{ scale: kvScale }}
                src="/assets/hero-m.webp"
                alt={t.kvAlt}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover md:aspect-[16/9]"
              />
            </picture>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/70 to-transparent p-5 md:hidden">
              <p className="text-label-sm text-white/80 uppercase">{t.kvKicker}</p>
              <p className="text-headline-md font-bold text-white">Light as a Feather</p>
            </div>
          </div>
        </Reveal>

        {/* Banner điều hướng Fetherlite — accent #E51B24 */}
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#ff4b4f] via-crimson to-[#a3000f] p-6 text-white shadow-crimson md:flex md:items-center md:gap-10 md:p-12">
            <div className="absolute -top-16 -right-10 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
            <div className="relative z-10 md:flex-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-label-sm uppercase backdrop-blur-md">
                <Icon name="air" className="text-sm" /> Fetherlite Ultra Thin
              </span>
              <h2 className="mt-3 font-display text-[34px] leading-[1.05] font-extrabold uppercase md:text-[48px]">
                {t.bannerTitle[0]}
                <br />
                {t.bannerTitle[1]}
              </h2>
              <p className="mt-3 max-w-sm text-sm text-white/85 md:text-body-md">{t.bannerBody}</p>
              <button
                onClick={() => navigate('/san-pham')}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-label-lg font-bold text-crimson shadow-lg transition-transform active:scale-95"
              >
                {t.bannerCta} <Icon name="arrow_forward" className="text-lg" />
              </button>
            </div>
            <div className="relative mt-4 flex justify-center md:mt-0 md:w-80">
              <div className="absolute inset-0 m-auto h-48 w-48 rounded-full bg-white/25 blur-2xl" />
              <img
                src="/assets/p-fetherlite.webp"
                alt={t.boxAlt}
                loading="lazy"
                decoding="async"
                className="relative w-56 animate-floating drop-shadow-[0_24px_30px_rgba(80,0,0,0.45)] md:w-72"
              />
            </div>
          </div>
        </Reveal>

        <Stations />
      </div>

      <Gallery />

      <div className="mx-auto max-w-lg px-5 pt-10 md:max-w-6xl md:px-8 md:pt-16">
        {/* Final CTA */}
        <Reveal className="glass-strong relative overflow-hidden rounded-xl p-6 text-center shadow-cloud md:p-10">
          <HeartBalloon color="pink" className="absolute -top-2 left-4 w-12 animate-floating" />
          <HeartBalloon color="blue" className="absolute -top-4 right-6 w-10 animate-floating [animation-delay:-2s]" />
          <h2 className="mt-6 font-display text-headline-lg-mobile font-extrabold text-primary uppercase md:text-headline-lg">{t.finalTitle}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-on-surface-variant">{t.finalBody}</p>
          <CtaButton pulse className="mx-auto mt-5 px-10 py-4 text-label-lg" onClick={() => navigate('/uu-dai')}>
            <Icon name="flight_takeoff" className="text-xl" /> {t.cta}
          </CtaButton>
        </Reveal>
      </div>
    </>
  )
}

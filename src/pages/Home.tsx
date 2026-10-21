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
    features: [
      { title: 'Bảo vệ tin cậy', desc: '100% kiểm nghiệm điện tử' },
      { title: 'Ôm vừa vặn', desc: 'Thiết kế Easy-On định hình' },
      { title: 'Mọi khoảnh khắc', desc: 'Mượt mà suốt cuộc yêu' },
      { title: 'Thêm thăng hoa', desc: 'Truyền nhiệt tức thì' },
    ],
    kvAlt: 'Light as a Feather – cặp thỏ bóng bay xanh hồng nắm tay trên mây',
    kvKicker: 'Chiến dịch trọng điểm',
    bannerBadge: 'Fetherlite Ultra Thin · 0.045mm',
    bannerTitle: ['Mỏng 0.045mm.', 'Nhẹ tựa làn mây.'],
    bannerBody: 'Truyền nhiệt tức thì, ôm khít tự nhiên, dáng Easy-On dễ mang. Cảm giác “vô hình” chạm đến từng nhịp đập cảm xúc.',
    bannerCta: 'Khám phá ngay',
    boxAlt: 'Hộp Durex Fetherlite',
    stationsTitle: 'Lịch trình chuyến bay',
    stationsSub: '4 trạm dừng độc quyền của hành trình “Nhẹ Như Bay”',
    stations: [
      { title: 'Bí Mật Sự Nhẹ Nhàng', desc: 'Khám phá dải sản phẩm & thông số Fetherlite' },
      { title: 'Phòng Chờ Bay', desc: 'Bơm bóng nhận E-Voucher 20%' },
      { title: 'Góc Tự Tin Cất Cánh', desc: 'Cẩm nang yêu an toàn & thăng hoa' },
      { title: 'Trạm Hỗ Trợ Kín Đáo', desc: 'FAQ & gửi thắc mắc ẩn danh' },
    ],
    galleryTitle: 'Bộ sưu tập “Better Together”',
    gallerySub: 'Vuốt ngang để cảm nhận khoảnh khắc',
    galleryDesk: '6 khoảnh khắc bóng bay – dùng mũi tên để thưởng thức',
    stop: 'Trạm',
    prev: 'Ảnh trước',
    next: 'Ảnh tiếp theo',
    galleryLabel: 'Bộ sưu tập ảnh chiến dịch',
    finalTitle: 'Sẵn sàng cất cánh cùng Durex?',
    finalBody: 'Tham gia mini-game “Bơm bóng nhận quà” để nhận ngay E-Voucher giảm 20% chính hãng cho Durex Fetherlite.',
  },
  en: {
    title: 'Departure Gate',
    kicker: 'Departure Gate · Durex Fetherlite',
    h1: ['Light as', 'a Feather'],
    lead: 'Ultra thin · Barely there · Weightless. Let go and feel every single touch.',
    cta: 'GET BOARDING PASS',
    explore: 'Explore Fetherlite',
    pause: 'Pause video',
    play: 'Play video',
    introKicker: 'Touch lightly · Love deeply',
    introTitle: 'Safe is how you truly let go',
    introBody:
      'When the worry disappears, the feelings take off. Durex Fetherlite is 20% thinner than standard condoms – so you can feel closer while staying fully protected.',
    features: [
      { title: 'Trusted protection', desc: '100% electronically tested' },
      { title: 'Comfortable fit', desc: 'Smart Easy-On shape' },
      { title: 'Every moment', desc: 'Silky smooth pleasure' },
      { title: 'More pleasure', desc: 'Instant thermal warmth' },
    ],
    kvAlt: 'Light as a Feather – blue and pink balloon bunnies holding hands above the clouds',
    kvKicker: 'Featured Campaign',
    bannerBadge: 'Fetherlite Ultra Thin · 0.045mm',
    bannerTitle: ['0.045mm thin.', 'Light as a cloud.'],
    bannerBody: 'Instant warmth, natural close fit and an Easy-On shape. An “invisible” feeling you’ve never experienced before.',
    bannerCta: 'Discover now',
    boxAlt: 'Durex Fetherlite box',
    stationsTitle: 'Flight Itinerary',
    stationsSub: '4 exclusive stops on the “Light as a Feather” journey',
    stations: [
      { title: 'The Secret to Lightness', desc: 'Explore the range & Fetherlite specs' },
      { title: 'Departure Lounge', desc: 'Pump a balloon, win 20% E-Voucher' },
      { title: 'Confidence Corner', desc: 'Guides to safe, blissful love' },
      { title: 'Discreet Help Desk', desc: 'FAQ & anonymous questions' },
    ],
    galleryTitle: 'The “Better Together” Collection',
    gallerySub: 'Swipe to experience moments',
    galleryDesk: '6 balloon moments – use the arrows to browse',
    stop: 'Stop',
    prev: 'Previous image',
    next: 'Next image',
    galleryLabel: 'Campaign image collection',
    finalTitle: 'Ready for take-off with Durex?',
    finalBody: 'Play “Pump & Win” to get your exclusive 20% official E-Voucher for Durex Fetherlite.',
  },
}

const FEATURE_ICONS = ['verified_user', 'accessibility_new', 'favorite', 'auto_awesome']

const STATIONS = [
  { to: '/san-pham', icon: 'category', img: '/assets/st-more-play.webp' },
  { to: '/uu-dai', icon: 'celebration', img: '/assets/st-explore-together.webp' },
  { to: '/cam-nang', icon: 'menu_book', img: '/assets/st-feel-closer.webp' },
  { to: '/ho-tro', icon: 'support_agent', img: '/assets/st-small-moments.webp' },
]

const GALLERY = [
  'ad-better-together',
  'ad-more-play',
  'ad-feel-closer',
  'ad-explore-together',
  'ad-small-moments',
  'ad-play-your-way',
]

function Hero() {
  const t = useT(T)
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(!reduce)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

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
    <section ref={ref} className="relative -mt-[64px] h-[100svh] min-h-[660px] overflow-hidden">
      {/* Video Canvas with Atmospheric Sensory Overlay */}
      <motion.video
        ref={videoRef}
        aria-hidden
        style={{ y: videoY }}
        className="absolute inset-0 h-full w-full bg-[#1b6fb9] object-cover object-[55%_center] brightness-[1.02]"
        src="/assets/hero.mp4"
        preload="auto"
        autoPlay={!reduce}
        muted
        loop
        playsInline
      />

      {/* Cinematic Vignette & Sky Mist Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c4a85]/55 via-transparent to-[#1a73cb]/70" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#f5fafe] via-[#85c3f3]/60 to-transparent" />

      {/* Drifting Feather Elements with Organic Wind Physics */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[36%] right-[15%] w-7 md:w-11"
        animate={{
          y: [0, 24, 6, 28, 0],
          x: [0, -14, 8, -6, 0],
          rotate: [0, 18, -12, 14, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Feather className="drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]" />
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[52%] left-[12%] w-5 md:w-8 opacity-75"
        animate={{
          y: [0, -18, 10, -8, 0],
          x: [0, 10, -6, 12, 0],
          rotate: [0, -15, 10, -12, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <Feather className="drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)]" />
      </motion.div>

      {/* Floating Balloons with subtle atmospheric blur */}
      <HeartBalloon
        color="pink"
        className="pointer-events-none absolute top-[20%] right-[6%] w-14 animate-floating md:right-[12%] md:w-24 drop-shadow-[0_12px_24px_rgba(233,103,155,0.25)]"
      />
      <HeartBalloon
        color="blue"
        className="pointer-events-none absolute top-[32%] left-[5%] w-11 animate-floating [animation-delay:-2s] md:left-[8%] md:w-16 drop-shadow-[0_12px_24px_rgba(61,143,224,0.25)]"
      />

      {/* Content Stack */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center px-5 pt-32 text-center md:items-start md:px-8 md:pt-44 md:text-left"
      >
        {/* Campaign Kicker Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/35 px-4 py-1.5 shadow-cloud-sm backdrop-blur-xl"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-crimson text-white">
            <Icon name="flight_takeoff" fill className="text-[12px]" />
          </span>
          <span className="text-[11px] font-extrabold tracking-[0.14em] text-white uppercase drop-shadow-sm">
            {t.kicker}
          </span>
        </motion.div>

        {/* Editorial Headline */}
        <motion.h1
          key={t.h1[0]}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 font-display text-[clamp(44px,11vw,72px)] leading-[0.98] font-black tracking-tight uppercase text-white drop-shadow-[0_6px_24px_rgba(0,35,75,0.35)] md:text-[98px]"
        >
          <span className="block">{t.h1[0]}</span>
          <span className="block bg-gradient-to-r from-white via-[#e8f3fc] to-[#b3ddff] bg-clip-text text-transparent">
            {t.h1[1]}
          </span>
        </motion.h1>

        {/* Sensory Lead Body */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-4 max-w-md text-body-md font-medium text-white/95 drop-shadow-[0_2px_10px_rgba(0,35,75,0.4)] md:text-body-lg"
        >
          {t.lead}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-auto mb-24 flex w-full flex-col items-center gap-3.5 md:mb-20 md:w-auto md:flex-row"
        >
          <CtaButton
            pulse
            className="w-full max-w-xs px-8 py-4 text-label-lg shadow-crimson md:w-auto"
            onClick={() => navigate('/uu-dai')}
          >
            <Icon name="confirmation_number" fill className="text-xl" />
            <span>{t.cta}</span>
          </CtaButton>

          <AirButton
            className="w-full max-w-xs px-7 py-4 text-label-lg text-primary md:w-auto"
            onClick={() => navigate('/san-pham')}
          >
            <span>{t.explore}</span>
            <Icon name="arrow_forward" className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          </AirButton>
        </motion.div>
      </motion.div>

      {/* Video Play/Pause Controller */}
      <button
        onClick={toggle}
        aria-label={playing ? t.pause : t.play}
        className="group absolute right-5 bottom-24 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/30 text-white shadow-cloud-sm backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:text-primary active:scale-95 md:right-8 md:bottom-12"
      >
        <Icon name={playing ? 'pause' : 'play_arrow'} fill className="text-xl" />
      </button>

      {/* Scroll Down Prompt */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-primary/70 md:bottom-4"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-extrabold tracking-widest text-primary/80 uppercase">Scroll</span>
          <Icon name="keyboard_arrow_down" className="text-xl text-primary" />
        </div>
      </motion.div>
    </section>
  )
}

/* Concentric luxury card frame */
const FRAME =
  'group rounded-[28px] border border-white/80 bg-white/70 p-2 shadow-cloud ring-1 ring-white/90 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:bg-white/85 hover:shadow-luxury'

function Stations() {
  const t = useT(T)
  return (
    <section className="pt-4">
      <Reveal className="mb-6 px-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[11px] font-bold tracking-wider text-primary uppercase">
          <Icon name="explore" className="text-sm text-crimson" /> Durex Flight Schedule
        </div>
        <h2 className="mt-2 font-display text-headline-lg-mobile font-black tracking-tight text-primary md:text-headline-lg">
          {t.stationsTitle}
        </h2>
        <p className="mt-1 text-label-md text-on-surface-variant">{t.stationsSub}</p>
      </Reveal>

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
        {STATIONS.map((s, i) => (
          <motion.li
            key={s.to}
            className="h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={s.to} className={`flex h-full flex-col active:scale-[0.98] ${FRAME}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-primary-fixed">
                <img
                  src={s.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-bottom transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <span className="absolute top-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 py-1 pr-3 pl-1.5 text-[10px] font-black tracking-wider text-primary uppercase shadow-sm backdrop-blur-md">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white transition-colors duration-300 group-hover:bg-crimson">
                    <Icon name={s.icon} className="text-[13px]" />
                  </span>
                  {t.stop} 0{i + 1}
                </span>
              </div>

              <div className="flex flex-1 items-start justify-between gap-3 p-3.5">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-[15px] font-bold tracking-tight text-primary group-hover:text-crimson transition-colors duration-300 md:text-label-lg">
                    {t.stations[i].title}
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-on-surface-variant">
                    {t.stations[i].desc}
                  </p>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-sm transition-all duration-300 group-hover:border-crimson group-hover:bg-crimson group-hover:text-white">
                  <Icon name="arrow_forward" className="text-[17px] transition-transform duration-300 group-hover:translate-x-0.5" />
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

  const mask = `linear-gradient(to right, ${pos.start ? '#000' : 'transparent'} 0, #000 var(--g), #000 calc(100% - var(--g)), ${
    pos.end ? '#000' : 'transparent'
  } 100%)`

  const arrow =
    'flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/80 text-primary shadow-cloud-sm ring-1 ring-white backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white hover:text-crimson active:scale-95 disabled:pointer-events-none disabled:opacity-30'

  return (
    <section aria-label={t.galleryLabel} className="mt-14 md:mt-20">
      <div className="mx-auto flex max-w-lg items-end justify-between gap-4 px-5 md:max-w-6xl md:px-8">
        <Reveal className="px-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[11px] font-bold tracking-wider text-primary uppercase">
            <Icon name="photo_library" className="text-sm text-crimson" /> Campaign Visuals
          </div>
          <h2 className="mt-2 font-display text-headline-lg-mobile font-black tracking-tight text-primary md:text-headline-lg">
            {t.galleryTitle}
          </h2>
          <p className="mt-1 text-label-md text-on-surface-variant">
            <span className="md:hidden">{t.gallerySub}</span>
            <span className="hidden md:inline">{t.galleryDesk}</span>
          </p>
        </Reveal>

        <div className="hidden shrink-0 gap-2.5 md:flex">
          <button aria-label={t.prev} onClick={() => go(-1)} disabled={pos.start} className={arrow}>
            <Icon name="arrow_back" />
          </button>
          <button aria-label={t.next} onClick={() => go(1)} disabled={pos.end} className={arrow}>
            <Icon name="arrow_forward" />
          </button>
        </div>
      </div>

      {/* Full-bleed track with masked feather gradient edges */}
      <div
        ref={ref}
        onScroll={measure}
        tabIndex={0}
        aria-label={t.galleryLabel}
        style={{ maskImage: mask, WebkitMaskImage: mask, paddingInline: 'var(--g)', scrollPaddingInline: 'var(--g)' }}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain py-6 outline-none [--g:max(1.25rem,calc((100%_-_32rem)/2_+_1.25rem))] md:[--g:max(2rem,calc((100%_-_72rem)/2_+_2rem))]"
      >
        {GALLERY.map((g, i) => (
          <motion.figure
            key={g}
            data-card
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i, 3) * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={`group w-[78vw] max-w-[320px] shrink-0 snap-start md:w-[350px] md:max-w-none lg:w-[370px] ${FRAME}`}
          >
            <div className="overflow-hidden rounded-[22px] bg-white">
              <img
                src={`/assets/${g}.webp`}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] select-none group-hover:scale-[1.05]"
              />
            </div>
          </motion.figure>
        ))}
      </div>

      {/* Gallery Progress & Counter Indicator */}
      <div className="mx-auto flex max-w-lg items-center gap-4 px-6 md:max-w-6xl md:px-9">
        <span className="w-16 shrink-0 font-display text-label-md font-bold text-primary tabular-nums">
          {String(pos.idx + 1).padStart(2, '0')}
          <span className="font-medium text-on-surface-variant/50"> / {String(GALLERY.length).padStart(2, '0')}</span>
        </span>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/70 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-[#006aff] to-crimson shadow-sm"
            animate={{ width: `${Math.max(1 / GALLERY.length, pos.progress) * 100}%` }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
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
  const kvScale = useTransform(scrollYProgress, [0, 1], [1.12, 1])

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-lg space-y-12 px-5 pt-8 md:max-w-6xl md:space-y-20 md:px-8">
        {/* Sensory Philosophy Manifesto Card */}
        <Reveal className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/75 p-7 text-center shadow-luxury ring-1 ring-white backdrop-blur-2xl md:p-14">
          {/* Subtle Ambient Radial Highlight */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-gradient-to-b from-[#8cc8ff]/30 to-transparent blur-2xl" />

          <span className="inline-flex items-center gap-2 rounded-full border border-crimson/25 bg-crimson/10 px-4 py-1 text-[11px] font-extrabold tracking-[0.16em] text-crimson uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson" /> {t.introKicker}
          </span>

          <h2 className="mx-auto mt-3 max-w-2xl font-display text-headline-lg-mobile font-black tracking-tight text-primary md:text-[38px] md:leading-[1.15]">
            {t.introTitle}
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-body-md font-medium text-on-surface-variant leading-relaxed md:text-body-lg">
            {t.introBody}
          </p>

          {/* 4 Pillars of Tactile Sensation */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:mt-10 md:gap-4">
            {t.features.map((feat, i) => (
              <motion.div
                key={FEATURE_ICONS[i]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, type: 'spring', stiffness: 280, damping: 20 }}
                className="group flex flex-col items-center rounded-2xl border border-white/80 bg-white/60 p-4 shadow-cloud-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-cloud"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white bg-gradient-to-tr from-primary-fixed to-white text-primary shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:text-crimson">
                  <Icon name={FEATURE_ICONS[i]} className="text-2xl" />
                </span>
                <span className="mt-2.5 font-display text-[13px] font-bold text-primary">{feat.title}</span>
                <span className="mt-0.5 text-[11px] text-on-surface-variant/80">{feat.desc}</span>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Campaign Key Visual Showcase */}
        <Reveal>
          <div
            ref={kvRef}
            className="group relative overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-luxury ring-1 ring-white/90"
          >
            <picture>
              <source media="(min-width: 768px)" srcSet="/assets/hero.webp" />
              <motion.img
                style={{ scale: kvScale }}
                src="/assets/hero-m.webp"
                alt={t.kvAlt}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:aspect-[16/9]"
              />
            </picture>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#06192d]/80 via-[#06192d]/40 to-transparent p-6 text-white md:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-md">
                <Icon name="auto_awesome" className="text-xs text-crimson" /> {t.kvKicker}
              </span>
              <p className="mt-2 font-display text-headline-md font-black tracking-tight text-white md:text-headline-lg">
                Light as a Feather · Durex Fetherlite
              </p>
            </div>
          </div>
        </Reveal>

        {/* Fetherlite Luxury Feature Chamber — Sensual Ruby & Deep Midnight Marine */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-[#c80d19] via-crimson to-[#7a000c] p-7 text-white shadow-crimson md:flex md:items-center md:gap-10 md:p-14">
            {/* Luminous Specular Aura */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/20 blur-3xl animate-ambient-breathe" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#ff7597]/25 blur-3xl" />

            <div className="relative z-10 md:flex-1">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white backdrop-blur-md shadow-sm">
                <Icon name="air" className="text-sm" /> {t.bannerBadge}
              </span>

              <h2 className="mt-4 font-display text-[36px] leading-[1.04] font-black uppercase tracking-tight md:text-[52px]">
                {t.bannerTitle[0]}
                <br />
                <span className="bg-gradient-to-r from-white via-[#ffe6ec] to-[#ffb8c8] bg-clip-text text-transparent">
                  {t.bannerTitle[1]}
                </span>
              </h2>

              <p className="mt-3.5 max-w-md text-sm text-white/90 leading-relaxed md:text-body-md font-medium">
                {t.bannerBody}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate('/san-pham')}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-display text-label-lg font-bold tracking-wide text-crimson shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#fff0f3] active:scale-95"
                >
                  <span>{t.bannerCta}</span>
                  <Icon name="arrow_forward" className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* 3D Product Float Showcase */}
            <div className="relative mt-8 flex justify-center md:mt-0 md:w-84">
              <div className="absolute inset-0 m-auto h-56 w-56 rounded-full bg-white/25 blur-3xl" />
              <img
                src="/assets/p-fetherlite.webp"
                alt={t.boxAlt}
                loading="lazy"
                decoding="async"
                className="relative w-64 animate-floating drop-shadow-[0_28px_36px_rgba(40,0,5,0.5)] md:w-80"
              />
            </div>
          </div>
        </Reveal>

        {/* 4 Stations (Flight Itinerary) */}
        <Stations />
      </div>

      {/* Gallery Section */}
      <Gallery />

      {/* Final Departure Callout */}
      <div className="mx-auto max-w-lg px-5 pt-12 md:max-w-6xl md:px-8 md:pt-20">
        <Reveal className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/80 p-8 text-center shadow-luxury ring-1 ring-white backdrop-blur-2xl md:p-14">
          <HeartBalloon color="pink" className="pointer-events-none absolute -top-4 left-6 w-14 animate-floating opacity-70" />
          <HeartBalloon color="blue" className="pointer-events-none absolute -top-6 right-8 w-12 animate-floating [animation-delay:-2.5s] opacity-70" />

          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-crimson/10 px-4 py-1 text-[11px] font-bold tracking-widest text-crimson uppercase">
            <Icon name="airplane_ticket" className="text-sm" /> Boarding Lounge Call
          </div>

          <h2 className="mt-3 font-display text-headline-lg-mobile font-black tracking-tight text-primary uppercase md:text-headline-lg">
            {t.finalTitle}
          </h2>

          <p className="mx-auto mt-2.5 max-w-md text-sm text-on-surface-variant font-medium leading-relaxed md:text-body-md">
            {t.finalBody}
          </p>

          <div className="mt-8 flex justify-center">
            <CtaButton pulse className="px-10 py-4 text-label-lg shadow-crimson" onClick={() => navigate('/uu-dai')}>
              <Icon name="flight_takeoff" className="text-xl" />
              <span>{t.cta}</span>
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </>
  )
}

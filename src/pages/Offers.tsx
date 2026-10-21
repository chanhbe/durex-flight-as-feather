import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as KeyEvt } from 'react'
import { animate, AnimatePresence, motion, useAnimationControls } from 'motion/react'
import { AirButton, Burst, CtaButton, DurexLogo, Icon, Reveal } from '../components/ui'
import { HeartBalloon, RoundBalloon } from '../components/Balloons'
import { useApp } from '../components/AppProvider'
import { LEADERBOARD } from '../data/content'
import { fmtNum, useLang, useT, useTitle } from '../i18n'

const ZONE_MIN = 70
const ZONE_MAX = 92
const VOUCHER = 'DUREXAIR20'

const T = {
  vi: {
    title: 'Phòng Chờ Bay',
    lounge: 'The Departure Lounge',
    h1: ['CHẠM NHẸ', 'BAY BỔNG YÊU SÂU'],
    lead: ['Bơm bóng thăng hoa cùng', '. Cảm xúc nhẹ tênh tựa như mây trời!'],
    steps: [
      { t: 'Chạm Bơm', d: 'Nhấn giữ để bơm nhẹ' },
      { t: 'Đừng Để Nổ', d: 'Giữ trong vùng 70–92%' },
      { t: 'Thả Bay', d: 'Bay càng cao, quà càng lớn' },
    ],
    fullRules: 'Xem thể lệ đầy đủ',
    record: 'Kỷ lục',
    altitude: 'Độ Cao Bay',
    stageLabel: 'Khu vực bơm bóng. Giữ phím Space để bơm, nhấn Enter để thả bay.',
    flying: 'Đang cất cánh…',
    danger: 'Căng quá mức! Bấm “Thả Cánh Bay” ngay!',
    zone: 'Hoàn hảo! Thả ngay để nhân đôi điểm bay',
    idle: 'Nhấn giữ vào bóng hoặc nút đỏ để bơm',
    keyHint: 'Bàn phím: giữ [Space] để bơm · [Enter] để thả bay',
    gauge: 'Áp Suất Bơm (Sensory Gauge)',
    lblDanger: 'NGUY HIỂM QUÁ ÁP!',
    lblZone: 'VÙNG THĂNG HOA x2',
    lblSafe: 'An Toàn',
    scale: ['0% Dịu Nhẹ', '70–92% Vùng Bay (x2)', '100% Nổ!'],
    pump: 'GIỮ ĐỂ BƠM BÓNG',
    release: 'Thả Cánh Bay',
    popped: 'Bóp! Bóng căng quá nên đã nổ – thử lại nhẹ nhàng hơn nhé',
    tooFlat: 'Bóng còn xẹp quá – giữ nút để bơm thêm',
    perfect: (m: string) => `Cất cánh hoàn hảo! +${m} m`,
    okFlight: (m: string) => `+${m} m – thả trong vùng 70–92% để x2 điểm`,
    pop: 'BÓP!',
    perkKicker: 'Đặc Quyền Chiến Dịch',
    perkTitle: 'Thăng Hoa Cùng Fetherlite',
    perkBody: 'Mỏng hơn 20% so với bao cao su thông thường. Ôm khít tự nhiên.',
    bento: [
      { tag: 'Cảm Giác Tối Thượng', t: 'Chạm Tinh Tế', d: 'Bóng bay mềm mại tựa xúc cảm tự nhiên chân thực.' },
      { tag: 'Êm Ái Dồi Dào', t: 'Bôi Trơn Mượt', d: 'Thêm lượng gel bôi trơn cao cấp cho từng khoảnh khắc.' },
    ],
    formTitle: 'Nhận Mã E-Voucher 20%',
    formBody: 'Nhập thông tin nhận ngay mã ưu đãi gửi tức thì qua SMS/Email khi đạt mốc bay.',
    unlocked: (m: string) => `Đã mở khoá · tổng ${m}m`,
    locked: 'Thả bóng bay 1 lần để mở khoá',
    name: 'Họ và Tên',
    namePh: 'Nguyễn Văn A',
    contact: 'Email hoặc Số Điện Thoại',
    agree: 'Tôi đồng ý nhận cẩm nang sức khỏe & quà tặng từ Durex',
    errName: 'Vui lòng nhập họ tên của bạn',
    errContact: 'Email hoặc số điện thoại chưa hợp lệ',
    errAgree: 'Bạn cần đồng ý điều khoản để nhận voucher',
    errFly: 'Hãy thả bóng bay ít nhất 1 lần để mở khoá voucher!',
    claim: 'NHẬN E-VOUCHER GIẢM 20%',
    sent: (c: string) => `Đã gửi mã tới ${c}`,
    congrats: (n: string) => `Chúc mừng ${n}! 🎈`,
    sentBody: 'Mã ưu đãi đã được gửi. Bạn cũng có thể dùng ngay:',
    voucherKicker: 'E-Voucher Fetherlite',
    copy: 'Sao chép',
    copied: (c: string) => `Đã sao chép mã ${c}`,
    useNow: 'Dùng mã ngay',
    share: 'Chia sẻ',
    shareTitle: (m: string) => `Mình vừa bay ${m}m cùng Durex Fetherlite!`,
    privacy: '100% Bảo mật danh tính',
    instant: 'Gửi mã tức thì',
    lbTitle: 'Bảng Vàng Thăng Hoa',
    lbSub: 'Xếp hạng theo tổng độ cao bay',
    today: 'Hôm nay',
    week: 'Tuần này',
    player: 'Người chơi',
    shares: 'Chia sẻ',
    prize: 'Phần quà',
    you: '(Bạn)',
    meters: 'mét',
    myBalloon: 'Bóng hồng Fetherlite',
    collapse: 'Thu gọn',
    seeAll: (n: string) => `Xem tất cả ${n} chuyến bay`,
    voucherPct: (p: number) => `Voucher ${p}%`,
    community: ['Hơn', '12.800+', 'đôi bạn trẻ đã chia sẻ khoảnh khắc thăng hoa cùng chiến dịch'],
  },
  en: {
    title: 'Departure Lounge',
    lounge: 'The Departure Lounge',
    h1: ['TOUCH LIGHTLY', 'FLY HIGH, LOVE DEEP'],
    lead: ['Pump your balloon and take off with', '. A feeling as light as the clouds!'],
    steps: [
      { t: 'Pump', d: 'Press & hold to inflate' },
      { t: 'Don’t Pop', d: 'Stay in the 70–92% zone' },
      { t: 'Let Go', d: 'Fly higher, win bigger' },
    ],
    fullRules: 'Read the full rules',
    record: 'Best',
    altitude: 'Altitude',
    stageLabel: 'Balloon pump area. Hold Space to inflate, press Enter to release.',
    flying: 'Taking off…',
    danger: 'Too tight! Hit “Let It Fly” now!',
    zone: 'Perfect! Release now to double your altitude',
    idle: 'Press & hold the balloon or the red button',
    keyHint: 'Keyboard: hold [Space] to pump · [Enter] to release',
    gauge: 'Pump Pressure (Sensory Gauge)',
    lblDanger: 'OVER-PRESSURE!',
    lblZone: 'BLISS ZONE x2',
    lblSafe: 'Safe',
    scale: ['0% Gentle', '70–92% Bliss Zone (x2)', '100% Pop!'],
    pump: 'HOLD TO PUMP',
    release: 'Let It Fly',
    popped: 'Pop! Too much pressure – try a gentler touch',
    tooFlat: 'Still too flat – hold to pump some more',
    perfect: (m: string) => `Perfect take-off! +${m} m`,
    okFlight: (m: string) => `+${m} m – release in the 70–92% zone for x2`,
    pop: 'POP!',
    perkKicker: 'Campaign Perk',
    perkTitle: 'Soar with Fetherlite',
    perkBody: '20% thinner than standard condoms. A naturally close fit.',
    bento: [
      { tag: 'Ultimate Sensation', t: 'Delicate Touch', d: 'Soft as a balloon, for a genuinely natural feel.' },
      { tag: 'Rich & Silky', t: 'Smooth Glide', d: 'Extra premium lubricant for every moment.' },
    ],
    formTitle: 'Claim Your 20% E-Voucher',
    formBody: 'Enter your details and we’ll send your code instantly by SMS/email once you’ve flown.',
    unlocked: (m: string) => `Unlocked · total ${m}m`,
    locked: 'Fly your balloon once to unlock',
    name: 'Full Name',
    namePh: 'Alex Nguyen',
    contact: 'Email or Phone Number',
    agree: 'I agree to receive health guides & gifts from Durex',
    errName: 'Please enter your name',
    errContact: 'That email or phone number doesn’t look right',
    errAgree: 'Please accept the terms to receive your voucher',
    errFly: 'Fly your balloon at least once to unlock the voucher!',
    claim: 'CLAIM 20% OFF E-VOUCHER',
    sent: (c: string) => `Code sent to ${c}`,
    congrats: (n: string) => `Congrats, ${n}! 🎈`,
    sentBody: 'Your code is on its way. You can also use it right now:',
    voucherKicker: 'Fetherlite E-Voucher',
    copy: 'Copy',
    copied: (c: string) => `Code ${c} copied`,
    useNow: 'Use code now',
    share: 'Share',
    shareTitle: (m: string) => `I just flew ${m}m with Durex Fetherlite!`,
    privacy: '100% identity protected',
    instant: 'Instant delivery',
    lbTitle: 'Hall of Fame',
    lbSub: 'Ranked by total altitude',
    today: 'Today',
    week: 'This week',
    player: 'Player',
    shares: 'Shares',
    prize: 'Prize',
    you: '(You)',
    meters: 'm',
    myBalloon: 'Pink Fetherlite balloon',
    collapse: 'Show less',
    seeAll: (n: string) => `See all ${n} flights`,
    voucherPct: (p: number) => `${p}% voucher`,
    community: ['', '12,800+', 'young couples have shared their blissful moments with the campaign'],
  },
}

type Phase = 'ready' | 'flying' | 'popped'

function useAnimatedNumber(value: number) {
  const [display, setDisplay] = useState(value)
  const from = useRef(value)
  useEffect(() => {
    const c = animate(from.current, value, { duration: 0.9, ease: 'easeOut', onUpdate: (v) => setDisplay(Math.round(v)) })
    from.current = value
    return () => c.stop()
  }, [value])
  return display
}

function BalloonGame({ onFlight }: { onFlight: (totalMeters: number) => void }) {
  const t = useT(T)
  const { lang } = useLang()
  const { toast } = useApp()
  const [pressure, setPressure] = useState(0)
  const [phase, setPhase] = useState<Phase>('ready')
  const [altitude, setAltitude] = useState(0)
  const [best, setBest] = useState(0)
  const [lastGain, setLastGain] = useState<number | null>(null)
  const [burst, setBurst] = useState(false)
  const holding = useRef(false)
  const pressureRef = useRef(0)
  const controls = useAnimationControls()
  const altDisplay = useAnimatedNumber(altitude)

  pressureRef.current = pressure
  const inZone = pressure >= ZONE_MIN && pressure <= ZONE_MAX
  const danger = pressure > ZONE_MAX

  const pop = useCallback(() => {
    holding.current = false
    setPhase('popped')
    setBurst(true)
    setTimeout(() => setBurst(false), 900)
    toast(t.popped, 'warning')
    setTimeout(() => {
      setPressure(0)
      setPhase('ready')
    }, 1400)
  }, [toast, t.popped])

  // Game loop: inflate while holding, slowly deflate otherwise.
  useEffect(() => {
    if (phase !== 'ready') return
    const timer = setInterval(() => {
      const p = pressureRef.current
      if (holding.current) {
        const next = p + (p > 60 ? 1.6 : 2.4)
        if (next >= 100) {
          setPressure(100)
          pop()
        } else setPressure(next)
      } else if (p > 0) {
        setPressure(Math.max(0, p - 0.35))
      }
    }, 50)
    return () => clearInterval(timer)
  }, [phase, pop])

  const startHold = () => {
    if (phase !== 'ready') return
    holding.current = true
    setPressure((p) => Math.min(99, p + 3))
  }
  const endHold = () => {
    holding.current = false
  }

  const release = async () => {
    if (phase !== 'ready') return
    if (pressure < 15) {
      toast(t.tooFlat, 'air')
      return
    }
    holding.current = false
    const p = pressure
    const meters = Math.round(inZone ? p * 20 + 400 : p * 10)
    setPhase('flying')
    await controls.start({ y: -420, scale: 0.7, rotate: [0, -6, 6, 0], transition: { duration: 1.4, ease: [0.3, 0, 0.2, 1] } })
    const total = altitude + meters
    setAltitude(total)
    onFlight(total)
    setLastGain(meters)
    setBest((b) => Math.max(b, meters))
    toast(inZone ? t.perfect(fmtNum(meters, lang)) : t.okFlight(fmtNum(meters, lang)), 'flight_takeoff')
    controls.set({ y: 80, scale: 0.6, rotate: 0 })
    setPressure(0)
    await controls.start({ y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 14 } })
    setPhase('ready')
    setTimeout(() => setLastGain(null), 1500)
  }

  const onKeyDown = (e: KeyEvt) => {
    if (e.key === ' ') {
      e.preventDefault()
      if (!e.repeat) startHold()
    } else if (e.key === 'Enter') {
      e.preventDefault()
      void release()
    }
  }
  const onKeyUp = (e: KeyEvt) => {
    if (e.key === ' ') endHold()
  }

  const scale = 0.6 + (pressure / 100) * 0.65
  const label = danger ? t.lblDanger : inZone ? t.lblZone : t.lblSafe
  const status = phase === 'flying' ? t.flying : danger ? t.danger : inZone ? t.zone : t.idle

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-luxury ring-1 ring-white/90 backdrop-blur-2xl md:p-8">
      {/* Specular hairline and atmospheric glows */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-pink-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-cyan-200/40 blur-3xl" />

      {/* Top Bar of the Flight Cockpit */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3.5 py-1.5 shadow-cloud-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span className="text-[11px] font-black uppercase tracking-wider text-primary">Fetherlite 0.045mm</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/80 px-3.5 py-1.5 text-label-md shadow-cloud-sm backdrop-blur-md">
          <Icon name="emoji_events" fill className="text-base text-crimson" />
          <span className="text-xs font-bold text-on-surface-variant">{t.record}:</span>
          <span className="font-extrabold text-primary tabular-nums">
            {fmtNum(best, lang)}m
          </span>
        </div>
      </div>

      {/* Interactive Arena Stage */}
      <div
        role="application"
        aria-label={t.stageLabel}
        tabIndex={0}
        className="relative my-4 flex h-84 touch-none flex-col items-center justify-end rounded-2xl border border-white/50 bg-gradient-to-b from-white/20 via-primary-fixed/20 to-white/40 select-none shadow-inner"
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={endHold}
        onContextMenu={(e) => e.preventDefault()}
      >
        {/* Altitude Digital Readout HUD */}
        <div className="absolute top-4 right-4 text-right">
          <div className="text-[10px] font-black tracking-widest text-primary/70 uppercase">{t.altitude}</div>
          <div className="font-display text-[34px] font-black leading-none text-primary tabular-nums">
            {fmtNum(altDisplay, lang)} <span className="font-sans text-xs font-semibold text-primary/70">m</span>
          </div>
          <AnimatePresence>
            {lastGain !== null && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12 }}
                className="mt-0.5 inline-flex items-center gap-0.5 rounded-full bg-crimson/10 px-2 py-0.5 text-xs font-extrabold text-crimson shadow-sm"
              >
                +{fmtNum(lastGain, lang)}m
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Burst show={burst} count={24} />

        {/* Floating Condom Box & Balloon Arena */}
        <motion.div animate={controls} className="relative mb-10 flex items-end">
          <img
            src="/assets/p-fetherlite.webp"
            alt=""
            draggable={false}
            className="absolute bottom-0 -left-14 z-20 w-18 drop-shadow-[0_12px_24px_rgba(229,27,36,0.35)] pointer-events-none"
          />
          <HeartBalloon color="blue" className="absolute bottom-8 -right-10 w-14 animate-floating [animation-duration:3.2s] pointer-events-none" />

          <AnimatePresence mode="popLayout">
            {phase !== 'popped' ? (
              <motion.div
                key="balloon"
                style={{ transformOrigin: '50% 100%' }}
                animate={{
                  scale,
                  x: danger ? [0, -4, 4, -3, 3, 0] : 0,
                  filter: danger
                    ? 'drop-shadow(0 0 20px rgba(229,27,36,0.8))'
                    : inZone
                    ? 'drop-shadow(0 0 24px rgba(52,211,153,0.7))'
                    : 'drop-shadow(0 12px 24px rgba(140,68,100,0.25))',
                }}
                transition={{
                  scale: { type: 'spring', stiffness: 260, damping: 18 },
                  x: { duration: 0.25, repeat: danger ? Infinity : 0 },
                }}
                exit={{ scale: scale * 1.4, opacity: 0, transition: { duration: 0.15 } }}
                className="cursor-pointer transition-transform active:scale-95"
              >
                <RoundBalloon color="pink" className="h-48 w-auto" />
              </motion.div>
            ) : (
              <motion.div key="popped" initial={{ scale: 0.6, opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1 }} className="h-48 w-32 flex items-center justify-center">
                <span className="font-display text-[44px] font-black text-crimson animate-bounce drop-shadow-md">{t.pop}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Live Feedback Status Capsule */}
        <div
          aria-live="polite"
          className="absolute bottom-3 flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-4 py-1.5 text-xs font-bold text-primary shadow-cloud-sm backdrop-blur-md"
        >
          {phase === 'flying' ? (
            <Icon name="flight_takeoff" className="text-base text-crimson animate-pulse" />
          ) : (
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                danger
                  ? 'animate-ping bg-crimson'
                  : inZone
                  ? 'animate-ping bg-emerald-500'
                  : 'bg-primary'
              }`}
            />
          )}
          <span className={danger ? 'text-crimson font-black' : inZone ? 'text-emerald-700 font-extrabold' : ''}>
            {status}
          </span>
        </div>
      </div>

      {/* Sensory Barometer & Gauge */}
      <div className="mt-4 space-y-2 rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between gap-2 text-label-sm">
          <span className="flex items-center gap-1.5 font-bold text-primary">
            <Icon name="speed" className="text-sm text-primary" /> {t.gauge}
          </span>
          <span className={`text-right font-black tabular-nums ${danger ? 'text-crimson animate-pulse' : inZone ? 'text-emerald-700' : 'text-primary'}`}>
            {Math.round(pressure)}% [{label}]
          </span>
        </div>

        {/* High-Precision Barometer Track */}
        <div
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pressure)}
          aria-label={t.gauge}
          className="relative h-4 w-full overflow-hidden rounded-full border border-white/80 bg-white/80 p-0.5 shadow-inner"
        >
          {/* Bliss Zone Ribbon Indicator */}
          <div
            className="absolute inset-y-0 rounded-full bg-emerald-400/40 border border-emerald-400/60 transition-opacity"
            style={{ left: `${ZONE_MIN}%`, width: `${ZONE_MAX - ZONE_MIN}%` }}
          />
          {/* Active Liquid Pressure Fill */}
          <div
            className={`relative h-full rounded-full transition-[width] duration-75 shadow-sm ${
              danger
                ? 'bg-gradient-to-r from-primary via-amber-500 to-crimson'
                : inZone
                ? 'bg-gradient-to-r from-primary via-sky-400 to-emerald-500'
                : 'bg-gradient-to-r from-primary via-[#0066ff] to-primary'
            }`}
            style={{ width: `${pressure}%` }}
          />
        </div>

        {/* Scale Legend */}
        <div className="flex justify-between px-1 text-[11px] font-bold text-on-surface-variant/80">
          <span>{t.scale[0]}</span>
          <span className="text-emerald-700">{t.scale[1]}</span>
          <span className="text-crimson">{t.scale[2]}</span>
        </div>
      </div>

      {/* Control Trigger CTAs */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <CtaButton
          className="flex-1 py-4 text-label-lg select-none shadow-crimson"
          disabled={phase !== 'ready'}
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onPointerCancel={endHold}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault()
              if (!e.repeat) startHold()
            }
          }}
          onKeyUp={(e) => (e.key === ' ' || e.key === 'Enter') && endHold()}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Icon name="air" className="text-xl" /> {t.pump}
        </CtaButton>

        <AirButton
          className="px-6 py-4 text-label-lg font-extrabold"
          disabled={phase !== 'ready'}
          onClick={release}
        >
          <Icon name="flight_takeoff" className="text-lg text-primary" /> {t.release}
        </AirButton>
      </div>

      <p className="mt-3.5 hidden text-center text-[11px] font-semibold text-on-surface-variant/70 md:block">
        {t.keyHint}
      </p>
    </section>
  )
}

type Row = { name: string; balloon: string; meters: number; shares: number; me?: boolean }

function Leaderboard({ rows }: { rows: Row[] }) {
  const t = useT(T)
  const { lang } = useLang()
  const [range, setRange] = useState<'today' | 'week'>('today')
  const [expanded, setExpanded] = useState(false)

  const sorted = useMemo(() => {
    const k = range === 'week' ? 3.2 : 1
    return [...rows]
      .map((r) => (r.me ? r : { ...r, meters: Math.round(r.meters * k), shares: Math.round(r.shares * k) }))
      .sort((a, b) => b.meters - a.meters || b.shares - a.shares)
  }, [rows, range])

  const shown = expanded ? sorted : sorted.slice(0, 4)
  const reward = (i: number) => t.voucherPct(i === 0 ? 50 : i === 1 ? 30 : i === 2 ? 20 : 10)

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-luxury ring-1 ring-white/90 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      {/* Header with Segmented Pill Switch */}
      <div className="flex items-center justify-between gap-2 border-b border-surface-container/60 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 shadow-sm">
            <Icon name="emoji_events" fill className="text-xl" />
          </div>
          <div>
            <h2 className="font-display text-headline-sm font-bold text-primary">{t.lbTitle}</h2>
            <span className="text-[12px] text-on-surface-variant">{t.lbSub}</span>
          </div>
        </div>

        <div className="flex shrink-0 rounded-full border border-white/80 bg-white/80 p-1 text-[12px] font-bold shadow-sm">
          {(['today', 'week'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={`relative rounded-full px-3 py-1.5 whitespace-nowrap transition-colors duration-300 ${
                range === r ? 'text-white' : 'text-primary hover:text-primary/70'
              }`}
            >
              {range === r && (
                <motion.span
                  layoutId="lb-range"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-[#0055ff] shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              {r === 'today' ? t.today : t.week}
            </button>
          ))}
        </div>
      </div>

      {/* Table Headers */}
      <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-x-3 px-2 text-[10px] font-black text-on-surface-variant/70 uppercase tracking-wider">
        <span>{t.player}</span>
        <span className="text-right">{t.shares}</span>
        <span className="w-24 text-right">{t.prize}</span>
      </div>

      {/* Leaderboard Rows */}
      <motion.ol layout className="mt-2 divide-y divide-surface-container/40">
        <AnimatePresence initial={false}>
          {shown.map((r, i) => {
            const isFirst = i === 0
            const isSecond = i === 1
            const isThird = i === 2

            return (
              <motion.li
                layout
                key={r.name}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-3 py-3 transition-colors ${
                  r.me ? '-mx-2 rounded-2xl bg-crimson/10 px-3 border border-crimson/20' : ''
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black shadow-sm ${
                      isFirst
                        ? 'bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950 shadow-amber-400/40'
                        : isSecond
                        ? 'bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-800'
                        : isThird
                        ? 'bg-gradient-to-tr from-amber-700 to-amber-500 text-white'
                        : 'border border-primary/20 bg-white/80 text-primary'
                    }`}
                  >
                    {i + 1}
                  </span>

                  <div className="min-w-0">
                    <div className="truncate text-label-md font-bold text-on-surface">
                      {r.name} {r.me && <span className="font-extrabold text-crimson">{t.you}</span>}
                    </div>
                    <div className="text-[11px] font-medium text-on-surface-variant">
                      {r.balloon} • <strong className="text-primary">{fmtNum(r.meters, lang)} {t.meters}</strong>
                    </div>
                  </div>
                </div>

                <span className="flex items-center gap-1 text-[11px] font-bold text-on-surface-variant">
                  <Icon name="share" className="text-xs text-primary/70" /> {r.shares}
                </span>

                <span
                  className={`w-24 text-right text-label-md font-extrabold ${
                    i === 0 ? 'text-crimson font-black' : 'text-primary'
                  }`}
                >
                  {reward(i)}
                </span>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ol>

      {/* Expand / Collapse Control */}
      <div className="mt-4 border-t border-surface-container/60 pt-3 text-center">
        <button
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1.5 text-label-sm font-bold text-primary hover:text-crimson transition-colors"
        >
          <span>{expanded ? t.collapse : t.seeAll(fmtNum(range === 'week' ? 4912 : 1428, lang))}</span>
          <Icon name={expanded ? 'expand_less' : 'chevron_right'} className="text-sm" />
        </button>
      </div>
    </section>
  )
}

export function Offers() {
  const t = useT(T)
  const { lang } = useLang()
  useTitle(t.title)
  const { toast, openBuy, openShare, openPolicy } = useApp()
  const [best, setBest] = useState(0)
  const [form, setForm] = useState({ name: '', contact: '', agree: true })
  const [error, setError] = useState<string | null>(null)
  const [claimed, setClaimed] = useState<{ name: string } | null>(null)
  const [myShares, setMyShares] = useState(0)
  const formRef = useRef<HTMLElement>(null)
  const gameRef = useRef<HTMLDivElement>(null)

  const onFlight = (m: number) => {
    if (best === 0 && window.innerWidth < 1024) {
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 900)
    }
    setBest(m)
  }

  const rows: Row[] = useMemo(() => {
    const base: Row[] = LEADERBOARD.map((r) => ({ name: r.name, balloon: r.balloon[lang], meters: r.meters, shares: r.shares }))
    if (claimed) base.push({ name: claimed.name, balloon: t.myBalloon, meters: best, shares: myShares, me: true })
    return base
  }, [claimed, best, myShares, lang, t.myBalloon])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const contact = form.contact.trim()
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    const isPhone = /^(0|\+84)\d{9,10}$/.test(contact.replace(/[\s.]/g, ''))
    if (form.name.trim().length < 2) return setError(t.errName)
    if (!isEmail && !isPhone) return setError(t.errContact)
    if (!form.agree) return setError(t.errAgree)
    if (best === 0) {
      setError(t.errFly)
      gameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setError(null)
    setClaimed({ name: form.name.trim() })
    toast(t.sent(contact), 'mark_email_read')
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(VOUCHER)
    } catch {
      /* ignore */
    }
    toast(t.copied(VOUCHER))
  }

  const shareFlight = () => {
    setMyShares((s) => s + 1)
    openShare({ title: t.shareTitle(fmtNum(best, lang)), url: 'https://durex.vn/nhe-nhu-bay/uu-dai' })
  }

  const inputCls =
    'w-full rounded-full border border-primary/20 bg-white/90 py-3 pr-4 pl-11 text-body-md shadow-sm transition-all outline-none focus:border-crimson focus:bg-white focus:ring-2 focus:ring-crimson/20'

  return (
    <div className="mx-auto max-w-lg space-y-8 px-5 pt-4 pb-8 md:max-w-6xl md:space-y-10 md:px-8 md:pt-8">
      {/* Editorial Header */}
      <section className="relative pt-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-1.5 shadow-cloud-sm backdrop-blur-xl">
          <DurexLogo variant="blue" size="sm" />
          <span className="text-on-surface-variant/40">/</span>
          <span className="text-[11px] font-extrabold tracking-wider text-primary uppercase">{t.lounge}</span>
        </div>

        <motion.h1
          key={lang}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-4 font-display text-headline-lg-mobile font-black tracking-tight text-white uppercase drop-shadow-[0_4px_16px_rgba(0,35,75,0.35)] md:text-[54px] md:leading-[1.05]"
        >
          {t.h1[0]}
          <br />
          <span className="text-primary-fixed drop-shadow-[0_4px_16px_rgba(0,40,80,0.4)]">{t.h1[1]}</span>
        </motion.h1>

        <p className="mx-auto mt-2.5 max-w-xs text-body-md font-medium text-white/95 drop-shadow-[0_2px_8px_rgba(0,35,75,0.3)] md:max-w-md md:text-body-lg">
          {t.lead[0]} <strong className="font-extrabold text-white">Durex Fetherlite</strong>
          {t.lead[1]}
        </p>

        {/* 3 Step Flight Manual Pills */}
        <div className="mx-auto mt-6 grid max-w-xl grid-cols-3 gap-2.5 px-1">
          {t.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-white/80 bg-white/80 p-3 text-center shadow-cloud-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/95"
            >
              <div
                className={`mx-auto mb-1.5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-black shadow-sm ${
                  [
                    'bg-primary text-white',
                    'bg-crimson text-white shadow-crimson',
                    'bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-950',
                  ][i]
                }`}
              >
                {i + 1}
              </div>
              <span className="block font-display text-[12px] font-bold text-primary">{s.t}</span>
              <span className="mt-0.5 block text-[10.5px] leading-tight text-on-surface-variant font-medium">{s.d}</span>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => openPolicy('rules')}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/30 px-3.5 py-1 text-label-sm font-semibold text-white shadow-sm backdrop-blur-md hover:bg-white/45 transition-colors"
        >
          <Icon name="gavel" className="text-sm" /> {t.fullRules}
        </button>
      </section>

      {/* Main Interactive Grid */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-8">
        {/* Left Column: Flight Arena Game + Bento Perks */}
        <div className="space-y-6">
          <div ref={gameRef}>
            <BalloonGame onFlight={onFlight} />
          </div>

          {/* Campaign Perk Banner */}
          <Reveal className="flex items-center justify-between gap-4 rounded-[28px] border border-white/80 bg-gradient-to-r from-primary-fixed/80 via-white/85 to-pink-50/85 p-5 shadow-luxury ring-1 ring-white/90 backdrop-blur-xl">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black tracking-wider text-crimson uppercase">
                <Icon name="verified" className="text-xs" /> {t.perkKicker}
              </div>
              <h2 className="font-display text-headline-sm font-bold text-primary leading-tight">{t.perkTitle}</h2>
              <p className="text-label-sm font-medium text-on-surface-variant">{t.perkBody}</p>
            </div>
            <motion.button
              onClick={() => openBuy()}
              whileHover={{ rotate: 0, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Sale -20%"
              className="flex h-16 w-16 shrink-0 rotate-6 flex-col items-center justify-center rounded-full bg-gradient-to-tr from-crimson to-[#ff2a54] text-white shadow-glow-red transition-transform"
            >
              <span className="text-[10px] font-black uppercase tracking-wider">SALE</span>
              <span className="text-base leading-none font-black">-20%</span>
            </motion.button>
          </Reveal>

          {/* Sensory Bento Cards */}
          <section className="grid grid-cols-2 gap-3.5">
            {[
              { img: '/assets/feel-touch-m.webp', tagC: 'text-primary' },
              { img: '/assets/feel-lube-m.webp', tagC: 'text-crimson' },
            ].map((b, i) => (
              <Reveal
                key={b.img}
                delay={i * 0.1}
                className="group relative col-span-2 flex h-48 flex-col justify-between overflow-hidden rounded-[24px] border border-white/80 p-5 shadow-cloud backdrop-blur-md sm:col-span-1"
              >
                <img
                  src={b.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                <span className={`self-start rounded-full border border-white/70 bg-white/85 px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md ${b.tagC}`}>
                  {t.bento[i].tag}
                </span>
                <div>
                  <h3 className="font-display text-headline-sm font-bold text-white">{t.bento[i].t}</h3>
                  <p className="mt-0.5 text-xs font-medium text-white/90 leading-relaxed">{t.bento[i].d}</p>
                </div>
              </Reveal>
            ))}
          </section>
        </div>

        {/* Right Column: E-Voucher Claim + Leaderboard */}
        <div className="space-y-6">
          <section
            ref={formRef}
            className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-luxury ring-1 ring-white/90 backdrop-blur-2xl md:p-8"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <Burst show={!!claimed} count={28} />

            <AnimatePresence mode="wait">
              {!claimed ? (
                <motion.div key="form" exit={{ opacity: 0, scale: 0.96 }}>
                  <div className="mx-auto mb-5 max-w-sm text-center">
                    <div className="mb-2.5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-primary-fixed to-sky-100 text-primary shadow-sm">
                      <Icon name="confirmation_number" fill className="text-2xl" />
                    </div>
                    <h2 className="font-display text-headline-md font-bold text-primary">{t.formTitle}</h2>
                    <p className="mt-1 text-sm font-medium text-on-surface-variant leading-relaxed">{t.formBody}</p>

                    <div
                      className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-black uppercase tracking-wider shadow-sm ${
                        best > 0 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-white/80 text-on-surface-variant border border-primary/15'
                      }`}
                    >
                      <Icon name={best > 0 ? 'lock_open' : 'lock'} className="text-sm" />
                      {best > 0 ? t.unlocked(fmtNum(best, lang)) : t.locked}
                    </div>
                  </div>

                  <form className="space-y-3.5" onSubmit={submit} noValidate>
                    <div>
                      <label className="mb-1 ml-3 block text-label-sm font-bold text-primary" htmlFor="fullName">
                        {t.name}
                      </label>
                      <div className="relative">
                        <Icon name="person" className="absolute top-1/2 left-4 -translate-y-1/2 text-lg text-primary/60" />
                        <input
                          id="fullName"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={t.namePh}
                          autoComplete="name"
                          aria-invalid={error === t.errName || undefined}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 ml-3 block text-label-sm font-bold text-primary" htmlFor="contact">
                        {t.contact}
                      </label>
                      <div className="relative">
                        <Icon name="mail" className="absolute top-1/2 left-4 -translate-y-1/2 text-lg text-primary/60" />
                        <input
                          id="contact"
                          value={form.contact}
                          onChange={(e) => setForm({ ...form, contact: e.target.value })}
                          placeholder="durexlover@example.com"
                          autoComplete="email"
                          inputMode="email"
                          aria-invalid={error === t.errContact || undefined}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <label className="flex cursor-pointer items-center gap-2.5 px-2 pt-1">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                        className="h-4 w-4 rounded accent-crimson"
                      />
                      <span className="text-[12px] font-medium text-on-surface-variant">{t.agree}</span>
                    </label>

                    <AnimatePresence>
                      {error && (
                        <motion.p
                          role="alert"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-1.5 px-3 text-xs font-bold text-crimson"
                        >
                          <Icon name="error" className="text-sm" /> {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <CtaButton type="submit" className="w-full py-4 text-label-lg shadow-crimson">
                      <Icon name="redeem" fill className="text-lg" /> {t.claim}
                    </CtaButton>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-2">
                  <h2 className="font-display text-headline-md font-black text-primary">{t.congrats(claimed.name)}</h2>
                  <p className="mt-1 text-sm font-medium text-on-surface-variant">{t.sentBody}</p>

                  {/* Golden Perforated Boarding Pass Ticket */}
                  <motion.div
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="relative mx-auto mt-5 flex max-w-xs items-stretch overflow-hidden rounded-2xl bg-gradient-to-r from-crimson to-[#ff3b4e] text-white shadow-glow-red"
                  >
                    <div className="flex-1 p-4 text-left">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/80">{t.voucherKicker}</p>
                      <p className="font-display text-[36px] font-black leading-none">-20%</p>
                      <p className="mt-1 font-mono text-sm font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded w-fit">{VOUCHER}</p>
                    </div>
                    <div className="relative w-px border-l-2 border-dashed border-white/50" />
                    <button
                      onClick={copyCode}
                      className="flex w-22 flex-col items-center justify-center gap-1 text-[11px] font-black tracking-wider uppercase hover:bg-white/10 active:scale-95 transition-all"
                    >
                      <Icon name="content_copy" className="text-lg" /> {t.copy}
                    </button>
                  </motion.div>

                  <div className="mt-5 flex gap-2.5">
                    <CtaButton className="flex-1 py-3.5 text-label-md" onClick={() => openBuy()}>
                      <Icon name="local_mall" fill className="text-lg" /> {t.useNow}
                    </CtaButton>
                    <AirButton className="px-5 py-3.5 text-label-md font-bold" onClick={shareFlight}>
                      <Icon name="share" className="text-lg text-primary" /> {t.share}
                    </AirButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Privacy Badges */}
            <div className="mt-4 flex items-center justify-center gap-5 text-[11px] font-bold text-on-surface-variant/75 border-t border-surface-container/60 pt-3">
              <span className="flex items-center gap-1 text-primary">
                <Icon name="lock" className="text-xs" /> {t.privacy}
              </span>
              <span className="flex items-center gap-1 text-primary">
                <Icon name="bolt" className="text-xs" /> {t.instant}
              </span>
            </div>
          </section>

          <Reveal>
            <Leaderboard rows={rows} />
          </Reveal>

          {/* Social Proof Counter */}
          <section className="py-1 text-center">
            <div className="rounded-2xl border border-white/70 bg-white/70 p-3.5 shadow-cloud-sm backdrop-blur-md">
              <p className="text-xs font-bold text-primary">
                🎈 {t.community[0]} <span className="text-crimson font-black">{t.community[1]}</span> {t.community[2]}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

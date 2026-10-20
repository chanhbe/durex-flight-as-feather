import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent as KeyEvt } from 'react'
import { animate, AnimatePresence, motion, useAnimationControls } from 'motion/react'
import { AirButton, Burst, CtaButton, Icon, Reveal } from '../components/ui'
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
      { t: 'Chạm Bơm', d: 'Nhấn giữ để bơm' },
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
    keyHint: 'Bàn phím: giữ Space để bơm · Enter để thả',
    gauge: 'Áp Suất Bơm (Sensory Gauge)',
    lblDanger: 'NGUY HIỂM QUÁ ÁP!',
    lblZone: 'VÙNG THĂNG HOA',
    lblSafe: 'An Toàn',
    scale: ['0% Dịu Nhẹ', '70–92% Bay Bổng', '100% Nổ!'],
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
    keyHint: 'Keyboard: hold Space to pump · Enter to release',
    gauge: 'Pump Pressure (Sensory Gauge)',
    lblDanger: 'OVER-PRESSURE!',
    lblZone: 'BLISS ZONE',
    lblSafe: 'Safe',
    scale: ['0% Gentle', '70–92% Soaring', '100% Pop!'],
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
    <section className="relative overflow-hidden rounded-xl border border-white/60 bg-white/25 p-5 shadow-cloud backdrop-blur-xl md:p-6">
      <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-pink-300/30 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-cyan-200/40 blur-2xl" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/50 px-3 py-1 backdrop-blur-md">
          <Icon name="air" className="text-base text-primary" />
          <span className="text-label-sm text-primary">Fetherlite 0.045mm</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/60 bg-white/50 px-2.5 py-1 text-label-md text-on-surface-variant">
          <Icon name="emoji_events" fill className="text-base text-crimson" />
          <span className="font-extrabold text-on-surface">
            {t.record}: {fmtNum(best, lang)}m
          </span>
        </div>
      </div>

      <div
        role="application"
        aria-label={t.stageLabel}
        tabIndex={0}
        className="relative my-2 flex h-80 touch-none flex-col items-center justify-end rounded-2xl select-none"
        onPointerDown={startHold}
        onPointerUp={endHold}
        onPointerLeave={endHold}
        onPointerCancel={endHold}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onBlur={endHold}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="absolute top-2 right-2 text-right">
          <div className="text-[10px] font-bold tracking-wider text-primary/80 uppercase">{t.altitude}</div>
          <div className="text-headline-md font-extrabold text-primary tabular-nums">
            {fmtNum(altDisplay, lang)} <span className="text-label-sm font-normal">m</span>
          </div>
          <AnimatePresence>
            {lastGain !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-label-md font-bold text-crimson"
              >
                +{fmtNum(lastGain, lang)}m
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Burst show={burst} count={22} />

        <motion.div animate={controls} className="relative mb-9 flex items-end">
          <img
            src="/assets/p-fetherlite.webp"
            alt=""
            draggable={false}
            className="absolute bottom-0 -left-12 z-20 w-16 drop-shadow-[0_6px_16px_rgba(229,27,36,0.4)]"
          />
          <HeartBalloon color="blue" className="absolute bottom-6 -right-8 w-12 animate-floating [animation-duration:3s]" />
          <AnimatePresence mode="popLayout">
            {phase !== 'popped' ? (
              <motion.div
                key="balloon"
                style={{ transformOrigin: '50% 100%' }}
                animate={{
                  scale,
                  x: danger ? [0, -3, 3, -2, 2, 0] : 0,
                  filter: danger ? 'hue-rotate(-20deg) saturate(1.4)' : 'hue-rotate(0deg) saturate(1)',
                }}
                transition={{ scale: { type: 'spring', stiffness: 260, damping: 18 }, x: { duration: 0.3, repeat: danger ? Infinity : 0 } }}
                exit={{ scale: scale * 1.4, opacity: 0, transition: { duration: 0.15 } }}
                className="cursor-pointer"
              >
                <RoundBalloon color="pink" className="h-44 w-auto drop-shadow-[0_10px_20px_rgba(140,68,100,0.25)]" />
              </motion.div>
            ) : (
              <motion.div key="popped" initial={{ scale: 0.6, opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 1 }} className="h-44 w-28">
                <span className="block pt-14 text-center text-display-mobile font-extrabold text-crimson">{t.pop}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div
          aria-live="polite"
          className="absolute bottom-1 flex items-center gap-1.5 rounded-full border border-white bg-white/70 px-3 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur-md"
        >
          {phase === 'flying' ? (
            <Icon name="flight_takeoff" className="text-sm text-crimson" />
          ) : (
            <span
              className={`h-2 w-2 rounded-full ${danger ? 'animate-ping bg-secondary' : inZone ? 'animate-ping bg-emerald-500' : 'bg-primary'}`}
            />
          )}
          <span className={phase === 'flying' || danger ? 'font-bold text-secondary' : ''}>{status}</span>
        </div>
      </div>

      <div className="mt-2 space-y-1.5">
        <div className="flex items-center justify-between gap-2 text-label-sm">
          <span className="flex items-center gap-1 font-medium text-on-surface-variant">
            <Icon name="speed" className="text-xs" /> {t.gauge}
          </span>
          <span className={`text-right font-bold tabular-nums ${danger ? 'animate-pulse text-secondary' : inZone ? 'text-crimson' : 'text-primary'}`}>
            {Math.round(pressure)}% [{label}]
          </span>
        </div>
        <div
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pressure)}
          aria-label={t.gauge}
          className="relative h-3 w-full overflow-hidden rounded-full border border-white/80 bg-white/60 p-0.5 shadow-inner"
        >
          <div className="absolute inset-y-0 rounded-full bg-emerald-300/40" style={{ left: `${ZONE_MIN}%`, width: `${ZONE_MAX - ZONE_MIN}%` }} />
          <div
            className="relative h-full rounded-full bg-gradient-to-r from-primary via-primary-container to-crimson transition-[width] duration-75"
            style={{ width: `${pressure}%` }}
          />
        </div>
        <div className="flex justify-between px-1 text-[10px] font-semibold text-on-surface-variant/70">
          <span>{t.scale[0]}</span>
          <span>{t.scale[1]}</span>
          <span className="font-bold text-secondary">{t.scale[2]}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <CtaButton
          className="flex-1 px-6 py-3.5 text-label-lg select-none"
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
        <AirButton className="px-5 py-3 text-label-lg" disabled={phase !== 'ready'} onClick={release}>
          <Icon name="flight_takeoff" className="text-lg" /> {t.release}
        </AirButton>
      </div>
      <p className="mt-3 hidden text-center text-[11px] text-on-surface-variant/80 md:block">{t.keyHint}</p>
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
  const shown = expanded ? sorted : sorted.slice(0, 3)
  const reward = (i: number) => t.voucherPct(i === 0 ? 50 : i === 1 ? 30 : i === 2 ? 20 : 10)
  const medal = ['bg-amber-400 text-white', 'bg-slate-300 text-slate-800', 'bg-amber-600/70 text-white']

  return (
    <section className="rounded-xl border border-white/60 bg-white/30 p-4 shadow-[0_10px_30px_rgba(11,74,130,0.12)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-2 border-b border-surface-container/60 pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pink-100 text-tertiary">
            <Icon name="trophy" fill className="text-lg" />
          </div>
          <div>
            <h2 className="text-[15px] leading-tight font-bold text-primary">{t.lbTitle}</h2>
            <span className="text-[11px] leading-tight text-on-surface-variant">{t.lbSub}</span>
          </div>
        </div>
        <div className="flex shrink-0 rounded-full bg-white/60 p-0.5 text-[11px] font-bold">
          {(['today', 'week'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={`relative rounded-full px-2.5 py-1 whitespace-nowrap ${range === r ? 'text-white' : 'text-primary'}`}
            >
              {range === r && <motion.span layoutId="lb-range" className="absolute inset-0 -z-10 rounded-full bg-primary" />}
              {r === 'today' ? t.today : t.week}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-1 grid grid-cols-[1fr_auto_auto] gap-x-3 px-1 pt-2 text-[10px] font-bold text-on-surface-variant/70 uppercase">
        <span>{t.player}</span>
        <span className="text-right">{t.shares}</span>
        <span className="w-20 text-right">{t.prize}</span>
      </div>
      <motion.ol layout className="mt-1 divide-y divide-white/40">
        <AnimatePresence initial={false}>
          {shown.map((r, i) => (
            <motion.li
              layout
              key={r.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`grid grid-cols-[1fr_auto_auto] items-center gap-x-3 py-2.5 ${r.me ? '-mx-2 rounded-2xl bg-crimson/10 px-2' : ''}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold shadow-sm ${
                    medal[i] ?? 'bg-white/70 text-primary'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-label-md font-bold text-on-surface">
                    {r.name} {r.me && <span className="text-crimson">{t.you}</span>}
                  </div>
                  <div className="text-[11px] text-on-surface-variant">
                    {r.balloon} • {fmtNum(r.meters, lang)} {t.meters}
                  </div>
                </div>
              </div>
              <span className="flex items-center gap-0.5 text-[11px] font-semibold text-on-surface-variant">
                <Icon name="share" className="text-xs" /> {r.shares}
              </span>
              <span className={`w-20 text-right text-label-md ${i === 0 ? 'font-black text-secondary' : 'font-bold text-primary'}`}>{reward(i)}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ol>
      <div className="mt-3 pt-2 text-center">
        <button
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          className="inline-flex items-center gap-1 text-label-sm font-bold text-primary hover:underline"
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
    if (best === 0) setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 900)
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
    'w-full rounded-full border border-outline-variant/60 bg-white/80 py-3 pr-4 pl-11 text-body-md shadow-sm transition-all outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20'

  return (
    <div className="mx-auto max-w-lg space-y-6 px-5 pt-4 pb-4 md:max-w-6xl md:px-8 md:pt-8">
      <section className="relative pt-2 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/30 px-4 py-1.5 text-primary shadow-[0_4px_16px_rgba(11,74,130,0.1)] backdrop-blur-md">
          <Icon name="celebration" fill className="text-sm text-crimson" />
          <span className="text-label-md font-bold tracking-wider uppercase">{t.lounge}</span>
        </div>
        <motion.h1
          key={lang}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-3 text-display-mobile leading-tight tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,68,124,0.35)] md:text-display"
        >
          {t.h1[0]}
          <br />
          <span className="text-primary-fixed drop-shadow-[0_4px_16px_rgba(0,40,80,0.4)]">{t.h1[1]}</span>
        </motion.h1>
        <p className="mx-auto mt-2 max-w-xs text-body-md font-medium text-white/95 drop-shadow-sm md:max-w-md">
          {t.lead[0]} <span className="font-bold">Durex Fetherlite</span>
          {t.lead[1]}
        </p>
        <div className="mx-auto mt-4 grid max-w-xl grid-cols-3 gap-2 px-1">
          {t.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="rounded-xl border border-white/50 bg-white/30 p-2.5 text-center shadow-sm backdrop-blur-lg"
            >
              <div
                className={`mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-xs font-bold shadow-sm ${
                  ['text-primary', 'text-secondary', 'text-tertiary'][i]
                }`}
              >
                {i + 1}
              </div>
              <span className="block text-label-sm font-bold text-white drop-shadow-sm">{s.t}</span>
              <span className="mt-0.5 block text-[10px] leading-3 text-white/90">{s.d}</span>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => openPolicy('rules')}
          className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/25 px-3 py-1 text-label-sm text-white backdrop-blur-md hover:bg-white/40"
        >
          <Icon name="gavel" className="text-sm" /> {t.fullRules}
        </button>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div className="space-y-6">
          <div ref={gameRef}>
            <BalloonGame onFlight={onFlight} />
          </div>

          <Reveal className="flex items-center justify-between gap-3 rounded-xl border border-white/80 bg-gradient-to-r from-primary-fixed/80 via-white/80 to-pink-50/80 p-4 shadow-[0_10px_25px_rgba(11,74,130,0.08)] backdrop-blur-md">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider text-crimson uppercase">
                <Icon name="verified" className="text-xs" /> {t.perkKicker}
              </div>
              <h2 className="text-headline-md leading-tight text-primary">{t.perkTitle}</h2>
              <p className="text-label-sm font-medium text-on-surface-variant">{t.perkBody}</p>
            </div>
            <motion.button
              onClick={() => openBuy()}
              whileHover={{ rotate: 0, scale: 1.08 }}
              aria-label="Sale -20%"
              className="flex h-14 w-14 shrink-0 rotate-6 flex-col items-center justify-center rounded-full bg-crimson text-white shadow-[0_6px_16px_rgba(229,27,36,0.35)]"
            >
              <span className="text-xs font-black uppercase">SALE</span>
              <span className="text-sm leading-none font-extrabold">-20%</span>
            </motion.button>
          </Reveal>

          <section className="grid grid-cols-2 gap-3">
            {[
              { img: '/assets/feel-touch-m.webp', tagC: 'text-primary' },
              { img: '/assets/feel-lube-m.webp', tagC: 'text-secondary' },
            ].map((b, i) => (
              <Reveal
                key={b.img}
                delay={i * 0.1}
                className="group relative col-span-2 flex h-44 flex-col justify-between overflow-hidden rounded-xl border border-white/60 p-4 shadow-[0_10px_25px_rgba(11,74,130,0.1)] sm:col-span-1"
              >
                <img
                  src={b.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <span className={`self-start rounded-full bg-white/60 px-2.5 py-0.5 text-[10px] font-bold backdrop-blur-sm ${b.tagC}`}>
                  {t.bento[i].tag}
                </span>
                <div>
                  <h3 className="text-headline-md font-bold text-white">{t.bento[i].t}</h3>
                  <p className="text-xs font-medium text-white/90">{t.bento[i].d}</p>
                </div>
              </Reveal>
            ))}
          </section>
        </div>

        <div className="space-y-6">
          <section
            ref={formRef}
            className="relative overflow-hidden rounded-xl border border-white/70 bg-white/40 p-5 shadow-[0_14px_35px_rgba(11,74,130,0.14)] backdrop-blur-xl"
          >
            <Burst show={!!claimed} count={26} />
            <AnimatePresence mode="wait">
              {!claimed ? (
                <motion.div key="form" exit={{ opacity: 0, scale: 0.96 }}>
                  <div className="mx-auto mb-4 max-w-sm text-center">
                    <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-fixed text-primary shadow-sm">
                      <Icon name="confirmation_number" fill className="text-2xl" />
                    </div>
                    <h2 className="text-headline-md font-bold text-primary">{t.formTitle}</h2>
                    <p className="mt-0.5 text-sm text-on-surface-variant">{t.formBody}</p>
                    <div
                      className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold ${
                        best > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-white/70 text-on-surface-variant'
                      }`}
                    >
                      <Icon name={best > 0 ? 'lock_open' : 'lock'} className="text-sm" />
                      {best > 0 ? t.unlocked(fmtNum(best, lang)) : t.locked}
                    </div>
                  </div>
                  <form className="space-y-3" onSubmit={submit} noValidate>
                    <div>
                      <label className="mb-1 ml-3 block text-label-sm font-semibold text-on-surface" htmlFor="fullName">
                        {t.name}
                      </label>
                      <div className="relative">
                        <Icon name="person" className="absolute top-1/2 left-4 -translate-y-1/2 text-lg text-outline" />
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
                      <label className="mb-1 ml-3 block text-label-sm font-semibold text-on-surface" htmlFor="contact">
                        {t.contact}
                      </label>
                      <div className="relative">
                        <Icon name="mail" className="absolute top-1/2 left-4 -translate-y-1/2 text-lg text-outline" />
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
                    <label className="flex cursor-pointer items-center gap-2 px-2 pt-1">
                      <input
                        type="checkbox"
                        checked={form.agree}
                        onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                        className="h-4 w-4 accent-crimson"
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
                          className="flex items-center gap-1.5 px-3 text-xs font-semibold text-secondary"
                        >
                          <Icon name="error" className="text-sm" /> {error}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <CtaButton type="submit" className="w-full px-6 py-3.5 text-label-lg">
                      <Icon name="redeem" fill className="text-lg" /> {t.claim}
                    </CtaButton>
                  </form>
                </motion.div>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                  <h2 className="text-headline-md font-bold text-primary">{t.congrats(claimed.name)}</h2>
                  <p className="mt-1 text-sm text-on-surface-variant">{t.sentBody}</p>
                  <motion.div
                    initial={{ rotateX: 90 }}
                    animate={{ rotateX: 0 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="relative mx-auto mt-4 flex max-w-xs items-stretch overflow-hidden rounded-2xl bg-gradient-to-r from-crimson to-[#ff5a5f] text-white shadow-crimson"
                  >
                    <div className="flex-1 p-4 text-left">
                      <p className="text-label-sm text-white/80 uppercase">{t.voucherKicker}</p>
                      <p className="text-[32px] leading-none font-black">-20%</p>
                      <p className="mt-1 font-mono text-sm font-bold tracking-widest">{VOUCHER}</p>
                    </div>
                    <div className="relative w-px border-l-2 border-dashed border-white/50" />
                    <button onClick={copyCode} className="flex w-20 flex-col items-center justify-center gap-1 text-[11px] font-bold hover:bg-white/10">
                      <Icon name="content_copy" /> {t.copy}
                    </button>
                  </motion.div>
                  <div className="mt-4 flex gap-2">
                    <CtaButton className="flex-1 px-4 py-3 text-label-md" onClick={() => openBuy()}>
                      <Icon name="local_mall" fill className="text-lg" /> {t.useNow}
                    </CtaButton>
                    <AirButton className="px-4 py-3 text-label-md" onClick={shareFlight}>
                      <Icon name="share" className="text-lg" /> {t.share}
                    </AirButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mt-3 flex items-center justify-center gap-4 text-[11px] font-medium text-on-surface-variant/80">
              <span className="flex items-center gap-1">
                <Icon name="lock" className="text-xs text-primary" /> {t.privacy}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="bolt" className="text-xs text-primary" /> {t.instant}
              </span>
            </div>
          </section>

          <Reveal>
            <Leaderboard rows={rows} />
          </Reveal>

          <section className="py-2 text-center">
            <div className="rounded-xl border border-white/40 bg-white/20 p-3 backdrop-blur-md">
              <p className="text-xs font-semibold text-primary">
                🎈 {t.community[0]} <strong>{t.community[1]}</strong> {t.community[2]}
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { DurexLogo, Icon } from './ui'
import { useLang, type Lang } from '../i18n'
import { Feather, HeartBalloon, RoundBalloon } from './Balloons'
import type { EduArticle } from '../data/sexEducation'

export const AGE_KEY = 'durex-age-ok'

export function LangSwitchGate() {
  const { lang, setLang } = useLang()
  return (
    <div
      role="radiogroup"
      aria-label="Language switch"
      className="flex items-center rounded-full border border-white/30 bg-white/10 p-1 text-[11px] font-bold tracking-wider shadow-sm backdrop-blur-xl"
    >
      {(['vi', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={lang === l}
          onClick={() => setLang(l)}
          className={`relative z-10 rounded-full px-2.5 py-1 uppercase transition-colors duration-200 ${
            lang === l ? 'text-white' : 'text-white/80 hover:text-white'
          }`}
        >
          {lang === l && (
            <motion.span
              layoutId="gate-lang-thumb"
              className="absolute inset-0 -z-10 rounded-full bg-crimson shadow-sm"
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
            />
          )}
          {l}
        </button>
      ))}
    </div>
  )
}

const CARDS_DATA = [
  {
    id: 'condoms101',
    badge: { vi: 'Durex New Zealand', en: 'Durex New Zealand' },
    icon: 'pan_tool_alt',
    tint: 'from-crimson/20 via-[#ff4d6d]/10 to-transparent border-crimson/30',
    iconColor: 'text-crimson bg-crimson/20',
    title: {
      vi: 'Condoms 101: 4 Bước Dùng Chuẩn Xác',
      en: 'Condoms 101: 4 Golden Steps',
    },
    summary: {
      vi: 'Nắm vững 4 bước vàng: xé nhẹ mép gói bằng tay, bóp núm đuổi không khí, vuốt đều xuống tận gốc và giữ mép rút ra ngay sau xuất tinh để đạt hiệu quả bảo vệ 98%.',
      en: 'Master the 4 golden steps: tear foil gently by hand, pinch tip to release air, roll smoothly to base, and hold rim after ejaculation for 98% protection.',
    },
    sourceUrl: 'https://www.durex.co.nz/explore-sex/condoms-101/',
  },
  {
    id: 'myths',
    badge: { vi: 'Boston University (BU Today)', en: 'Boston University (BU Today)' },
    icon: 'science',
    tint: 'from-[#0070f3]/20 via-[#00c6ff]/10 to-transparent border-[#0070f3]/30',
    iconColor: 'text-[#8cc8ff] bg-[#0070f3]/20',
    title: {
      vi: '5 Lầm Tưởng Về Sức Khỏe Tình Dục',
      en: '5 Sexual Health Myths Debunked',
    },
    summary: {
      vi: 'Bác sĩ giải mã: xuất tinh ngoài vẫn có nguy cơ mang thai và lây STIs, tinh trùng sống tới 5 ngày trong âm đạo, và tuyệt đối không bao giờ đeo cùng lúc 2 bao cao su.',
      en: 'Clinicians debunk myths: withdrawal does not prevent STIs, sperm survives up to 5 days during periods, and double-bagging causes dangerous friction tears.',
    },
    sourceUrl: 'https://www.bu.edu/articles/2024/sexual-health-myths-debunked/',
  },
  {
    id: 'consent',
    badge: { vi: 'Viện Y Tế Hoa Kỳ (PMC / NCBI)', en: 'NIH / PMC / NCBI' },
    icon: 'handshake',
    tint: 'from-[#ffd166]/20 via-[#ffb703]/10 to-transparent border-[#ffd166]/30',
    iconColor: 'text-[#ffd166] bg-[#ffd166]/20',
    title: {
      vi: 'Đồng Thuận (Consent) & Ranh Giới Cá Nhân',
      en: 'Consent & Setting Boundaries',
    },
    summary: {
      vi: 'Đồng thuận phải là sự tự nguyện hào hứng (F.R.I.E.S); im lặng hay không phản kháng không phải là đồng ý, và bạn luôn có toàn quyền từ chối hoặc nói dừng lại bất kỳ lúc nào.',
      en: 'Consent must be affirmative and freely given (F.R.I.E.S); silence is never consent, and you always hold the absolute right to set boundaries and say no.',
    },
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10195043/',
  },
]

export function AgeGate({
  forceOpen,
  onCloseForce,
}: {
  forceOpen?: boolean
  onCloseForce?: () => void
  initialTab?: EduArticle['id']
}) {
  const { lang } = useLang()
  const isVi = lang === 'vi'

  const [state, setState] = useState<'ask' | 'edu' | 'ok'>(() => {
    if (forceOpen) return 'edu'
    try {
      return localStorage.getItem(AGE_KEY) === '1' ? 'ok' : 'ask'
    } catch {
      return 'ask'
    }
  })

  useEffect(() => {
    if (forceOpen) {
      setState('edu')
    }
  }, [forceOpen])

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
    if (onCloseForce) onCloseForce()
  }

  const handleUnder18 = () => {
    setState('edu')
  }

  const handleClose = () => {
    if (forceOpen && onCloseForce) {
      onCloseForce()
    } else {
      accept()
    }
  }

  return (
    <AnimatePresence>
      {state !== 'ok' && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-title"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-3 sm:p-5"
          style={{ background: 'linear-gradient(135deg, #051426 0%, #08294d 50%, #031020 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Ambient Lighting & Floating elements */}
          <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-crimson/25 blur-3xl animate-ambient-breathe" />
          <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#0070f3]/25 blur-3xl" />
          <HeartBalloon color="pink" className="pointer-events-none absolute top-[6%] left-[6%] w-14 animate-floating opacity-40" />
          <HeartBalloon color="blue" className="pointer-events-none absolute top-[14%] right-[8%] w-12 animate-floating opacity-40 [animation-delay:-2s]" />
          <RoundBalloon color="pink" className="pointer-events-none absolute bottom-[6%] left-[5%] w-12 animate-floating opacity-35 [animation-delay:-1s]" />
          <div className="pointer-events-none absolute top-[50%] right-[4%] w-8 opacity-25 animate-feather-sway">
            <Feather />
          </div>

          {/* Lang switch top-right */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-3 sm:top-6 sm:right-6">
            <LangSwitchGate />
            {forceOpen && (
              <button
                onClick={handleClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <Icon name="close" className="text-xl" />
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {state === 'ask' ? (
              /* SCREEN 1: 18+ Verification Prompt */
              <motion.div
                key="ask"
                initial={{ scale: 0.92, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: -20 }}
                transition={{ type: 'spring', damping: 26, stiffness: 260 }}
                className="relative my-auto w-full max-w-lg overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-7 text-center text-white shadow-2xl backdrop-blur-3xl ring-1 ring-white/30 sm:p-9"
              >
                {/* Specular Rim */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                <div className="flex justify-center">
                  <DurexLogo variant="white" size="lg" />
                </div>

                <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-crimson via-[#e51b24] to-[#ff4d6d] text-3xl font-black text-white shadow-glow-red">
                  18+
                </div>

                <h2 id="age-title" className="mt-6 font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
                  {isVi ? 'Xác Nhận Độ Tuổi' : 'Age Verification'}
                </h2>

                <p className="mt-3 text-sm text-white/85 leading-relaxed sm:text-base">
                  {isVi
                    ? 'Chào mừng bạn đến với Durex Vietnam! Trang web này chứa thông tin về sức khỏe giới tính, tình dục an toàn và các dòng sản phẩm dành cho người trưởng thành từ 18 tuổi trở lên.'
                    : 'Welcome to Durex Vietnam! This website contains information about sexual health, safer sex, and products intended for adults aged 18 and older.'}
                </p>

                <div className="mt-8 space-y-3.5">
                  {/* Primary Button: 18+ */}
                  <button
                    onClick={accept}
                    autoFocus
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#ff2a54] via-crimson to-[#b50a12] py-4 text-base font-bold tracking-wide text-white shadow-crimson transition-all duration-300 hover:brightness-110 active:scale-95"
                  >
                    <span>{isVi ? 'Tôi đã đủ 18 tuổi' : 'I am 18 or older (Enter Website)'}</span>
                    <Icon name="arrow_forward" className="text-xl transition-transform group-hover:translate-x-1.5" />
                  </button>

                  {/* Secondary Button: Under 18 */}
                  <button
                    onClick={handleUnder18}
                    className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20 hover:text-white active:scale-95"
                  >
                    <Icon name="school" className="text-lg text-[#ffa6ca]" />
                    <span>{isVi ? 'Tôi chưa đủ 18 tuổi' : 'I am under 18'}</span>
                  </button>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4 text-[11px] text-white/50">
                  {isVi
                    ? 'Durex cam kết giáo dục giới tính an toàn, bảo mật thông tin và tôn trọng người dùng.'
                    : 'Durex is committed to comprehensive sex education, privacy and respect.'}
                </div>
              </motion.div>
            ) : (
              /* SCREEN 2: 3 Small Cards for Sex Education & Condom Guide */
              <motion.div
                key="edu"
                initial={{ scale: 0.94, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="relative my-auto w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/20 bg-[#07192f]/90 text-white shadow-2xl backdrop-blur-3xl ring-1 ring-white/30 flex flex-col"
              >
                {/* Specular Rim */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

                {/* Modal Header */}
                <div className="border-b border-white/10 bg-white/5 px-6 py-5 sm:px-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <DurexLogo variant="white" size="sm" />
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff4d6d]/40 bg-crimson/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#ff99ac]">
                        <Icon name="verified" className="text-xs text-crimson" />
                        {isVi ? 'Giáo Dục Giới Tính & Condoms 101' : 'Sex Education & Condoms 101'}
                      </span>
                    </div>

                    {!forceOpen && (
                      <button
                        onClick={() => setState('ask')}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 transition-colors hover:text-white"
                      >
                        <Icon name="arrow_back" className="text-sm" />
                        {isVi ? 'Quay lại chọn tuổi' : 'Back to age choice'}
                      </button>
                    )}
                  </div>

                  <div className="mt-3">
                    <h2 className="font-display text-xl font-black text-white sm:text-2xl">
                      {isVi
                        ? 'Cẩm Nang An Toàn Tình Dục & Hướng Dẫn Sử Dụng Condom'
                        : 'Youth Sexual Health Guide & Condom Masterclass'}
                    </h2>
                    <p className="mt-1 text-xs text-white/80 sm:text-sm leading-relaxed max-w-2xl">
                      {isVi
                        ? 'Dù bạn chưa đủ 18 tuổi, việc trang bị kiến thức khoa học về giới tính, sức khỏe sinh sản, sự đồng thuận và cách dùng bao cao su chuẩn xác là điều vô cùng quan trọng để tự bảo vệ chính mình.'
                        : 'Regardless of age, mastering accurate sexual health knowledge, consent, and correct condom usage is essential for protecting yourself and your future.'}
                    </p>
                  </div>
                </div>

                {/* Modal Body: 3 Small Cards Grid */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {CARDS_DATA.map((card) => (
                      <div
                        key={card.id}
                        className={`group flex flex-col justify-between rounded-2xl border ${card.tint} bg-white/5 p-5 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-xl`}
                      >
                        <div>
                          {/* Card Icon & Source Badge */}
                          <div className="flex items-center justify-between gap-2">
                            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconColor} shadow-sm`}>
                              <Icon name={card.icon} className="text-lg" />
                            </span>
                            <span className="text-[11px] font-semibold text-white/60 truncate">
                              {card.badge[lang]}
                            </span>
                          </div>

                          {/* Card Title */}
                          <h3 className="mt-3.5 font-display text-sm font-bold text-white group-hover:text-[#ff99ac] transition-colors leading-snug sm:text-base">
                            {card.title[lang]}
                          </h3>

                          {/* 1-2 sentence Summary */}
                          <p className="mt-2 text-xs text-white/75 leading-relaxed">
                            {card.summary[lang]}
                          </p>
                        </div>

                        {/* Link to Source Article */}
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                          <a
                            href={card.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8cc8ff] transition-colors hover:text-white hover:underline"
                          >
                            <span>{isVi ? 'Đọc bài báo gốc' : 'Read original article'}</span>
                            <Icon name="open_in_new" className="text-xs" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer: Centered Red Button Only */}
                <div className="border-t border-white/10 bg-white/5 px-6 py-4.5 sm:px-8 flex items-center justify-center">
                  <button
                    onClick={accept}
                    className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#ff2a54] via-crimson to-[#b50a12] px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-crimson transition-all duration-300 hover:brightness-110 active:scale-95"
                  >
                    <span>{isVi ? 'Tôi đã nắm rõ kiến thức · Vào Website' : 'I understand · Enter Website'}</span>
                    <Icon name="arrow_forward" className="text-base transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

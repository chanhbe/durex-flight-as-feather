import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { DurexLogo, Icon } from './ui'
import { useLang, type Lang } from '../i18n'
import { Feather, HeartBalloon, RoundBalloon } from './Balloons'
import {
  EDU_ARTICLES,
  MYTHS_DATA,
  CONSENT_FRIES,
  CONDOM_STEPS,
  type EduArticle,
} from '../data/sexEducation'

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

export function AgeGate({
  forceOpen,
  onCloseForce,
  initialTab = 'condoms101',
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

  const [activeTab, setActiveTab] = useState<EduArticle['id']>(initialTab)

  useEffect(() => {
    if (forceOpen) {
      setState('edu')
      if (initialTab) setActiveTab(initialTab)
    }
  }, [forceOpen, initialTab])

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
                  {isVi ? 'Xác Nhận Độ Tuổi Của Bạn' : 'Age Verification'}
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
                    <span>{isVi ? 'Tôi đã đủ 18 tuổi (Vào Website)' : 'I am 18 or older (Enter Website)'}</span>
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
              /* SCREEN 2: Comprehensive Sex Education & Condom Guide */
              <motion.div
                key="edu"
                initial={{ scale: 0.94, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -20 }}
                transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                className="relative my-6 max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/20 bg-[#07192f]/85 text-white shadow-2xl backdrop-blur-3xl ring-1 ring-white/30 flex flex-col"
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
                    <p className="mt-1 text-xs text-white/80 sm:text-sm leading-relaxed">
                      {isVi
                        ? 'Dù bạn chưa đủ 18 tuổi, việc trang bị kiến thức khoa học về giới tính, sức khỏe sinh sản, sự đồng thuận và cách dùng bao cao su chuẩn xác là điều vô cùng quan trọng để tự bảo vệ chính mình.'
                        : 'Regardless of age, mastering accurate sexual health knowledge, consent, and correct condom usage is essential for protecting yourself and your future.'}
                    </p>
                  </div>

                  {/* 3 Interactive Topic Tabs */}
                  <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
                    {(Object.keys(EDU_ARTICLES) as EduArticle['id'][]).map((tabKey) => {
                      const item = EDU_ARTICLES[tabKey]
                      const isActive = activeTab === tabKey
                      const iconName =
                        tabKey === 'condoms101'
                          ? 'pan_tool_alt'
                          : tabKey === 'myths'
                          ? 'science'
                          : 'handshake'

                      return (
                        <button
                          key={tabKey}
                          onClick={() => setActiveTab(tabKey)}
                          className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                            isActive
                              ? 'bg-gradient-to-r from-crimson to-[#e51b24] text-white shadow-crimson'
                              : 'border border-white/10 bg-white/10 text-white/75 hover:bg-white/15 hover:text-white'
                          }`}
                        >
                          <Icon name={iconName} className="text-base" />
                          <span>{item.badge[lang]}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Modal Body: Scrollable Article Content */}
                <div className="overflow-y-auto px-6 py-6 sm:px-8 space-y-6">
                  {/* Active Article Intro Banner */}
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
                      <span className="font-semibold text-[#8cc8ff]">
                        {EDU_ARTICLES[activeTab].sourceOrg}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="schedule" className="text-sm" />
                        {EDU_ARTICLES[activeTab].readTime[lang]}
                      </span>
                    </div>

                    <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                      {EDU_ARTICLES[activeTab].title[lang]}
                    </h3>
                    <p className="mt-1 text-sm text-white/80 leading-relaxed">
                      {EDU_ARTICLES[activeTab].subtitle[lang]}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-xs">
                      <span className="text-white/65">
                        {isVi ? 'Nguồn tài liệu chính thức:' : 'Official Reference:'}
                      </span>
                      <a
                        href={EDU_ARTICLES[activeTab].sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-[#8cc8ff] transition-colors hover:text-white hover:underline"
                      >
                        <span>{isVi ? 'Đọc bài báo gốc' : 'Read original article'}</span>
                        <Icon name="open_in_new" className="text-xs" />
                      </a>
                    </div>
                  </div>

                  {/* TAB 1: BOSTON UNIVERSITY - MYTHS DEBUNKED */}
                  {activeTab === 'myths' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#ffb4ac]">
                        <Icon name="verified_user" />
                        <span>{isVi ? 'Bác sĩ & Chuyên gia giải mã 5 lầm tưởng tai hại' : '5 Persistent Myths Debunked by Clinicians'}</span>
                      </div>

                      <div className="grid gap-3.5">
                        {MYTHS_DATA.map((item, idx) => (
                          <div
                            key={item.id}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20"
                          >
                            <div className="flex items-start gap-3">
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crimson/20 text-sm font-bold text-crimson">
                                #{idx + 1}
                              </span>
                              <div className="flex-1">
                                <h4 className="text-sm font-bold text-[#ff8097] sm:text-base">
                                  {item.myth[lang]}
                                </h4>
                                <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#72f59e] sm:text-sm">
                                  <Icon name="check_circle" className="text-base" />
                                  <span>{item.fact[lang]}</span>
                                </div>
                                <p className="mt-2 text-xs text-white/75 leading-relaxed sm:text-sm">
                                  {item.detail[lang]}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl border border-white/10 bg-[#0070f3]/10 p-4 text-xs text-white/80 leading-relaxed sm:text-sm">
                        <strong className="text-white">
                          {isVi ? 'Lời khuyên từ Boston University Student Health:' : 'Advice from Boston University Health:'}
                        </strong>{' '}
                        {isVi
                          ? 'Khi có bất kỳ băn khoăn nào về sức khỏe sinh sản, hãy luôn tìm đến các nguồn y khoa chính thống hoặc bác sĩ uy tín thay vì tin vào các lời đồn truyền miệng chưa được kiểm chứng.'
                          : 'When in doubt, always seek reputable medical sources or clinical providers rather than relying on unverified myths.'}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: PMC / NCBI - CONSENT & BOUNDARIES */}
                  {activeTab === 'consent' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#a1c9ff]">
                        <Icon name="handshake" />
                        <span>{isVi ? 'Quy tắc vàng F.R.I.E.S về Sự Đồng Thuận Tình Dục' : 'The F.R.I.E.S Framework for Affirmative Consent'}</span>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {CONSENT_FRIES.map((fries) => (
                          <div
                            key={fries.letter}
                            className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10"
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0070f3]/25 font-display text-lg font-black text-[#8cc8ff]">
                                {fries.letter}
                              </span>
                              <div>
                                <h4 className="text-sm font-bold text-white">{fries.title[lang]}</h4>
                                <p className="text-[11px] text-white/50">{fries.word[lang]}</p>
                              </div>
                            </div>
                            <p className="mt-2.5 text-xs text-white/75 leading-relaxed">
                              {fries.desc[lang]}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Important Insight from PMC Study */}
                      <div className="rounded-2xl border border-crimson/30 bg-crimson/10 p-4 text-xs sm:text-sm text-white/85 leading-relaxed space-y-2">
                        <div className="flex items-center gap-2 font-bold text-[#ffa6ca]">
                          <Icon name="warning" />
                          <span>{isVi ? 'Bài học then chốt từ nghiên cứu y khoa NIH (PMC10195043):' : 'Key Findings from NIH PMC10195043 Study:'}</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1.5 text-white/80">
                          <li>
                            <strong>{isVi ? 'Im lặng KHÔNG phải là đồng ý:' : 'Silence is NOT consent:'}</strong>{' '}
                            {isVi
                              ? 'Nhiều bạn trẻ ngần ngại nói thẳng. Sự bất động, không phản kháng hoặc thở dài không bao giờ được coi là đồng ý. Cần có lời nói "Có" rõ ràng.'
                              : 'Passivity, lack of resistance, or hesitation does not mean consent. Only an explicit affirmative yes counts.'}
                          </li>
                          <li>
                            <strong>{isVi ? 'Chất kích thích và rượu bia:' : 'Alcohol and Intoxication:'}</strong>{' '}
                            {isVi
                              ? 'Người say xỉn hoặc mất kiểm soát theo luật pháp và y tế đều KHÔNG CÓ năng lực đưa ra sự đồng thuận hợp pháp.'
                              : 'An intoxicated or incapacitated person legally cannot provide valid sexual consent.'}
                          </li>
                          <li>
                            <strong>{isVi ? 'Quyền từ chối (Refusal Skills):' : 'The Power to Say No:'}</strong>{' '}
                            {isVi
                              ? 'Bạn luôn có quyền đặt ranh giới cơ thể mà không sợ mất lòng đối phương. Người thực sự yêu thương bạn sẽ luôn trân trọng quyết định của bạn.'
                              : 'Setting boundaries protects your self-worth. A loving partner will always honor and respect your boundaries.'}
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: DUREX 101 - HOW TO USE CONDOMS */}
                  {activeTab === 'condoms101' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#72f59e]">
                        <Icon name="verified" />
                        <span>{isVi ? '4 Bước Vàng Đeo Bao Cao Su Chuẩn Durex (Bảo vệ 98%)' : 'The 4-Step Golden Rule to Wearing a Condom (98% Effective)'}</span>
                      </div>

                      <div className="grid gap-3.5 sm:grid-cols-2">
                        {CONDOM_STEPS.map((step) => (
                          <div
                            key={step.step}
                            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20"
                          >
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crimson font-display text-sm font-bold text-white shadow-sm">
                                  {step.step}
                                </span>
                                <h4 className="text-sm font-bold text-white">
                                  {step.title[lang]}
                                </h4>
                              </div>
                              <p className="mt-2.5 text-xs text-white/75 leading-relaxed sm:text-sm">
                                {step.desc[lang]}
                              </p>
                            </div>

                            {step.warning && (
                              <div className="mt-3 rounded-lg border border-[#ffa6ca]/20 bg-[#ffa6ca]/10 p-2 text-[11px] text-[#ffa6ca]">
                                ⚠️ <strong>{isVi ? 'Chú ý:' : 'Note:'}</strong> {step.warning[lang]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Golden Tips from Durex NZ */}
                      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-white/10 p-4 text-xs sm:text-sm space-y-2">
                        <h4 className="font-bold text-[#8cc8ff] flex items-center gap-2">
                          <Icon name="lightbulb" />
                          <span>{isVi ? 'Hai nguyên tắc vàng bổ sung từ Durex New Zealand:' : 'Two Golden Rules from Durex NZ:'}</span>
                        </h4>
                        <div className="grid gap-2 sm:grid-cols-2 text-white/80">
                          <div className="rounded-xl bg-white/5 p-3">
                            <strong className="text-white">
                              {isVi ? '1. Chọn Gel Bôi Trơn Phù Hợp:' : '1. Choose the Right Lube:'}
                            </strong>
                            <p className="mt-1">
                              {isVi
                                ? 'Chỉ dùng gel gốc nước (water-based) hoặc gel gốc silicone. Tuyệt đối KHÔNG dùng dầu ăn, sáp Vaseline, baby oil hoặc kem dưỡng da vì dầu làm mủn cao su latex chỉ sau 60 giây.'
                                : 'Only use water-based or silicone lubes. NEVER use cooking oil, Vaseline, or body lotions, as fats degrade latex in under 60 seconds.'}
                            </p>
                          </div>
                          <div className="rounded-xl bg-white/5 p-3">
                            <strong className="text-white">
                              {isVi ? '2. Chọn Đúng Kích Cỡ (Size):' : '2. Right Size Matters:'}
                            </strong>
                            <p className="mt-1">
                              {isVi
                                ? 'Bao quá chật dễ gây rách, bao quá rộng dễ bị tuột. Chọn kích thước vừa vặn (52.5mm cho size tiêu chuẩn châu Á) để có độ ôm khít tự nhiên và an tâm nhất.'
                                : 'A condom too tight can burst; one too loose can slip. Pick the snug fit that ensures natural comfort and full security.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer: Action and THE REQUIRED SMALL TEXT LINE */}
                <div className="border-t border-white/10 bg-white/5 px-6 py-4 sm:px-8">
                  <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                    {/* Button to confirm 18+ */}
                    <button
                      onClick={accept}
                      className="inline-flex items-center gap-2 rounded-full bg-crimson px-5 py-2.5 text-xs font-bold text-white shadow-crimson transition-all hover:brightness-110 active:scale-95"
                    >
                      <Icon name="check" className="text-base" />
                      <span>{isVi ? 'Tôi đã nắm rõ kiến thức · Vào Website' : 'I understand · Enter Website'}</span>
                    </button>

                    {/* THE EXACT REQUIRED FEATURE: "1 dòng nhỏ là click để tiếp tục vào website" */}
                    <p className="text-[12px] text-white/60">
                      {isVi ? (
                        <span>
                          Bạn muốn tiếp tục?{' '}
                          <button
                            onClick={accept}
                            className="font-semibold text-[#8cc8ff] underline decoration-[#8cc8ff]/50 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
                          >
                            click để tiếp tục vào website
                          </button>
                        </span>
                      ) : (
                        <span>
                          Want to explore?{' '}
                          <button
                            onClick={accept}
                            className="font-semibold text-[#8cc8ff] underline decoration-[#8cc8ff]/50 underline-offset-2 transition-colors hover:text-white hover:decoration-white"
                          >
                            click here to continue to the website
                          </button>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

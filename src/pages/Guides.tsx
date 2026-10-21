import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { CtaButton, DurexLogo, Icon, Reveal, Sheet } from '../components/ui'
import { useApp } from '../components/AppProvider'
import { ARTICLES, CATEGORIES, QUIZ, productById, type Article, type Category, type ProductId } from '../data/content'
import { fmtNum, useLang, useT, useTitle, type Lang } from '../i18n'

const T = {
  vi: {
    title: 'Cẩm Nang',
    kicker: 'Cẩm Nang Thấu Cảm · The Confidence Corner',
    h1: 'Góc Tự Tin Cất Cánh',
    lead: 'Không gian cởi mở về cảm xúc, kỹ năng yêu tinh tế và sự kết nối an toàn tuyệt đối.',
    filter: 'Lọc theo chủ đề',
    minRead: (n: number) => `${n} phút đọc`,
    featured: 'Nổi Bật',
    today: 'Hôm nay',
    takeaway: 'Điểm chính',
    read: 'Đọc Bài Viết',
    readMore: 'Đọc tiếp',
    share: 'Chia sẻ',
    sendPartner: 'Gửi Cho Đối Tác',
    empathy: 'người đồng cảm',
    quote: '“Sự tự tin khi chủ động chuẩn bị bao cao su không làm giảm cảm xúc; ngược lại, nó thể hiện sự tôn trọng tuyệt đối và bản lĩnh quyến rũ của người trưởng thành.”',
    quoteBy: '— Chuyên gia Tâm lý & Sức khỏe Tình dục Durex Care',
    tips: [
      { h: 'Quy tắc Đèn Giao Thông', p: 'Quy ước tín hiệu đỏ - vàng - xanh để kiểm soát nhịp điệu thăng hoa.' },
      { h: 'Lắng Nghe Ánh Mắt', p: '90% phản hồi đến từ ngôn ngữ cơ thể và từng nhịp thở sâu.' },
    ],
    quizKicker: 'Trắc Nghiệm 60 Giây',
    quizTitle: 'Tìm Dòng Bao Chuẩn Gu Của Bạn',
    quizBody: 'Khám phá độ mỏng, độ ôm khít và cảm giác lý tưởng nhất cho cảm xúc thăng hoa.',
    quizStart: 'Bắt Đầu Ngay',
    question: (i: number, n: number) => `Câu hỏi ${i}/${n}`,
    result: 'Dòng bao chuẩn gu của bạn',
    retry: 'Làm lại',
    buy: 'Mua ngay',
  },
  en: {
    title: 'Guides',
    kicker: 'Empathy Guides · The Confidence Corner',
    h1: 'The Confidence Corner',
    lead: 'An open, discreet space to talk about feelings, intimate techniques and safe connection.',
    filter: 'Filter by topic',
    minRead: (n: number) => `${n} min read`,
    featured: 'Featured',
    today: 'Today',
    takeaway: 'Key Takeaway',
    read: 'Read Article',
    readMore: 'Read more',
    share: 'Share',
    sendPartner: 'Send to Partner',
    empathy: 'people relate',
    quote: '“Being confident about having a condom ready doesn’t kill the mood – it shows complete respect, care and irresistible maturity.”',
    quoteBy: '— Durex Care Sexual Health & Psychology Expert',
    tips: [
      { h: 'The Traffic-Light Rule', p: 'Agree on red – yellow – green signals to keep the rhythm smooth.' },
      { h: 'Read the Eyes', p: '90% of feedback comes from body language and breathing.' },
    ],
    quizKicker: '60-Second Quiz',
    quizTitle: 'Find Your Perfect Match',
    quizBody: 'Discover the exact thinness, texture and fit that suit your intimacy style best.',
    quizStart: 'Start Quiz Now',
    question: (i: number, n: number) => `Question ${i}/${n}`,
    result: 'Your Perfect Match',
    retry: 'Try again',
    buy: 'Buy now',
  },
}

const CAT_STYLE: Record<Exclude<Category, 'all'>, string> = {
  pleasure: 'bg-primary-fixed/80 text-primary border border-primary/20',
  consent: 'bg-secondary-fixed/80 text-on-secondary-fixed-variant border border-crimson/20',
  wellness: 'bg-tertiary-fixed/80 text-on-tertiary-fixed-variant border border-tertiary/20',
}

const catLabel = (c: Category, lang: Lang) => CATEGORIES.find((x) => x.id === c)?.label[lang] ?? ''
const articleUrl = (a: Article) => `https://durex.vn/nhe-nhu-bay/cam-nang/${a.id}`

function compact(n: number, lang: Lang) {
  if (n < 1000) return fmtNum(n, lang)
  const k = (n / 1000).toFixed(1)
  return `${lang === 'vi' ? k.replace('.', ',') : k}k`
}

function LikeButton({ base }: { base: number }) {
  const t = useT(T)
  const { lang } = useLang()
  const [liked, setLiked] = useState(false)
  const count = base + (liked ? 1 : 0)

  return (
    <button
      onClick={() => setLiked((l) => !l)}
      className="group flex items-center gap-2 transition-transform active:scale-95"
      aria-pressed={liked}
    >
      <motion.span
        key={String(liked)}
        initial={{ scale: liked ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 14 }}
        className={`flex h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors duration-300 ${
          liked
            ? 'bg-gradient-to-tr from-crimson to-[#ff2a54] text-white shadow-glow-red'
            : 'border border-primary/20 bg-white/80 text-primary group-hover:border-crimson group-hover:text-crimson'
        }`}
      >
        <Icon name="favorite" fill={liked} className="text-base" />
      </motion.span>
      <span className="text-[12px] font-bold text-on-surface-variant group-hover:text-primary transition-colors">
        {compact(count, lang)} {t.empathy}
      </span>
    </button>
  )
}

function FeaturedCard({ a, onRead }: { a: Article; onRead: () => void }) {
  const t = useT(T)
  const { lang } = useLang()
  const { openShare } = useApp()
  const x = a.text[lang]

  return (
    <article className="group relative overflow-hidden rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-luxury ring-1 ring-white/90 backdrop-blur-2xl transition-all duration-500 hover:bg-white/90 hover:shadow-2xl md:grid md:grid-cols-2 md:gap-8 md:p-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <button
        onClick={onRead}
        aria-label={x.title}
        className="group/img relative mb-5 block h-60 w-full overflow-hidden rounded-[24px] bg-[#dbebf9] md:mb-0 md:h-full md:min-h-84"
      >
        <img
          src={a.img}
          alt=""
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />

        <span className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-white/40 bg-[#06192d]/60 px-3.5 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-md">
          <Icon name="schedule" className="text-xs" /> {t.minRead(a.minutes)}
        </span>

        <span className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-crimson to-[#ff2a54] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-crimson">
          <Icon name="star" fill className="text-xs" /> {t.featured}
        </span>
      </button>

      <div className="flex flex-col justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide ${CAT_STYLE[a.category]}`}>
              {catLabel(a.category, lang)}
            </span>
            <span className="text-xs text-outline-variant">•</span>
            <span className="text-[12px] font-semibold text-on-surface-variant/70">{t.today}</span>
          </div>

          <h2 className="font-display text-[26px] font-black tracking-tight text-primary md:text-[32px] md:leading-[1.18] group-hover:text-crimson transition-colors duration-300">
            {x.title}
          </h2>

          <p className="mt-2.5 text-body-md font-medium text-on-surface-variant leading-relaxed">
            {x.excerpt}
          </p>

          <div className="mt-4 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary-fixed/40 via-white/60 to-white/80 p-4 shadow-sm backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm">
                <Icon name="tips_and_updates" className="text-base" />
              </div>
              <div>
                <span className="block text-[11px] font-extrabold tracking-wider text-primary uppercase">
                  {t.takeaway}
                </span>
                <p className="mt-0.5 text-[12.5px] font-medium leading-relaxed text-on-surface">
                  {x.takeaway}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-surface-container/60 pt-4">
          <CtaButton shimmer={false} className="px-6 py-3 text-label-md" onClick={onRead}>
            <span>{t.read}</span>
            <Icon name="arrow_forward" className="text-base" />
          </CtaButton>

          <button
            aria-label={t.share}
            onClick={() => openShare({ title: x.title, url: articleUrl(a) })}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/80 bg-white/80 text-primary shadow-cloud-sm backdrop-blur-xl transition-all duration-300 hover:border-crimson/40 hover:bg-white hover:text-crimson active:scale-90"
          >
            <Icon name="share" className="text-lg transition-transform group-hover:scale-110" />
          </button>
        </div>
      </div>
    </article>
  )
}

function ArticleCard({ a, onRead }: { a: Article; onRead: () => void }) {
  const t = useT(T)
  const { lang } = useLang()
  const { openShare } = useApp()
  const x = a.text[lang]

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white/75 shadow-cloud backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/90 hover:shadow-luxury">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      <button onClick={onRead} aria-label={x.title} className="group/img relative h-48 overflow-hidden bg-[#dbebf9]">
        <img
          src={a.img}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-106"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06192d]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className={`rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider ${CAT_STYLE[a.category]}`}>
            {catLabel(a.category, lang)}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-on-surface-variant/70">
            <Icon name="schedule" className="text-xs" /> {t.minRead(a.minutes)}
          </span>
        </div>

        <h3 className="font-display text-[17px] font-bold tracking-tight text-primary group-hover:text-crimson transition-colors duration-300 leading-snug">
          {x.title}
        </h3>

        <p className="mt-2 text-[13px] leading-relaxed text-on-surface-variant font-medium">
          {x.excerpt}
        </p>

        {a.id === 'mo-loi-dung-bao' && (
          <blockquote className="my-3.5 rounded-2xl border-l-4 border-crimson bg-gradient-to-r from-secondary-fixed/40 to-white/70 p-3.5 shadow-sm">
            <p className="text-[12px] text-on-surface-variant italic leading-relaxed">{t.quote}</p>
            <cite className="mt-1.5 block font-display text-[11px] font-bold text-primary not-italic">{t.quoteBy}</cite>
          </blockquote>
        )}

        {a.id === 'consent-chia-khoa' && (
          <div className="my-3.5 grid grid-cols-2 gap-2.5">
            {t.tips.map((tip, i) => (
              <div key={tip.h} className="rounded-2xl border border-white/80 bg-white/70 p-3 shadow-sm">
                <Icon
                  name={i === 0 ? 'verified' : 'favorite'}
                  className={`mb-1 text-base ${i === 0 ? 'text-primary' : 'text-crimson'}`}
                />
                <h4 className="font-display text-[11.5px] font-bold text-primary">{tip.h}</h4>
                <p className="mt-0.5 text-[10.5px] leading-tight text-on-surface-variant font-medium">{tip.p}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-surface-container/60 pt-3.5">
          <LikeButton base={a.likes} />

          <div className="flex items-center gap-2">
            <button
              onClick={onRead}
              className="group/btn inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:text-crimson transition-colors"
            >
              <span>{t.readMore}</span>
              <Icon name="arrow_forward" className="text-sm transition-transform duration-200 group-hover/btn:translate-x-1" />
            </button>

            <button
              aria-label={t.share}
              onClick={() => openShare({ title: x.title, url: articleUrl(a) })}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/80 bg-white/80 text-primary shadow-sm transition-all hover:bg-white hover:text-crimson active:scale-90"
            >
              <Icon name="share" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function Quiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT(T)
  const { lang } = useLang()
  const { openBuy } = useApp()
  const questions = QUIZ[lang]
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<ProductId[]>([])
  const done = step >= questions.length

  const result = useMemo(() => {
    const tally: Partial<Record<ProductId, number>> = {}
    answers.forEach((a) => (tally[a] = (tally[a] ?? 0) + 1))
    const top = (Object.entries(tally) as [ProductId, number][]).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'fetherlite'
    return productById(top)
  }, [answers])

  const pick = (score: ProductId) => {
    setAnswers((a) => [...a, score])
    setStep((s) => s + 1)
  }
  const reset = () => {
    setStep(0)
    setAnswers([])
  }
  const close = () => {
    onClose()
    setTimeout(reset, 300)
  }

  return (
    <Sheet open={open} onClose={close} title={t.quizTitle} subtitle={t.quizKicker}>
      <div className="mb-5 flex gap-2">
        {questions.map((_, i) => (
          <div key={i} className="h-2 flex-1 overflow-hidden rounded-full bg-surface-container">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-crimson shadow-sm"
              animate={{ width: i < step ? '100%' : '0%' }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary">
              <Icon name="help_outline" className="text-xs" /> {t.question(step + 1, questions.length)}
            </span>
            <h4 className="mt-3 mb-5 font-display text-headline-md font-bold text-primary">
              {questions[step].q}
            </h4>

            <div className="space-y-3">
              {questions[step].options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => pick(o.score)}
                  className="group flex w-full items-center justify-between rounded-2xl border border-white/80 bg-white/70 p-4 text-left text-sm font-bold text-primary shadow-cloud-sm transition-all duration-300 hover:border-primary/40 hover:bg-white hover:shadow-md active:scale-[0.98]"
                >
                  <span>{o.label}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform group-hover:bg-crimson group-hover:text-white group-hover:translate-x-1">
                    <Icon name="arrow_forward" className="text-sm" />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson/25 bg-crimson/10 px-4 py-1 text-[11px] font-black uppercase tracking-widest text-crimson">
              <Icon name="celebration" className="text-xs" /> {t.result}
            </span>

            <div className="relative my-4">
              <div className="absolute inset-0 m-auto h-40 w-40 rounded-full bg-gradient-to-tr from-[#ffa6ca]/30 to-[#a1c9ff]/30 blur-2xl" />
              <img
                src={result.img}
                alt={`Durex ${result.name}`}
                className="relative mx-auto h-44 animate-floating object-contain drop-shadow-[0_20px_25px_rgba(0,40,90,0.3)]"
              />
            </div>

            <h4 className="font-display text-[26px] font-black text-primary">
              Durex {result.name}
            </h4>
            <p className="mt-1 mb-6 text-sm text-on-surface-variant font-medium">{result.tagline[lang]}</p>

            <div className="flex gap-3">
              <button
                onClick={reset}
                className="flex-1 rounded-full border border-white/80 bg-white/80 py-3.5 text-label-md font-bold text-primary shadow-sm hover:bg-white active:scale-95"
              >
                {t.retry}
              </button>
              <CtaButton
                className="flex-1 py-3.5 text-label-md shadow-crimson"
                onClick={() => {
                  close()
                  openBuy({ product: result.id })
                }}
              >
                {t.buy}
              </CtaButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Sheet>
  )
}

export function Guides() {
  const t = useT(T)
  const { lang } = useLang()
  useTitle(t.title)
  const { openShare } = useApp()
  const [cat, setCat] = useState<Category>('all')
  const [reading, setReading] = useState<Article | null>(null)
  const [quiz, setQuiz] = useState(false)
  const list = cat === 'all' ? ARTICLES : ARTICLES.filter((a) => a.category === cat)
  const [featured, ...rest] = list
  const r = reading?.text[lang]

  return (
    <div className="mx-auto max-w-lg space-y-8 px-5 pt-4 pb-8 md:max-w-6xl md:space-y-10 md:px-8 md:pt-8">
      {/* Editorial Header */}
      <section className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-1.5 shadow-cloud-sm backdrop-blur-xl">
          <DurexLogo variant="blue" size="sm" />
          <span className="text-on-surface-variant/40">/</span>
          <span className="text-[11px] font-extrabold tracking-wider text-primary uppercase">{t.kicker}</span>
        </div>

        <h1 className="mt-4 font-display text-headline-lg-mobile font-black tracking-tight text-white uppercase drop-shadow-[0_4px_16px_rgba(0,35,75,0.35)] md:text-[54px] md:leading-[1.05]">
          {t.h1}
        </h1>

        <p className="mt-2.5 max-w-md text-body-md font-medium text-white/95 drop-shadow-[0_2px_8px_rgba(0,35,75,0.3)] md:text-body-lg">
          {t.lead}
        </p>
      </section>

      {/* Category Filter Pills Bar */}
      <LayoutGroup>
        <section aria-label={t.filter} className="flex justify-center">
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto rounded-full border border-white/80 bg-white/60 p-1.5 shadow-cloud-sm backdrop-blur-2xl px-3 md:mx-0">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`relative shrink-0 rounded-full px-4 py-2 text-[13px] font-bold tracking-tight whitespace-nowrap transition-all duration-300 active:scale-95 ${
                  cat === c.id ? 'text-white' : 'text-primary/90 hover:text-primary hover:bg-white/60'
                }`}
              >
                {cat === c.id && (
                  <motion.span
                    layoutId="cat-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary via-[#006aff] to-primary shadow-sm"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                {c.label[lang]}
              </button>
            ))}
          </div>
        </section>

        {/* Article Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {featured && (
              <div className="mb-6 md:mb-8">
                <FeaturedCard a={featured} onRead={() => setReading(featured)} />
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {rest.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ArticleCard a={a} onRead={() => setReading(a)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      {/* 60-Second Quiz Chamber */}
      <Reveal className="relative overflow-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-[#06192d] via-primary to-[#002e6b] p-7 text-white shadow-luxury ring-1 ring-white/30 md:p-12">
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#ff2a54]/25 blur-3xl animate-ambient-breathe" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#006aff]/30 blur-3xl" />

        <div className="relative z-10 max-w-md">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-white backdrop-blur-md">
            <Icon name="psychology" className="text-sm text-crimson" /> {t.quizKicker}
          </span>
          <h2 className="mt-3 font-display text-headline-lg-mobile font-black tracking-tight text-white md:text-[34px]">
            {t.quizTitle}
          </h2>
          <p className="mt-2 mb-6 text-sm text-white/85 leading-relaxed font-medium">
            {t.quizBody}
          </p>

          <button
            onClick={() => setQuiz(true)}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-display text-label-lg font-bold text-primary shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#f0f8ff] active:scale-95"
          >
            <span>{t.quizStart}</span>
            <Icon name="arrow_forward" className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <img
          src="/assets/p-pleasuremax.webp"
          alt=""
          loading="lazy"
          className="pointer-events-none absolute -right-2 -bottom-6 w-36 rotate-12 opacity-95 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] md:right-12 md:w-52"
        />
        <img
          src="/assets/p-fetherlite.webp"
          alt=""
          loading="lazy"
          className="pointer-events-none absolute right-24 -bottom-10 w-32 -rotate-6 opacity-95 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] md:right-52 md:w-48"
        />
      </Reveal>

      {/* Reading Article Modal Sheet */}
      <Sheet open={!!reading} onClose={() => setReading(null)} title={r?.title} wide>
        {reading && r && (
          <article className="space-y-5">
            <div className="h-56 overflow-hidden rounded-[24px] md:h-80">
              <img src={reading.img} alt="" className="h-full w-full object-cover" />
            </div>

            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider ${CAT_STYLE[reading.category]}`}>
                {catLabel(reading.category, lang)}
              </span>
              <span className="text-[12px] font-semibold text-on-surface-variant">
                {t.minRead(reading.minutes)}
              </span>
            </div>

            <div className="space-y-4 text-body-md text-on-surface-variant leading-relaxed">
              {r.body.map((b, i) => (
                <div key={i} className="rounded-2xl border border-white/70 bg-white/50 p-4 shadow-sm">
                  {b.h && <h3 className="mb-1.5 font-display text-headline-md font-bold text-primary">{b.h}</h3>}
                  <p>{b.p}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-surface-container/60 pt-4">
              <LikeButton base={reading.likes} />
              <button
                onClick={() => openShare({ title: r.title, url: articleUrl(reading) })}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#006aff] px-5 py-2.5 text-label-md font-bold text-white shadow-primary transition-all hover:scale-105 active:scale-95"
              >
                <Icon name="send" className="text-base" /> {t.sendPartner}
              </button>
            </div>
          </article>
        )}
      </Sheet>

      <Quiz open={quiz} onClose={() => setQuiz(false)} />
    </div>
  )
}

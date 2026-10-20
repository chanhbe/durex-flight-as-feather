import { useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { CtaButton, Icon, Reveal, Sheet } from '../components/ui'
import { useApp } from '../components/AppProvider'
import { ARTICLES, CATEGORIES, QUIZ, productById, type Article, type Category, type ProductId } from '../data/content'
import { fmtNum, useLang, useT, useTitle, type Lang } from '../i18n'

const T = {
  vi: {
    title: 'Cẩm Nang',
    kicker: 'Cẩm Nang Thấu Cảm',
    h1: 'Góc Tự Tin Cất Cánh',
    lead: 'The Confidence Corner – không gian cởi mở về cảm xúc, kỹ thuật và sự kết nối an toàn.',
    filter: 'Lọc theo chủ đề',
    minRead: (n: number) => `${n} phút đọc`,
    featured: 'Nổi Bật',
    today: 'Hôm nay',
    takeaway: 'Điểm chính',
    read: 'Đọc Bài Viết',
    readMore: 'Đọc tiếp',
    share: 'Chia sẻ',
    sendPartner: 'Gửi Đối Tác',
    empathy: 'người đồng cảm',
    quote: '“Sự tự tin khi chuẩn bị bao cao su không làm giảm cảm xúc; ngược lại, nó thể hiện sự tôn trọng tuyệt đối và bản lĩnh của người trưởng thành.”',
    quoteBy: '— Chuyên gia Tâm lý & Sức khỏe Tình dục Durex Care',
    tips: [
      { h: 'Quy tắc Đèn Giao Thông', p: 'Quy ước tín hiệu đỏ - vàng - xanh để kiểm soát nhịp điệu mượt mà.' },
      { h: 'Lắng Nghe Ánh Mắt', p: '90% phản hồi đến từ ngôn ngữ hình thể và tiếng thở.' },
    ],
    quizKicker: 'Trắc Nghiệm 60 Giây',
    quizTitle: 'Tìm Dòng Bao Chuẩn Gu Của Bạn',
    quizBody: 'Khám phá độ mỏng, mùi hương và kích thước lý tưởng cho cảm xúc thăng hoa.',
    quizStart: 'Bắt Đầu Ngay',
    question: (i: number, n: number) => `Câu ${i}/${n}`,
    result: 'Dòng bao chuẩn gu của bạn',
    retry: 'Làm lại',
    buy: 'Mua ngay',
  },
  en: {
    title: 'Guides',
    kicker: 'Empathy Guides',
    h1: 'The Confidence Corner',
    lead: 'An open space to talk about feelings, technique and safe connection.',
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
    quote: '“Being confident about having a condom ready doesn’t kill the mood – it shows complete respect and maturity.”',
    quoteBy: '— Durex Care Sexual Health & Psychology Expert',
    tips: [
      { h: 'The Traffic-Light Rule', p: 'Agree on red – yellow – green signals to keep the rhythm smooth.' },
      { h: 'Read the Eyes', p: '90% of feedback comes from body language and breathing.' },
    ],
    quizKicker: '60-Second Quiz',
    quizTitle: 'Find Your Perfect Condom',
    quizBody: 'Discover the thinness, feel and fit that suit you best.',
    quizStart: 'Start Now',
    question: (i: number, n: number) => `Question ${i}/${n}`,
    result: 'Your perfect match',
    retry: 'Try again',
    buy: 'Buy now',
  },
}

const CAT_STYLE: Record<Exclude<Category, 'all'>, string> = {
  pleasure: 'bg-primary-fixed text-primary',
  consent: 'bg-secondary-fixed text-on-secondary-fixed-variant',
  wellness: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
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
    <button onClick={() => setLiked((l) => !l)} className="flex items-center gap-1.5" aria-pressed={liked}>
      <motion.span
        key={String(liked)}
        initial={{ scale: liked ? 0.4 : 1 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 12 }}
        className={`flex h-7 w-7 items-center justify-center rounded-full ${liked ? 'bg-crimson text-white' : 'bg-primary-fixed text-primary'}`}
      >
        <Icon name="favorite" fill={liked} className="text-sm" />
      </motion.span>
      <span className="text-label-sm text-on-surface-variant">
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
    <article className="glass-strong group relative overflow-hidden rounded-xl p-5 shadow-cloud md:grid md:grid-cols-2 md:gap-8 md:p-8">
      <button
        onClick={onRead}
        aria-label={x.title}
        className="relative mb-4 block h-56 w-full overflow-hidden rounded-lg bg-gradient-to-tr from-primary-fixed to-surface md:mb-0 md:h-full md:min-h-80"
      >
        <img src={a.img} alt="" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-inverse-surface/60 px-3 py-1 text-label-sm text-inverse-on-surface backdrop-blur-md">
          <Icon name="schedule" className="text-sm" /> {t.minRead(a.minutes)}
        </span>
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-crimson px-2.5 py-1 text-label-sm text-white shadow-crimson">
          <Icon name="star" fill className="text-xs" /> {t.featured}
        </span>
      </button>
      <div className="flex flex-col">
        <div className="mb-2 flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-label-sm ${CAT_STYLE[a.category]}`}>{catLabel(a.category, lang)}</span>
          <span className="text-xs text-outline">•</span>
          <span className="text-label-sm text-on-surface-variant">{t.today}</span>
        </div>
        <h2 className="mb-2 text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">{x.title}</h2>
        <p className="mb-4 text-body-md text-on-surface-variant">{x.excerpt}</p>
        <div className="mb-5 rounded-lg border border-white/60 bg-surface-container-low/80 p-3.5">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Icon name="tips_and_updates" className="text-sm text-primary" />
            </div>
            <div>
              <span className="block text-label-sm text-primary uppercase">{t.takeaway}</span>
              <p className="text-xs leading-relaxed text-on-surface">{x.takeaway}</p>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-outline-variant/30 pt-3">
          <CtaButton shimmer={false} className="px-5 py-2.5 text-label-md" onClick={onRead}>
            {t.read} <Icon name="arrow_forward" className="text-sm" />
          </CtaButton>
          <button
            aria-label={t.share}
            onClick={() => openShare({ title: x.title, url: articleUrl(a) })}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-primary shadow-sm transition-transform active:scale-90"
          >
            <Icon name="share" className="text-lg" />
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
    <article className="glass-strong flex h-full flex-col overflow-hidden rounded-xl shadow-cloud">
      <button onClick={onRead} aria-label={x.title} className="group relative h-40 overflow-hidden">
        <img
          src={a.img}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-label-sm ${CAT_STYLE[a.category]}`}>{catLabel(a.category, lang)}</span>
          <span className="flex shrink-0 items-center gap-1 text-label-sm text-on-surface-variant">
            <Icon name="schedule" className="text-sm" /> {t.minRead(a.minutes)}
          </span>
        </div>
        <h3 className="mb-2 text-headline-md leading-snug text-on-surface">{x.title}</h3>
        <p className="mb-4 text-body-md text-on-surface-variant">{x.excerpt}</p>

        {a.id === 'mo-loi-dung-bao' && (
          <blockquote className="mb-4 rounded-lg border-l-4 border-secondary bg-white/80 p-3.5 shadow-sm">
            <p className="mb-1.5 text-xs text-on-surface-variant italic">{t.quote}</p>
            <cite className="block text-label-sm font-bold text-primary not-italic">{t.quoteBy}</cite>
          </blockquote>
        )}
        {a.id === 'consent-chia-khoa' && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {t.tips.map((tip, i) => (
              <div key={tip.h} className="rounded-lg border border-white/50 bg-surface-container-low/70 p-3">
                <Icon name={i === 0 ? 'verified' : 'mood'} className={`mb-1 text-base ${i === 0 ? 'text-primary' : 'text-tertiary'}`} />
                <h4 className="mb-0.5 text-label-sm text-on-surface">{tip.h}</h4>
                <p className="text-[11px] leading-tight text-on-surface-variant">{tip.p}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          <LikeButton base={a.likes} />
          <div className="flex items-center gap-2">
            <button onClick={onRead} className="group flex items-center gap-0.5 text-label-md text-primary">
              {t.readMore} <Icon name="chevron_right" className="text-sm transition-transform group-hover:translate-x-1" />
            </button>
            <button
              aria-label={t.share}
              onClick={() => openShare({ title: x.title, url: articleUrl(a) })}
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-primary transition-transform active:scale-90"
            >
              <Icon name="share" className="text-base" />
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
      <div className="mb-4 flex gap-1.5">
        {questions.map((_, i) => (
          <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-container">
            <motion.div className="h-full bg-crimson" animate={{ width: i < step ? '100%' : '0%' }} />
          </div>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <p className="mb-3 text-label-sm text-primary uppercase">{t.question(step + 1, questions.length)}</p>
            <h4 className="mb-4 text-headline-md text-on-surface">{questions[step].q}</h4>
            <div className="space-y-2.5">
              {questions[step].options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => pick(o.score)}
                  className="flex w-full items-center justify-between rounded-full border border-outline-variant/50 bg-surface-container-low px-5 py-3 text-left text-sm font-semibold text-on-surface transition-all hover:border-primary hover:bg-primary-fixed active:scale-[0.98]"
                >
                  {o.label}
                  <Icon name="chevron_right" className="text-primary" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <p className="text-label-sm text-primary uppercase">{t.result}</p>
            <img src={result.img} alt={`Durex ${result.name}`} className="mx-auto my-3 h-40 animate-floating object-contain drop-shadow-xl" />
            <h4 className="text-headline-lg-mobile text-crimson">Durex {result.name}</h4>
            <p className="mb-5 text-sm text-on-surface-variant">{result.tagline[lang]}</p>
            <div className="flex gap-2">
              <button onClick={reset} className="flex-1 rounded-full bg-surface-container px-4 py-3 text-label-md font-bold text-primary">
                {t.retry}
              </button>
              <CtaButton
                className="flex-1 px-4 py-3 text-label-md"
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
    <div className="mx-auto max-w-lg px-5 pt-4 pb-4 md:max-w-6xl md:px-8 md:pt-8">
      <section className="mt-2 mb-6 flex flex-col items-center text-center">
        <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-3 py-1 shadow-sm backdrop-blur-md">
          <Icon name="auto_awesome" className="text-base text-secondary" />
          <span className="text-label-sm tracking-wider text-primary uppercase">{t.kicker}</span>
        </div>
        <h1 className="text-display-mobile tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,68,124,0.3)] md:text-display">{t.h1}</h1>
        <p className="mt-1 max-w-xs text-body-md text-white/90 md:max-w-md">{t.lead}</p>
      </section>

      <LayoutGroup>
        <section className="mb-6" aria-label={t.filter}>
          <div className="no-scrollbar -mx-5 flex items-center gap-2 overflow-x-auto px-5 py-1 md:mx-0 md:justify-center md:px-0">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={`relative shrink-0 rounded-full px-4 py-2 text-label-md transition-colors active:scale-95 ${
                  cat === c.id ? 'text-white' : 'border border-white/70 bg-white/80 text-on-surface-variant backdrop-blur-md hover:bg-white'
                }`}
              >
                {cat === c.id && <motion.span layoutId="cat-pill" className="absolute inset-0 -z-10 rounded-full bg-primary shadow-md" />}
                {c.label[lang]}
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence mode="wait">
          <motion.div key={cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            {featured && (
              <div className="mb-6">
                <FeaturedCard a={featured} onRead={() => setReading(featured)} />
              </div>
            )}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}>
                  <ArticleCard a={a} onRead={() => setReading(a)} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>

      <Reveal className="relative mt-8 mb-4 overflow-hidden rounded-xl bg-gradient-to-r from-primary-container to-primary p-5 text-white shadow-lg md:p-8">
        <div className="relative z-10 max-w-[60%] md:max-w-md">
          <span className="mb-2 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-label-sm backdrop-blur-md">{t.quizKicker}</span>
          <h2 className="mb-1 text-headline-md text-white">{t.quizTitle}</h2>
          <p className="mb-3.5 text-xs text-white/80">{t.quizBody}</p>
          <button onClick={() => setQuiz(true)} className="rounded-full bg-white px-4 py-2 text-label-md text-primary shadow transition-all active:scale-95">
            {t.quizStart}
          </button>
        </div>
        <img
          src="/assets/p-pleasuremax.webp"
          alt=""
          loading="lazy"
          className="absolute -right-4 -bottom-6 w-32 rotate-12 opacity-90 drop-shadow-2xl md:right-10 md:w-44"
        />
        <img
          src="/assets/p-fetherlite.webp"
          alt=""
          loading="lazy"
          className="absolute right-16 -bottom-10 w-28 -rotate-6 opacity-90 drop-shadow-2xl md:right-44 md:w-40"
        />
      </Reveal>

      <Sheet open={!!reading} onClose={() => setReading(null)} title={r?.title} wide>
        {reading && r && (
          <article>
            <div className="mb-5 h-52 overflow-hidden rounded-lg md:h-72">
              <img src={reading.img} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="mb-3 flex items-center gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-label-sm ${CAT_STYLE[reading.category]}`}>{catLabel(reading.category, lang)}</span>
              <span className="text-label-sm text-on-surface-variant">{t.minRead(reading.minutes)}</span>
            </div>
            <div className="space-y-4 text-body-md text-on-surface-variant">
              {r.body.map((b, i) => (
                <div key={i}>
                  {b.h && <h3 className="mb-1 text-label-lg font-bold text-primary">{b.h}</h3>}
                  <p>{b.p}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-outline-variant/30 pt-4">
              <LikeButton base={reading.likes} />
              <button
                onClick={() => openShare({ title: r.title, url: articleUrl(reading) })}
                className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-label-md text-white active:scale-95"
              >
                <Icon name="send" className="text-sm" /> {t.sendPartner}
              </button>
            </div>
          </article>
        )}
      </Sheet>

      <Quiz open={quiz} onClose={() => setQuiz(false)} />
    </div>
  )
}

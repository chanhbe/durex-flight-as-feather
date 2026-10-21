import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CtaButton, Icon, Sheet } from './ui'
import { useLang } from '../i18n'
import {
  PACKS,
  POLICIES,
  PRODUCTS,
  STORES,
  UI,
  formatVnd,
  productById,
  type PackId,
  type PolicyKind,
  type ProductId,
  type StoreKey,
} from '../data/content'

type Toast = { id: number; text: string; icon?: string }
type ShareTarget = { title: string; url: string }

type Ctx = {
  toast: (text: string, icon?: string) => void
  openBuy: (opts?: { product?: ProductId; pack?: PackId }) => void
  openShare: (target?: ShareTarget) => void
  openPolicy: (kind: PolicyKind) => void
}

const AppCtx = createContext<Ctx | null>(null)
export const useApp = () => {
  const c = useContext(AppCtx)
  if (!c) throw new Error('useApp must be used inside <AppProvider>')
  return c
}

const SITE = 'https://durex.vn/nhe-nhu-bay'

export function AppProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang()
  const t = UI[lang]
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)
  const [buyOpen, setBuyOpen] = useState(false)
  const [buyPack, setBuyPack] = useState<PackId>('12')
  const [buyProduct, setBuyProduct] = useState<ProductId>('fetherlite')
  const [share, setShare] = useState<ShareTarget | null>(null)
  const [copied, setCopied] = useState(false)
  const [policy, setPolicy] = useState<PolicyKind | null>(null)

  const toast = useCallback((text: string, icon = 'check_circle') => {
    const id = ++nextId.current
    setToasts((ts) => [...ts, { id, text, icon }])
    setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 2800)
  }, [])

  const openBuy = useCallback((opts?: { product?: ProductId; pack?: PackId }) => {
    setBuyProduct(opts?.product ?? 'fetherlite')
    if (opts?.pack) setBuyPack(opts.pack)
    setBuyOpen(true)
  }, [])

  const openShare = useCallback((target?: ShareTarget) => {
    setCopied(false)
    setShare(target ?? { title: 'Durex Fetherlite – Nhẹ Như Bay', url: SITE })
  }, [])

  const openPolicy = useCallback((kind: PolicyKind) => setPolicy(kind), [])

  const value = useMemo(() => ({ toast, openBuy, openShare, openPolicy }), [toast, openBuy, openShare, openPolicy])
  const pack = PACKS.find((p) => p.id === buyPack) ?? PACKS[1]
  const product = productById(buyProduct)

  const goStore = (key: StoreKey) => {
    window.open(STORES[key].url, '_blank', 'noopener,noreferrer')
    setBuyOpen(false)
    toast(t.redirecting(STORES[key].name), 'open_in_new')
  }

  const copyLink = async (silent = false) => {
    if (!share) return
    try {
      await navigator.clipboard.writeText(share.url)
    } catch {
      /* clipboard may be blocked; still show feedback */
    }
    setCopied(true)
    if (!silent) toast(t.linkCopied)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTo = (platform: 'facebook' | 'tiktok' | 'native') => {
    if (!share) return
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(share.url)}`, '_blank', 'noopener')
    } else if (platform === 'tiktok') {
      // TikTok has no web share endpoint: copy the link, then open TikTok
      void copyLink(true)
      toast(t.tiktokHint, 'content_copy')
      window.open('https://www.tiktok.com/@durex_vietnam', '_blank', 'noopener')
    } else if (navigator.share) {
      navigator.share({ title: share.title, url: share.url }).catch(() => {})
    } else {
      void copyLink()
    }
  }

  const policyDoc = policy ? POLICIES[lang][policy] : null

  return (
    <AppCtx.Provider value={value}>
      {children}

      {/* Buy sheet → Shopee / Lazada */}
      <Sheet open={buyOpen} onClose={() => setBuyOpen(false)} title={t.buyTitle} subtitle={t.buySub}>
        <div className="no-scrollbar -mx-6 mb-3 flex gap-2 overflow-x-auto px-6">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setBuyProduct(p.id)}
              aria-pressed={p.id === buyProduct}
              className={`shrink-0 rounded-full px-3 py-1 text-label-md transition-all ${
                p.id === buyProduct ? 'bg-crimson text-white shadow-crimson' : 'bg-surface-container-low text-on-surface-variant'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="mb-4 flex items-center gap-4 rounded-lg bg-surface-container-low p-3">
          <AnimatePresence mode="wait">
            <motion.img
              key={product.id}
              initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              src={product.img}
              alt={`Durex ${product.name}`}
              className="h-20 w-20 object-contain"
            />
          </AnimatePresence>
          <div className="flex-1">
            <p className="text-label-md text-on-surface">Durex {product.name}</p>
            <p className="text-[11px] text-on-surface-variant">{product.tagline[lang]}</p>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {PACKS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setBuyPack(p.id)}
                  aria-pressed={p.id === buyPack}
                  className={`rounded-full px-3 py-1 text-label-md transition-all ${
                    p.id === buyPack ? 'bg-primary text-white shadow-primary' : 'bg-white text-primary'
                  }`}
                >
                  {p.label[lang]}
                </button>
              ))}
            </div>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-headline-md font-bold text-crimson">{formatVnd(pack.price, lang)}</span>
              <span className="text-sm text-on-surface-variant line-through">{formatVnd(pack.was, lang)}</span>
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {(Object.keys(STORES) as StoreKey[]).map((k) => (
            <button
              key={k}
              onClick={() => goStore(k)}
              className="flex w-full items-center justify-between rounded-full border border-outline-variant/50 bg-white px-5 py-3.5 font-semibold text-on-surface shadow-cloud-sm transition-all hover:border-primary active:scale-[0.98]"
            >
              <span className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ background: STORES[k].dot }} />
                {t.buyAt} {STORES[k].name}
              </span>
              <Icon name="open_in_new" className="text-primary" />
            </button>
          ))}
        </div>
      </Sheet>

      {/* Share sheet */}
      <Sheet open={!!share} onClose={() => setShare(null)} title={t.shareTitle} subtitle={t.shareSub}>
        <div className="mb-5 grid grid-cols-3 gap-3">
          <button
            onClick={() => shareTo('facebook')}
            className="flex flex-col items-center gap-2 rounded-lg bg-surface-container-low p-3.5 transition-colors hover:bg-surface-container active:scale-95"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2]/10 text-xl font-bold text-[#1877F2]">f</span>
            <span className="text-label-sm">Facebook</span>
          </button>
          <button
            onClick={() => shareTo('tiktok')}
            className="flex flex-col items-center gap-2 rounded-lg bg-surface-container-low p-3.5 transition-colors hover:bg-surface-container active:scale-95"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-inverse-surface text-inverse-on-surface">
              <Icon name="music_note" className="text-xl" />
            </span>
            <span className="text-label-sm">TikTok</span>
          </button>
          <button
            onClick={() => shareTo('native')}
            className="flex flex-col items-center gap-2 rounded-lg bg-surface-container-low p-3.5 transition-colors hover:bg-surface-container active:scale-95"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <Icon name="favorite" fill className="text-xl" />
            </span>
            <span className="text-label-sm">{t.partner}</span>
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-low p-2">
          <Icon name="link" className="ml-2 text-lg text-outline" />
          <input
            readOnly
            aria-label="URL"
            value={share?.url ?? ''}
            className="min-w-0 flex-1 truncate bg-transparent px-1 text-xs text-on-surface-variant outline-none"
          />
          <button
            onClick={() => void copyLink()}
            className={`shrink-0 rounded-full px-4 py-2 text-label-sm text-white transition-all active:scale-95 ${copied ? 'bg-crimson' : 'bg-primary'}`}
          >
            {copied ? t.copied : t.copy}
          </button>
        </div>
      </Sheet>

      {/* Policies & game rules */}
      <Sheet open={!!policy} onClose={() => setPolicy(null)} title={policyDoc?.title} wide>
        {policyDoc && (
          <div className="space-y-4 text-body-md text-on-surface-variant">
            {policyDoc.sections.map((s, i) => (
              <div key={i}>
                {s.h && <h4 className="mb-1 text-label-lg font-bold text-primary">{s.h}</h4>}
                <p>{s.p}</p>
              </div>
            ))}
            {policy === 'rules' && (
              <CtaButton shimmer={false} className="mt-2 w-full px-6 py-3 text-label-lg" onClick={() => setPolicy(null)}>
                <Icon name="check" /> {lang === 'vi' ? 'Đã hiểu, chơi thôi!' : 'Got it, let’s play!'}
              </CtaButton>
            )}
          </div>
        )}
      </Sheet>

      {/* Toasts */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[90] flex flex-col items-center gap-2 px-4">
        <AnimatePresence>
          {toasts.map((ts) => (
            <motion.div
              key={ts.id}
              layout
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              className="glass-strong flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-primary shadow-cloud"
            >
              <Icon name={ts.icon ?? 'check_circle'} fill className="text-lg text-crimson" />
              {ts.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AppCtx.Provider>
  )
}

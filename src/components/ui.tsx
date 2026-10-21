import { motion, AnimatePresence, useDragControls, type HTMLMotionProps } from 'motion/react'
import { useEffect, useId, useRef, type ReactNode, type ButtonHTMLAttributes } from 'react'
import { useT } from '../i18n'
import { UI } from '../data/content'

export function Icon({ name, fill, className = '' }: { name: string; fill?: boolean; className?: string }) {
  return (
    <span aria-hidden className={`icon ${fill ? 'icon-fill' : ''} ${className}`}>
      {name}
    </span>
  )
}

/** Official Iconic Durex Brandmark (Vector Lozenge Capsule) */
export function DurexLogo({
  variant = 'blue',
  size = 'md',
  className = '',
}: {
  variant?: 'blue' | 'white' | 'glass' | 'crimson'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const heightMap = { sm: 26, md: 34, lg: 44 }
  const h = heightMap[size]
  // Proportion: Durex capsule is ~2.8x wider than height
  const w = Math.round(h * 2.8)

  const isWhite = variant === 'white'
  const isGlass = variant === 'glass'
  const isCrimson = variant === 'crimson'

  const strokeColor = isWhite ? '#ffffff' : isCrimson ? '#e51b24' : isGlass ? 'rgba(255,255,255,0.9)' : '#00508f'
  const textColor = isWhite ? '#ffffff' : isCrimson ? '#e51b24' : isGlass ? '#ffffff' : '#00508f'

  return (
    <span className={`inline-flex items-center select-none transition-transform duration-300 hover:scale-[1.03] ${className}`}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 112 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Durex Logo"
      >
        <defs>
          <filter id="durexGlow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer iconic capsule ring */}
        <rect
          x="3"
          y="3"
          width="106"
          height="34"
          rx="17"
          stroke={strokeColor}
          strokeWidth="3.2"
          fill={isGlass ? 'rgba(255, 255, 255, 0.15)' : 'none'}
        />

        {/* Subtle inner specular reflection rim */}
        <rect
          x="4.5"
          y="4.5"
          width="103"
          height="15"
          rx="8"
          fill="url(#specularGrad)"
          opacity={isWhite ? '0.25' : '0.15'}
        />
        <defs>
          <linearGradient id="specularGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Stylized Durex Wordmark */}
        <text
          x="56"
          y="26.5"
          textAnchor="middle"
          fill={textColor}
          fontFamily="'Montserrat', 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="21"
          letterSpacing="-0.04em"
        >
          durex
        </text>
      </svg>
    </span>
  )
}

/** Luxury Scroll Reveal with Apple/Stripe-caliber spring physics */
export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 24,
  ...rest
}: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '60px 0px 60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type CtaProps = ButtonHTMLAttributes<HTMLButtonElement> & { pulse?: boolean; shimmer?: boolean }

/** Primary Campaign Pill CTA — Glowing Crimson with Specular Sheen & Tactile Press */
export function CtaButton({ children, className = '', pulse, shimmer = true, ...rest }: CtaProps) {
  return (
    <button
      type="button"
      {...rest}
      className={`group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#ff2a54] via-crimson to-[#ba0a12] font-display font-bold tracking-wide text-white shadow-crimson transition-all duration-300 hover:brightness-110 hover:shadow-glow-red active:scale-[0.96] disabled:opacity-60 ${
        pulse ? 'cta-pulse' : ''
      } ${className}`}
    >
      {shimmer && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[120%]"
        />
      )}
      <span className="flex items-center justify-center gap-2 drop-shadow-sm">{children}</span>
    </button>
  )
}

/** Secondary "Air" button — Luxury frosted pill with luminous hairline reflection */
export function AirButton({ children, className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/80 bg-white/40 px-6 py-3.5 font-display text-label-lg font-bold text-primary shadow-[0_8px_20px_rgba(11,74,130,0.08)] backdrop-blur-xl transition-all duration-300 hover:border-white hover:bg-white/70 hover:shadow-[0_12px_28px_rgba(11,74,130,0.14)] active:scale-[0.97] ${className}`}
    >
      <span className="flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}

/** Luxury Glass Card Frame with concentric corner radii and smooth hover elevation */
export function GlassCard({
  children,
  className = '',
  hoverElevate = true,
}: {
  children: ReactNode
  className?: string
  hoverElevate?: boolean
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/70 bg-white/60 p-6 shadow-cloud ring-1 ring-white/90 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hoverElevate ? 'hover:-translate-y-1 hover:shadow-luxury hover:bg-white/75' : ''
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      {children}
    </div>
  )
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-3.5 py-1 text-label-sm font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-md ${className}`}
    >
      {children}
    </span>
  )
}

/** Bottom sheet on mobile, centered dialog on desktop */
export function Sheet({
  open,
  onClose,
  children,
  title,
  subtitle,
  wide,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
  wide?: boolean
}) {
  const controls = useDragControls()
  const t = useT(UI)
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const items = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!items.length) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => panelRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      opener?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#06192d]/50 backdrop-blur-md" onClick={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            tabIndex={-1}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => info.offset.y > 120 && onClose()}
            className={`relative max-h-[88dvh] w-full overflow-y-auto overscroll-contain rounded-t-[32px] border-t border-white/90 bg-white/95 p-6 pb-8 shadow-2xl backdrop-blur-2xl outline-none md:rounded-[32px] md:border ${
              wide ? 'md:max-w-2xl' : 'md:max-w-lg'
            }`}
          >
            <div
              className="-mx-6 -mt-6 mb-3 flex cursor-grab touch-none justify-center pt-3.5 pb-2 md:hidden"
              onPointerDown={(e) => controls.start(e)}
            >
              <div className="h-1.5 w-12 rounded-full bg-outline-variant/70" />
            </div>
            {(title || subtitle) && (
              <div className="mb-5 flex items-start justify-between gap-4 border-b border-surface-container/60 pb-4">
                <div>
                  {title && (
                    <h3 id={titleId} className="text-headline-md font-bold text-primary">
                      {title}
                    </h3>
                  )}
                  {subtitle && <p className="mt-0.5 text-xs text-on-surface-variant">{subtitle}</p>}
                </div>
                <button
                  aria-label={t.close}
                  onClick={onClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-primary"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Stars({ className = '' }: { className?: string }) {
  return (
    <div className={`flex text-[#FFB800] ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" fill className="text-[14px]" />
      ))}
    </div>
  )
}

/** Small burst of confetti/hearts — purely decorative */
export function Burst({ show, count = 18 }: { show: boolean; count?: number }) {
  const colors = ['#e51b24', '#ffa6ca', '#a1c9ff', '#ffffff', '#1388e6']
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          {Array.from({ length: count }, (_, i) => {
            const angle = (i / count) * Math.PI * 2
            const dist = 90 + (i % 3) * 40
            return (
              <motion.span
                key={i}
                className="absolute h-2.5 w-2.5 rounded-full"
                style={{ background: colors[i % colors.length] }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            )
          })}
        </div>
      )}
    </AnimatePresence>
  )
}

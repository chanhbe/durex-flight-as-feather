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

/** Fades + lifts content into view once (scroll reveal). */
export function Reveal({ children, delay = 0, className = '', ...rest }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type CtaProps = ButtonHTMLAttributes<HTMLButtonElement> & { pulse?: boolean; shimmer?: boolean }

/** Primary Campaign Pill CTA — glowing crimson, glossy sheen, pulse + press feedback. */
export function CtaButton({ children, className = '', pulse, shimmer = true, ...rest }: CtaProps) {
  return (
    <button
      type="button"
      {...rest}
      className={`relative isolate overflow-hidden rounded-full bg-crimson font-bold text-white shadow-crimson transition-[transform,filter] duration-150 hover:brightness-105 active:scale-95 disabled:opacity-60 ${
        pulse ? 'cta-pulse' : ''
      } ${className}`}
    >
      {shimmer && (
        <span className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-1/2 animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      )}
      <span className="flex items-center justify-center gap-2">{children}</span>
    </button>
  )
}

/** Secondary "Air" button — frosted pill with white rim. */
export function AirButton({ children, className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={`flex items-center justify-center gap-1.5 rounded-full border-[1.5px] border-white/70 bg-white/30 font-bold text-primary shadow-[0_4px_16px_rgba(11,74,130,0.1)] backdrop-blur-md transition-all duration-150 hover:bg-white/50 active:scale-95 ${className}`}
    >
      {children}
    </button>
  )
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-sm uppercase ${className}`}>
      {children}
    </span>
  )
}

/** Bottom sheet on mobile, centered dialog on desktop. */
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
      // keep Tab focus inside the dialog
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
          <div className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm" onClick={onClose} />
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
            className={`relative max-h-[88dvh] w-full overflow-y-auto overscroll-contain rounded-t-xl border-t border-white/80 bg-white p-6 pb-8 shadow-2xl outline-none md:rounded-xl ${
              wide ? 'md:max-w-2xl' : 'md:max-w-lg'
            }`}
          >
            <div
              className="-mx-6 -mt-6 mb-3 flex cursor-grab touch-none justify-center pt-3 pb-2 md:hidden"
              onPointerDown={(e) => controls.start(e)}
            >
              <div className="h-1 w-12 rounded-full bg-outline-variant/60" />
            </div>
            {(title || subtitle) && (
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  {title && (
                    <h3 id={titleId} className="text-headline-md font-bold text-on-surface">
                      {title}
                    </h3>
                  )}
                  {subtitle && <p className="text-xs text-on-surface-variant">{subtitle}</p>}
                </div>
                <button
                  aria-label={t.close}
                  onClick={onClose}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface"
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

/** Small burst of confetti/hearts — purely decorative. */
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

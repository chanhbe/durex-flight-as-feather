import { useId } from 'react'

const PALETTE = {
  pink: { light: '#ffe3ef', mid: '#ffa6ca', dark: '#e9679b' },
  blue: { light: '#e3f2ff', mid: '#8cc8ff', dark: '#3d8fe0' },
} as const

type Props = { color?: keyof typeof PALETTE; className?: string; string?: boolean }

/** Glossy latex heart balloon with a string (decorative). */
export function HeartBalloon({ color = 'pink', className = '', string = true }: Props) {
  const id = useId()
  const c = PALETTE[color]
  return (
    <svg viewBox="0 0 100 170" className={className} aria-hidden>
      <defs>
        <radialGradient id={`${id}g`} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="45%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.dark} />
        </radialGradient>
      </defs>
      {string && <path d="M50 92 C 44 115, 58 135, 48 170" stroke="white" strokeOpacity=".85" strokeWidth="1.2" fill="none" />}
      <path
        d="M50 90 C 18 68, 2 48, 6 28 C 10 8, 36 2, 50 22 C 64 2, 90 8, 94 28 C 98 48, 82 68, 50 90 Z"
        fill={`url(#${id}g)`}
      />
      <path d="M47 89 l3 6 l3 -6 z" fill={c.dark} />
      <ellipse cx="26" cy="26" rx="9" ry="5" fill="white" opacity=".75" transform="rotate(-35 26 26)" />
      <ellipse cx="74" cy="22" rx="4" ry="2.5" fill="white" opacity=".55" transform="rotate(30 74 22)" />
    </svg>
  )
}

/** Glossy round balloon used as the inflatable in the mini-game. */
export function RoundBalloon({ color = 'pink', className = '', string = true }: Props) {
  const id = useId()
  const c = PALETTE[color]
  return (
    <svg viewBox="0 0 100 180" className={className} aria-hidden>
      <defs>
        <radialGradient id={`${id}g`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={c.light} />
          <stop offset="40%" stopColor={c.mid} />
          <stop offset="100%" stopColor={c.dark} />
        </radialGradient>
      </defs>
      {string && <path d="M50 118 C 42 135, 60 155, 50 180" stroke="white" strokeOpacity=".9" strokeWidth="1.4" fill="none" />}
      <ellipse cx="50" cy="58" rx="44" ry="56" fill={`url(#${id}g)`} />
      <path d="M45 113 l5 8 l5 -8 z" fill={c.dark} />
      <ellipse cx="30" cy="30" rx="12" ry="7" fill="white" opacity=".75" transform="rotate(-40 30 30)" />
      <ellipse cx="66" cy="92" rx="10" ry="4" fill="white" opacity=".25" transform="rotate(-30 66 92)" />
    </svg>
  )
}

/** Soft white feather (decorative). */
export function Feather({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden>
      <path d="M30 118 C 30 80, 31 40, 34 4" stroke="white" strokeWidth="1.5" fill="none" opacity=".9" />
      <path
        d="M33 8 C 52 22, 56 52, 44 78 C 40 88, 34 96, 31 104 C 26 92, 12 80, 8 62 C 4 40, 16 18, 33 8 Z"
        fill="white"
        opacity=".85"
      />
      <path d="M31 30 L 18 44 M31 46 L 16 60 M31 62 L 18 76 M32 34 L 46 46 M32 52 L 46 64" stroke="#cfe6fb" strokeWidth=".8" />
    </svg>
  )
}

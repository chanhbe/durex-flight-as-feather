import { useNavigate } from 'react-router-dom'
import { CtaButton, Icon } from '../components/ui'
import { HeartBalloon, RoundBalloon } from '../components/Balloons'
import { UI } from '../data/content'
import { useT, useTitle } from '../i18n'

export function NotFound() {
  const t = useT(UI)
  const navigate = useNavigate()
  useTitle('404')
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5 py-16 text-center">
      <div className="relative mb-6 h-48 w-40">
        <RoundBalloon color="pink" className="absolute inset-x-0 mx-auto h-44 animate-floating" />
        <HeartBalloon color="blue" className="absolute -right-6 bottom-6 w-12 animate-floating [animation-delay:-1.5s]" />
      </div>
      <p className="font-display text-[64px] leading-none font-black text-white drop-shadow-[0_4px_18px_rgba(0,68,124,0.35)]">404</p>
      <h1 className="mt-2 text-headline-md font-bold text-white">{t.notFoundTitle}</h1>
      <p className="mt-2 text-body-md text-white/90">{t.notFoundBody}</p>
      <CtaButton pulse className="mt-6 px-8 py-3.5 text-label-lg" onClick={() => navigate('/')}>
        <Icon name="flight_land" /> {t.backHome}
      </CtaButton>
    </div>
  )
}

import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { LangProvider } from './i18n'
import { AppProvider } from './components/AppProvider'
import { Layout } from './components/Layout'

// Each page is its own chunk so the first load only ships what is on screen.
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })))
const Offers = lazy(() => import('./pages/Offers').then((m) => ({ default: m.Offers })))
const Guides = lazy(() => import('./pages/Guides').then((m) => ({ default: m.Guides })))
const Support = lazy(() => import('./pages/Support').then((m) => ({ default: m.Support })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LangProvider>
        <BrowserRouter>
          <AppProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="san-pham" element={<Products />} />
                <Route path="uu-dai" element={<Offers />} />
                <Route path="cam-nang" element={<Guides />} />
                <Route path="ho-tro" element={<Support />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AppProvider>
        </BrowserRouter>
      </LangProvider>
    </MotionConfig>
  )
}

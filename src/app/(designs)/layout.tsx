'use client'
import { useEffect } from 'react'

export default function DesignsLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    /* Hide the fixed sidebar, header, ad-banner and remove the ml-[230px] offset
       so design showcase pages render full-screen without the portal chrome. */
    const sidebar  = document.querySelector('nav[aria-label="Main navigation"]') as HTMLElement | null
    const header   = document.querySelector('header') as HTMLElement | null
    const banner   = document.querySelector('[data-ad-banner]') as HTMLElement | null
    const mainWrap = document.querySelector('[data-main-wrap]') as HTMLElement | null

    if (sidebar)  sidebar.style.setProperty('display', 'none', 'important')
    if (header)   header.style.setProperty('display', 'none', 'important')
    if (banner)   banner.style.setProperty('display', 'none', 'important')
    if (mainWrap) {
      mainWrap.style.setProperty('margin-left', '0', 'important')
    }

    /* Also target the <main> padding injected by the root layout wrapper */
    const main = document.querySelector('main') as HTMLElement | null
    if (main) main.style.setProperty('padding-top', '0', 'important')

    return () => {
      if (sidebar)  sidebar.style.removeProperty('display')
      if (header)   header.style.removeProperty('display')
      if (banner)   banner.style.removeProperty('display')
      if (mainWrap) mainWrap.style.removeProperty('margin-left')
      if (main)     main.style.removeProperty('padding-top')
    }
  }, [])

  return <>{children}</>
}

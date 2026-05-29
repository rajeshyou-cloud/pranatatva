'use client'
import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'

// Routes where the booking sidebar is shown
function useShowSidebar() {
  const pathname = usePathname()
  return (
    pathname.startsWith('/services') ||
    pathname.startsWith('/book') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/confirmation')
  )
}

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const showSidebar = useShowSidebar()

  return (
    <>
      {showSidebar && <Suspense fallback={null}><Sidebar /></Suspense>}

      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${showSidebar ? 'md:ml-[230px]' : ''}`}
      >
        <Header sidebarVisible={showSidebar} />
        <main className="flex-1 pt-[102px]">{children}</main>
        <Footer />
      </div>
    </>
  )
}

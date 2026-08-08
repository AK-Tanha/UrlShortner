import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const AppLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Header />
      <main className="mx-auto w-full flex-1 max-w-6xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <div className="relative flex h-full w-full flex-col overflow-visible rounded-4xl border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 rounded-4xl bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.16),transparent_32%),radial-gradient(circle_at_center,rgba(56,189,248,0.08),transparent_45%)]" />
          <div className="relative flex min-h-[50vh] flex-1 flex-col p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout

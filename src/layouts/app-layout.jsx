import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'




const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      <Header />
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-12 md:py-6 sm:px-8 lg:px-10">
        <div className="relative flex-1 overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_30%)]" />
          <div className="relative flex min-h-[calc(100vh-6rem)] flex-col">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout

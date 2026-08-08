import React from 'react'

const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-6xl border-t border-white/10 px-4 py-6 text-center text-sm text-slate-400 sm:px-6 lg:px-8">
      <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-400 bg-clip-text font-medium text-transparent">
        UrlShortner
      </span>{" "}
      &copy; {new Date().getFullYear()}. All rights reserved.
    </footer>
  )
}

export default Footer

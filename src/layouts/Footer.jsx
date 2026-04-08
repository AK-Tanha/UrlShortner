import React from 'react'

const Footer = () => {
  return (
     <footer className="mx-auto w-full max-w-6xlpb-10 text-center text-sm text-slate-300 sm:px-8 lg:px-10 bg-amber-800">
          &copy; {new Date().getFullYear()} UrlShortner. All rights reserved.
      </footer>
  )
}

export default Footer

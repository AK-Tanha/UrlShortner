import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFoundPage = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text text-7xl font-black text-transparent sm:text-8xl">404</p>
      <p className="text-lg font-semibold text-slate-200 sm:text-xl">Page Not Found</p>
      <p className="max-w-sm text-sm text-slate-400">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-2 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-gray-950 transition hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400"
      >
        <Home className="h-4 w-4" />
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFoundPage

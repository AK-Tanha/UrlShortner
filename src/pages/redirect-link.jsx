import React from 'react'
import { useParams } from 'react-router-dom'

const RedirectLinkPage = () => {
  const { id } = useParams()

  React.useEffect(() => {
    // Let the backend resolve the short code and redirect to the original URL
    window.location.replace(`/api/v1/urls/${encodeURIComponent(id)}`)
  }, [id])

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <h1 className="text-2xl font-bold text-amber-400">Redirecting...</h1>
      <p className="text-sm text-slate-400">Taking you to the destination link.</p>
    </div>
  )
}

export default RedirectLinkPage

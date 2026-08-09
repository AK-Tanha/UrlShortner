import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Copy, Trash2, ExternalLink, Calendar, MousePointerClick } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api-client"
import { cn } from "@/lib/utils"

const getShortUrl = (shortCode) => `${import.meta.env.VITE_SHORT_URL || import.meta.env.VITE_API_URL || window.location.origin}/${shortCode}`

const LinkPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [url, setUrl] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    const fetchUrl = async () => {
      try {
        const data = await api.get(`/urls/details/${id}`)
        setUrl(data)
      } catch (err) {
        setError(err.message || 'Failed to load URL')
      } finally {
        setLoading(false)
      }
    }
    fetchUrl()
  }, [id])

  const handleDelete = async () => {
    try {
      await api.delete(`/urls/${id}`)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Failed to delete URL')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getShortUrl(url.shortCode))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (loading) {
    return <p className="text-sm text-slate-400">Loading link details...</p>
  }

  if (error) {
    return (
      <div className="space-y-4">
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-amber-400 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-amber-400">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
        <Button variant="ghost" size="sm" className="w-full text-red-400 sm:w-auto" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete Link
        </Button>
      </div>

      <h1 className="bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent sm:text-4xl">{url.title || 'Short Link'}</h1>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs text-slate-500">Short URL</p>
            <a
              href={getShortUrl(url.shortCode)}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1 break-all bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text text-base font-medium text-transparent hover:from-amber-200 hover:via-orange-300 hover:to-fuchsia-300 sm:text-lg"
            >
              {getShortUrl(url.shortCode)}
              <ExternalLink className="h-4 w-4 shrink-0 text-amber-400" />
            </a>
          </div>
          <Button size="sm" className="w-full bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 font-semibold text-gray-950 hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400 sm:w-auto" onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" />
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>

        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-slate-500">Original URL</p>
          <a
            href={url.originalUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block break-all text-sm text-slate-300 hover:text-amber-400"
          >
            {url.originalUrl}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Short Code</p>
            <p className="mt-1 font-mono text-sm text-slate-200">{url.shortCode}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Clicks</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-200">
              <MousePointerClick className="h-4 w-4 text-amber-400" />
              {url.clicks}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Status</p>
            <span
              className={cn(
                'mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs',
                url.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
              )}
            >
              {url.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-500">Expires</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-200">
              <Calendar className="h-4 w-4 text-slate-500" />
              {url.expiresAt ? new Date(url.expiresAt).toLocaleDateString() : 'Never'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-slate-500">Created</p>
            <p className="mt-1 text-sm text-slate-300">
              {new Date(url.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Last Updated</p>
            <p className="mt-1 text-sm text-slate-300">
              {new Date(url.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkPage

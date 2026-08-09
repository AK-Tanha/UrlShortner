import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Copy, Trash2, Plus, ExternalLink, Calendar, ShieldCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/api-client"
import { openAdminPanel } from "@/lib/session-bridge"
import { cn } from "@/lib/utils"

const ADMIN_PANEL_URL = import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"

const getShortUrl = (shortCode) => `${import.meta.env.VITE_SHORT_URL || import.meta.env.VITE_API_URL || window.location.origin}/${shortCode}`

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const [urls, setUrls] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = useState('')
  const [originalUrl, setOriginalUrl] = useState('')
  const [creating, setCreating] = useState(false)
  const [copied, setCopied] = useState(null)

  React.useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await api.get('/urls')
        setUrls(data)
      } catch (err) {
        setError(err.message || 'Failed to load URLs')
      } finally {
        setLoading(false)
      }
    }
    fetchUrls()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!originalUrl) return
    setCreating(true)
    setError('')
    try {
      const url = await api.post('/urls', { originalUrl })
      setUrls((prev) => [url, ...prev])
      setOriginalUrl('')
    } catch (err) {
      setError(err.message || 'Failed to create short URL')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/urls/${id}`)
      setUrls((prev) => prev.filter((u) => u._id !== id))
    } catch (err) {
      setError(err.message || 'Failed to delete URL')
    }
  }

  const handleCopy = (shortCode) => {
    navigator.clipboard.writeText(getShortUrl(shortCode))
    setCopied(shortCode)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent sm:text-4xl">Dashboard</h1>
          <p className="text-sm text-slate-400">Welcome back, {user?.name}</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {user?.role === 'SUPERADMIN' && (
            <button
              type="button"
              onClick={() => openAdminPanel(ADMIN_PANEL_URL)}
              className="inline-flex h-7 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 px-2.5 text-[0.8rem] font-semibold text-gray-950 transition hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Panel
            </button>
          )}
          <Button variant="outline" size="sm" onClick={logout} className="w-full sm:w-auto">
            Sign Out
          </Button>
        </div>
      </div>

      {/* Create short URL */}
      <form
        onSubmit={handleCreate}
        className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-slate-900/60 p-4 sm:flex-row sm:items-center"
      >
        <Input
          className="flex-1 border-slate-700 bg-slate-900/90 text-white placeholder:text-slate-500 focus:border-orange-400 focus:ring-orange-400"
          type="url"
          required
          placeholder="Paste a long URL to shorten..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <Button
          type="submit"
          disabled={creating}
          className="rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 font-semibold text-gray-950 transition hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400"
        >
          <Plus className="mr-2 h-4 w-4" />
          {creating ? 'Creating...' : 'Shorten'}
        </Button>
      </form>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
          {error}
        </p>
      )}

      {/* URLs list */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-slate-200">Your Links</h2>
        {loading ? (
          <p className="text-sm text-slate-400">Loading your links...</p>
        ) : urls.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-sm text-slate-400">
            No links yet. Create your first short URL above.
          </p>
        ) : (
          urls.map((url) => (
            <div
              key={url._id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <a
                  href={getShortUrl(url.shortCode)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 break-all bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text font-medium text-transparent hover:from-amber-200 hover:via-orange-300 hover:to-fuchsia-300"
                >
                  {getShortUrl(url.shortCode)}
                  <ExternalLink className="h-3 w-3 shrink-0 text-amber-400" />
                </a>
                <p className="mt-1 truncate text-sm text-slate-400">
                  {url.title || url.originalUrl}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>{url.clicks} clicks</span>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-0.5',
                      url.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                    )}
                  >
                    {url.isActive ? 'Active' : 'Inactive'}
                  </span>
                  {url.expiresAt && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(url.expiresAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative" onClick={() => handleCopy(url.shortCode)} title="Copy link">
                  <Copy className="h-4 w-4" />
                  {copied === url.shortCode && (
                    <span className="absolute -top-6 right-0 rounded bg-emerald-500 px-1.5 py-0.5 text-[10px] text-white">
                      Copied
                    </span>
                  )}
                </Button>
                <Link
                  to={`/link/${url._id}`}
                  className="inline-flex h-7 items-center gap-1 rounded-lg border border-transparent px-2.5 text-[0.8rem] font-medium text-foreground transition-all hover:bg-muted hover:text-foreground"
                >
                  Details
                </Link>
                <Button variant="ghost" size="icon" className="relative text-red-400" onClick={() => handleDelete(url._id)} title="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DashboardPage

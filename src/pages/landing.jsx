import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { api } from "@/lib/api-client"

const LandingPage = () => {
  const [longurl, setLongUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    if (!longurl) return;

    if (!isAuthenticated) {
      navigate(`/auth?createNew=${longurl}`);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const url = await api.post("/urls", { originalUrl: longurl });
      setShortUrl(`${import.meta.env.VITE_SHORT_URL || import.meta.env.VITE_API_URL || window.location.origin}/${url.shortCode}`);
    } catch (err) {
      setError(err.message || "Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      value: "notifications",
      trigger: "Are shortened URLs permanent?",
      content:
        "Yes, once a URL is shortened, it will remain active unless it is deleted or violates our terms of service. However, we recommend saving your original links for backup.",
    },
    {
      value: "privacy",
      trigger: "Is it safe to use shortened links?",
      content:
        "Yes! You can view analytics such as total clicks, location data, and device types through your dashboard (if analytics feature is enabled)."
    },
    {
      value: "billing",
      trigger: "Is it safe to use shortened links?",
      content:
        "We take security seriously. All links are monitored to prevent spam, phishing, or malicious content. Users should still be cautious and only click links from trusted sources."
    },
  ]

  return (
    <div className="w-full text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">

        {/* search field */}
        <section className="w-full rounded-4xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/70 px-5 py-8 shadow-2xl shadow-black/40 ring-1 ring-amber-400/5 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
            <h1 className="bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              Welcome to the URL Shortner
            </h1>
            <h2 className="text-base font-semibold text-gray-300 sm:text-xl">Paste your URL to get started</h2>
            <div className="w-full rounded-3xl bg-slate-900/90 p-4 shadow-lg shadow-black/20 ring-1 ring-white/10">
              <form onSubmit={handleShortenUrl}>
                <Field orientation="responsive" className="w-full gap-3 sm:flex-row sm:items-center">
                  <Input
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-orange-400 focus:ring-orange-400"
                    type="url"
                    value={longurl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter your URL ..." />
                  <Button className="w-full rounded-xl bg-gradient-to-r from-amber-400 via-orange-400 to-fuchsia-500 px-5 py-3 font-semibold text-gray-950 transition hover:from-amber-300 hover:via-orange-300 hover:to-fuchsia-400 sm:w-auto"
                    variant="ghost"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Shortening..." : "Shorten"}
                  </Button>
                </Field>
              </form>
              {shortUrl && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-center">
                  <p className="text-xs text-emerald-400">Your short link is ready:</p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block break-all font-mono text-sm text-emerald-300 hover:underline"
                  >
                    {shortUrl}
                  </a>
                </div>
              )}
              {error && (
                <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400">
                  {error}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="w-full rounded-4xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/70 px-5 py-8 shadow-2xl shadow-black/40 ring-1 ring-orange-400/5 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center">
            <h2 className="bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
              Why Choose Our URL Shortener?
            </h2>
            <p className="text-sm text-gray-300 sm:text-base">
              Our URL shortener provides a simple and efficient way to create shorter, more manageable links for sharing across various platforms.
            </p>
            <img src="https://picsum.photos/id/180/1200/800" alt="hero" className="h-64 w-full rounded-3xl object-cover shadow-xl shadow-black/20 ring-1 ring-white/10 sm:h-80" />
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full rounded-4xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/70 px-5 py-6 shadow-2xl shadow-black/40 ring-1 ring-fuchsia-400/5 backdrop-blur-xl sm:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="mb-4 bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
              Frequently Asked Questions
            </h2>
            <Accordion multiple className="space-y-2" defaultValue={["notifications"]}>
              {items.map((item) => (
                <AccordionItem key={item.value} value={item.value} className="overflow-hidden px-4 rounded-3xl border border-gray-700 bg-slate-950/80">
                  <AccordionTrigger>{item.trigger}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage



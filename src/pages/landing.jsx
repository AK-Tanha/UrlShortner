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

const LandingPage = () => {
  const [longurl, setLongUrl] = useState("");
  const navigate = useNavigate();
  const handleShortenUrl = (e) => {
    e.preventDefault();
    if (!longurl) return;
    // Navigate to the shortened URL page or perform the shortening logic
    navigate(`/auth?createNew=${longurl}`);
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
    <div className="min-h-screen w-full bg-gray-950 text-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10">

        {/* search field */}
        <section className="w-full rounded-4xl border border-white/10 bg-slate-950/70 px-5 py-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-amber-400 sm:text-4xl">Welcome to the Landing Page</h1>
            <h2 className="text-base font-semibold text-gray-300 sm:text-xl">Paste your URL to get started</h2>
            <div className="w-full rounded-3xl bg-slate-900/90 p-4 shadow-lg shadow-black/20">
              <form onSubmit={handleShortenUrl}>
                <Field orientation="responsive" className="w-full gap-3 sm:flex-row sm:items-center">
                  <Input
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400"
                    type="url"
                    value={longurl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter your URL ..." />
                  <Button className="w-full rounded-xl bg-amber-300 px-5 py-3 text-gray-900 transition hover:bg-amber-400 sm:w-auto"
                    variant="ghost"
                    type="submit"
                  >
                    Search
                  </Button>
                </Field>
              </form>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="w-full rounded-4xl border border-white/10 bg-slate-950/70 px-5 py-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold text-amber-400 sm:text-3xl">Why Choose Our URL Shortener?</h2>
            <p className="text-sm text-gray-300 sm:text-base">
              Our URL shortener provides a simple and efficient way to create shorter, more manageable links for sharing across various platforms.
            </p>
            <img src="https://picsum.photos/id/180/1200/800" alt="hero" className="h-64 w-full rounded-3xl object-cover shadow-xl shadow-black/20 sm:h-80" />
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full rounded-4xl border border-white/10 bg-slate-950/70 px-5 py-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-8">
          <div className="mx-auto w-full max-w-4xl">
            <h2 className="mb-4 text-xl font-bold text-amber-400 sm:text-2xl">Frequently Asked Questions</h2>
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



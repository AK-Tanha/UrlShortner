import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LandingPage = () => {

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
    <div className="flex flex-col items-center justify-top bg-gray-900 text-white">
      <h1 className="text-4xl pt-2 mt-2 font-bold text-amber-400 text-center">Welcome to the Landing Page</h1>
      <h2 className="text-xl font-semibold text-gray-300 text-center">Paste your URL to get started</h2>
      
      {/* URL INPUT */}
      <div className="mt-6 rounded-lg shadow-lg text-center min-w-3xl ">
        <Field orientation="horizontal">
          <Input type="search" placeholder="Enter your URL ..." />
          <Button variant="ghost" className="ml-2 bg-amber-300 text-gray-900 hover:bg-amber-400">
            Search
          </Button>
        </Field>
      </div>

      {/* FAQ Section */}
      <div className="mt-8 px-6 py-2 bg-gray-800 rounded-lg shadow-lg max-w-4xl text-center">
        <Accordion multiple className="min-w-3xl" defaultValue={["notifications"]}>
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value} className="border-b border-gray-700 text-start">
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </div>
  )
}

export default LandingPage

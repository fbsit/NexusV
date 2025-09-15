"use client"

import { useState } from "react"

export default function TabsClient({
  tabs,
  children,
}: {
  tabs: string[]
  children: React.ReactNode[]
}) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto">
        {tabs.map((label, idx) => (
          <button
            key={label}
            onClick={() => setActive(idx)}
            className={`px-5 py-2.5 rounded-full border text-base whitespace-nowrap font-medium ${
              active === idx
                ? "bg-ui-bg-base border-ui-border-strong text-ui-fg-base"
                : "bg-transparent border-ui-border text-ui-fg-subtle"
            }`}
            aria-pressed={active === idx}
          >
            {label}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </div>
  )
}



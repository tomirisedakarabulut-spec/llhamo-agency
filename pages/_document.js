import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return React.createElement(Html, { lang: "tr", className: "scroll-smooth" },
    React.createElement(Head, {},
      React.createElement("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      React.createElement("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      React.createElement("link", {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
        rel: "stylesheet"
      }),
      React.createElement("link", { rel: "icon", href: "/logo-mandala.svg", type: "image/svg+xml" }),
      React.createElement("link", { rel: "shortcut icon", href: "/logo-mandala.svg", type: "image/svg+xml" }),
      React.createElement("link", { rel: "apple-touch-icon", href: "/logo-mandala.svg" }),
      React.createElement("link", { rel: "manifest", href: "/manifest.json" }),
      React.createElement("meta", { name: "theme-color", content: "#FDE047" }),
      React.createElement("meta", { name: "apple-mobile-web-app-capable", content: "yes" }),
      React.createElement("meta", { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" }),
      React.createElement("meta", { name: "apple-mobile-web-app-title", content: "LHAMO" }),
      React.createElement("meta", { name: "mobile-web-app-capable", content: "yes" }),
      React.createElement("meta", { name: "application-name", content: "LHAMO" }),
      React.createElement("link", { rel: "preload", href: "/logo-mandala.svg", as: "image" }),
      React.createElement("meta", { name: "robots", content: "index,follow" }),
      React.createElement("meta", { name: "author", content: "LHAMO Agency" }),
      React.createElement("meta", { name: "generator", content: "Next.js" })
    ),
    React.createElement("body", { className: "antialiased" },
      React.createElement(Main),
      React.createElement(NextScript)
    )
  )
}
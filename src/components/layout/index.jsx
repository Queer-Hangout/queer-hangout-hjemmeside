import React from "react"
import { MDXProvider } from "@mdx-js/react"
import { Link } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import CookieConsent from "../cookieConsent"

const shortcodes = { Link }

export default function Layout({ children }) {
  return (
    <div className="min-h-screen h-full w-full flex flex-col justify-between bg-slate-400">
      <CookieConsent />
      <Header />

      <MDXProvider components={shortcodes}>
        <main className="prose bg-white flex flex-grow max-w-4xl w-4xl mx-auto box-border p-8 sm:p-12 md:p-20">
          {children}
        </main>
      </MDXProvider>

      <Footer />
    </div>
  )
}

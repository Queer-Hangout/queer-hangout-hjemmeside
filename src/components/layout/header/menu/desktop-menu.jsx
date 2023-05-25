import { Link } from "gatsby"
import React from "react"

export default function DesktopMenu({ pages }) {
  return (
    <div className="hidden md:flex">
      {pages.map(page => (
        <Link
          className="my-auto ml-8 hover:underline"
          key={page.slug}
          to={page.slug}
        >
          {page.title}
        </Link>
      ))}
    </div>
  )
}

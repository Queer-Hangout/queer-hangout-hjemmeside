import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const LogoImage = () => (
  <StaticImage
    className="sm:h-16 sm:w-16 h-12 w-12 rounded-full my-auto"
    src="../../../../content/images/qh-logo.png"
    alt="blablabla"
  />
)

export default function HeaderLogo() {
  return (
    <Link className="flex flex-row" to="/">
      <LogoImage />
      <span className="my-auto mx-5 text-white sm:text-2xl text-xl">
        Queer Hangout
      </span>
    </Link>
  )
}

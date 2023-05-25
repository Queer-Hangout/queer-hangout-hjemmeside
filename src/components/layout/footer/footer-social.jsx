import React from "react"
import { FaFacebook, FaInstagram } from "react-icons/fa"

const socials = [
  {
    href: "https://facebook.com/queerhangout",
    icon: <FaFacebook size="1.8em" />,
    label: "Facebook",
  },
  {
    href: "https://instagram.com/queerhangout_drammen",
    icon: <FaInstagram size="1.8em" />,
    label: "Instagram",
  },
]

export default function FooterSocial() {
  let i = 0
  return (
    <div className="flex flex-row justify-center">
      {socials.map(item => {
        return (
          <a
            key={i++}
            href={item.href}
            className="m-2"
            rel="nofollow noreferrer"
            target="_blank"
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
          </a>
        )
      })}
    </div>
  )
}

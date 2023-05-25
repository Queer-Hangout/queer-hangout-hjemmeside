import React from "react"
import FooterSocial from "./footer-social"

const email = "blablabla@gmail.com"

export default function Footer() {
  let i = 0
  return (
    <footer className="bg-slate-800 text-center text-white p-8">
      <FooterSocial />
      {[
        [
          "E-post: ",
          <a key={i++} href={`mailto:${email}`}>
            {email}
          </a>,
        ],
        "Vipps: 123456",
        "Kontonr: 12345678910",
        "Org.nr. 123456789",
        "Webansvarlig: Levi Sørum",
        "Queer Hangout i Drammen © 2023",
      ].map(item => (
        <p key={i++} className="my-3">
          {item}
        </p>
      ))}
    </footer>
  )
}

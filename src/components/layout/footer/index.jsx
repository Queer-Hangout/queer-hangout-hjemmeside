import React from "react"
import FooterSocial from "./footer-social"

const email = "queerhangout@posteo.no"

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
        "Vipps: 818416",
        "Kontonr: 1506.92.76013",
        "Org.nr. 931581686",
        "Webansvarlig: Levi Sørum",
        "Queer Hangout © 2023",
      ].map(item => (
        <p key={i++} className="my-3">
          {item}
        </p>
      ))}
    </footer>
  )
}

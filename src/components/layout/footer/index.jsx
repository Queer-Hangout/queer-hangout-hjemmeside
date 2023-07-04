import React from "react"
import FooterSocial from "./footer-social"
import FooterLink from "./footer-link"

const email = "queerhangout@posteo.no"

export default function Footer() {
  let i = 0
  return (
    <footer className="bg-slate-800 text-center text-white p-8">
      <FooterSocial />
      {[
        [
          "E-post: ",
          <FooterLink key={i++} href={`mailto:${email}`}>
            {email}
          </FooterLink>,
        ],
        "Vipps: 818416",
        "Kontonr: 1506.92.76013",
        "Org.nr. 931 581 686",
        "Webansvarlig: Levi Sørum",
        "Queer Hangout © 2023",
        [
          <FooterLink key={i++} href="/personvern">
            Personvernerklæring
          </FooterLink>,
        ],
      ].map(item => (
        <p key={i++} className="my-3">
          {item}
        </p>
      ))}
    </footer>
  )
}

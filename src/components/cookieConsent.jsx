import React from "react"
import ReactCookieConsent from "react-cookie-consent"
import { Link } from "gatsby"

export default function CookieConsent() {
  return (
    <ReactCookieConsent
      location="bottom"
      buttonText="Godta"
      declineButtonText="Avvis"
      cookieName="gatsby-gdpr-google-analytics"
    >
      <p>
        Dette nettstedet bruker Google Analytics 4 for å samle inn anonymiserte
        bruksdata. Ved å klikke på "Godta"-knappen samtykker du til bruk av
        informasjonskapsler og datainnsamling. For mer informasjon, vennligst
        les vår{" "}
        <Link
          to="/personvern"
          style={{
            fontWeight: 500,
            color: "#e9c7ff",
            textDecoration: "underline",
          }}
        >
          personvernerklæring
        </Link>
        .
      </p>
    </ReactCookieConsent>
  )
}

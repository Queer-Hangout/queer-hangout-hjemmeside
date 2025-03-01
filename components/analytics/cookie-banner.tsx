"use client";

import { Language } from "@/types/language";
import Link from "next/link";
import { Button, ButtonProps } from "react-aria-components";
import { analytics } from "@/config/settings";

const linkClass =
  "text-sm text-blue-300 font-light no-underline hover:underline";

type CookieBannerProps = {
  language: Language;
  onResponse: (e: boolean) => void;
};

export default function CookieBanner(props: CookieBannerProps) {
  const { language, onResponse } = props;
  return (
    <section
      className="px-4 sm:px-8 py-8 sm:py-12 gap-8 fixed flex flex-col w-screen bottom-0 left-0 right-0 bg-zinc-800 text-white z-50"
      aria-labelledby="cookie_heading"
    >
      <h2
        className="text-center sm:text-left font-light text-xl leading-8"
        id="cookie_heading"
      >
        {
          {
            no: "Informasjonskapsler",
            en: "Cookie consent",
          }[language]
        }
      </h2>
      <div>
        <p className="text-sm leading-8 text-center sm:text-left">
          {
            {
              no: "Vi bruker informasjonskapsler for å samle anonymiserte data ved bruk av ",
              en: "We use cookies to collect anonymous analytics data using ",
            }[language]
          }
          <GaLink />
          {
            {
              no: " . For mer informasjon, se vår ",
              en: ". For more information, see our ",
            }[language]
          }
          <Link
            className={linkClass}
            href={analytics.privacyPolicySlug[language]}
          >
            {
              {
                no: "personvernserklæring",
                en: "privacy policy",
              }[language]
            }
            .
          </Link>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <CookieButton
          onPress={() => onResponse(true)}
          aria-label={
            {
              no: "Godta alle",
              en: "Accept all",
            }[language]
          }
          isAccept={true}
        >
          {
            {
              no: "Godta alle",
              en: "Accept all",
            }[language]
          }
        </CookieButton>
        <CookieButton
          onPress={() => onResponse(false)}
          aria-label={
            {
              no: "Kun nødvendige",
              en: "Required only",
            }[language]
          }
          isAccept={false}
        >
          {
            {
              no: "Kun nødvendige",
              en: "Required only",
            }[language]
          }
        </CookieButton>
      </div>
    </section>
  );
}

function CookieButton(props: ButtonProps & { isAccept: boolean }) {
  const { isAccept, ...buttonProps } = props;
  return (
    <Button
      {...buttonProps}
      className={`${buttonProps.className} ${
        isAccept
          ? "bg-blue-300 hover:bg-blue-200 text-black font-normal rounded py-4 px-8"
          : ""
      } text-sm border-none outline-none`}
    />
  );
}

const GaLink = () => (
  <a
    href="https://developers.google.com/analytics/devguides/collection/ga4"
    rel="nofollow"
    target="_blank"
    className={linkClass}
  >
    Google Analytics 4
  </a>
);

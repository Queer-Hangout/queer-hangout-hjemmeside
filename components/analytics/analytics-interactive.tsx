"use client";
import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { Language } from "@/types/language";
import CookieBanner from "./cookie-banner";
import { setCookie } from "cookies-next";
import { deleteGACookies } from "@/app/actions/ga-cookies";

type AnalyticsProps = {
  language: Language;
  initialConsent?: boolean;
  initialDeleteCookies?: boolean;
  consentCookieName: string;
};

export default function AnalyticsInteractive(props: AnalyticsProps) {
  const [consent, setConsent] = useState<boolean | undefined>(
    props.initialConsent
  );

  useEffect(() => {
    if (props.initialDeleteCookies === true)
      deleteGACookies(props.consentCookieName);
  }, [props.initialDeleteCookies]);

  function onResponse(response: boolean) {
    setCookie(props.consentCookieName, response ? "true" : "false", {
      maxAge: response ? 28 * 24 * 60 * 60 : undefined, // 28 days, in seconds
    });
    setConsent(response);
    if (!response) deleteGACookies(props.consentCookieName);
  }

  return consent === true ? (
    <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
  ) : consent === false ? null : (
    <CookieBanner language={props.language} onResponse={onResponse} />
  );
}

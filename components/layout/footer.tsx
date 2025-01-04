import { Language } from "@/types/language";
import { footer as footerConfig } from "@/config/settings";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function Footer({ language }: { language: Language }) {
  return (
    <footer className="flex text-white bg-slate-800 py-12 px-3 sm:px-6 text-sm text-center w-full">
      <div className="flex flex-col sm:flex-row justify-between w-full max-w-[1024px] mx-auto gap-y-4">
        <div className="flex flex-col gap-4">
          <p>
            <b>Queer Hangout © 2025</b>
          </p>
          <p>{`${{ no: "Webansvarlig: ", en: "Webmaster: " }[language]} ${
            footerConfig.webmaster
          }`}</p>
          <p>
            <Link
              href={
                { no: "/no/personvern", en: "/en/privacy-policy" }[language]
              }
            >
              {{ no: "Personvern", en: "Privacy policy" }[language]}
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p>{`Vipps ${footerConfig.vipps}`}</p>
          <p>{`Org.nr. ${footerConfig.orgNumber}`}</p>
          <p>{`${
            {
              no: "Kontonr.",
              en: "Acc.nr.",
            }[language]
          } ${footerConfig.accountNumber}`}</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <p>
            <a href={`mailto:${footerConfig.email}`}>{footerConfig.email}</a>
          </p>
          {footerConfig.facebook || footerConfig.instagram ? (
            <div className="flex flex-row gap-6">
              {footerConfig.facebook ? (
                <a aria-label="Facebook" href={footerConfig.facebook}>
                  <FacebookIcon />
                </a>
              ) : null}
              {footerConfig.instagram ? (
                <a aria-label="Instagram" href={footerConfig.instagram}>
                  <InstagramIcon />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}

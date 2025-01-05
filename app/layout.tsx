import { Metadata, Viewport } from "next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: "%s | Queer Hangout",
      default: "Queer Hangout",
    },
    metadataBase: new URL("https://queerhangout.no"),
    alternates: {
      canonical: "/",
      languages: {
        no: "/no",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      url: "https://queerhangout.no",
      siteName: "Queer Hangout",
      images: "/Logo_QH.svg",
    },
    icons: {
      icon: "/Logo_QH.svg",
      shortcut: "/Logo_QH.svg",
      apple: "/Logo_QH.svg",
    },
    facebook: {
      appId: "queerhangout",
    },
    twitter: {
      card: "summary_large_image",
      images: {
        url: "https://queerhangout.no/Logo_QH.svg",
        alt: "Queer Hangout logo",
      },
    },
    applicationName: "Queer Hangout",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    creator: "Levi Sørum",
    publisher: "Levi Sørum",
    verification: {
      google: "google",
      yahoo: "yahoo",
      yandex: "yandex",
    },
  };
}

export const viewport: Viewport = {
  colorScheme: "only light",
};

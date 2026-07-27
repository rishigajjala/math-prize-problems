import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "./lib/problem-format";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prize Problem Ledger (PPL)",
    template: "%s — Prize Problem Ledger",
  },
  description:
    "The Prize Problem Ledger: a source-linked library of rewarded open mathematics with a permanent PPL number for every target.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  icons: {
    icon: `${SITE_URL}/favicon.png`,
    shortcut: `${SITE_URL}/favicon.png`,
  },
  openGraph: {
    type: "website",
    title: "Prize Problem Ledger (PPL)",
    description:
      "177 open mathematical targets with cash rewards, primary sources and permanent PPL numbers.",
    url: `${SITE_URL}/`,
    siteName: "Prize Problem Ledger",
    images: [
      {
        url: `${SITE_URL}/og-ppl.png`,
        width: 1200,
        height: 630,
        alt: "Prize Problem Ledger — PPL 017 and 177 open mathematical targets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prize Problem Ledger (PPL)",
    description:
      "177 open mathematical targets with cash rewards, primary sources and permanent PPL numbers.",
    images: [`${SITE_URL}/og-ppl.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

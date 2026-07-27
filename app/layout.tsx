import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "./lib/problem-format";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prize Problems — The Open Ledger",
    template: "%s — Prize Problems",
  },
  description:
    "A source-linked library of open mathematical problems with documented cash rewards, with one permanent page for every target.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    title: "Prize Problems — The Open Ledger",
    description:
      "177 open mathematical targets with cash rewards, primary sources and permanent problem pages.",
    url: "/",
    siteName: "Prize Problems",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Prize Problems — 177 open targets, cash rewards and primary sources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prize Problems — The Open Ledger",
    description:
      "177 open mathematical targets with cash rewards, primary sources and permanent problem pages.",
    images: ["/og.png"],
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

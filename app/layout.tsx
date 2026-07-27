import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prize Problems — The Open Ledger",
  description:
    "A searchable, source-linked catalog of open mathematical problems with documented prize rewards.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
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

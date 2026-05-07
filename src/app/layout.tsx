import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Naming Ceremony Invitation | Chavhan Family 🌸",
  description:
    "You are cordially invited to the naming ceremony of our little princess. Join us in celebrating this joyous occasion on 10 May 2026 at Prime Restaurant, Ahmedabad.",
  keywords: [
    "naming ceremony",
    "baby girl",
    "invitation",
    "Chavhan family",
    "celebration",
  ],
  openGraph: {
    title: "Naming Ceremony Invitation 🌸",
    description:
      "Join us in celebrating the naming ceremony of our little princess on 10 May 2026.",
    type: "website",
    images: ["/baby-girl.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naming Ceremony Invitation 🌸",
    description:
      "Join us in celebrating the naming ceremony of our little princess on 10 May 2026.",
    images: ["/baby-girl.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#fff0f5" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body suppressHydrationWarning style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}

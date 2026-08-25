import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DokoSoko — Make your product one prompt away",
  description:
    "Publish one versioned connector with exact product knowledge, compatible package metadata, and policy-bound setup actions for coding agents.",
  icons: { icon: "./favicon.svg" },
  openGraph: {
    title: "DokoSoko — Make your product one prompt away",
    description:
      "One versioned connector from developer intent to exact guidance, policy-bound setup, and a verifiable integration outcome.",
    type: "website",
    images: [
      {
        url: "og.png",
        width: 1200,
        height: 630,
        alt: "DokoSoko — Make your product one prompt away.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DokoSoko — Make your product one prompt away",
    description: "One versioned connector from developer intent to exact guidance, policy-bound setup, and a verifiable integration outcome.",
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

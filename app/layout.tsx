import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "DokoSoko — Make your product one prompt away",
  description:
    "Give coding agents the exact docs, reviewed recipes, package releases, scoped setup tools, and credentials needed to integrate your product through one versioned MCP connection.",
  icons: { icon: "./favicon.svg" },
  openGraph: {
    title: "DokoSoko — Make your product one prompt away",
    description:
      "The integration layer that takes coding agents from developer intent to a working, validated integration.",
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
    description: "From developer intent to a working integration through one versioned MCP connection.",
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

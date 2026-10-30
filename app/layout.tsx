import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// Canonical host is pending VLS approval (docs/APPROVALS.md). Set NEXT_PUBLIC_SITE_URL when known.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Constitutional Law & Practice Boot Camp | VLS Law Academy",
  description:
    "A focused boot camp on constitutional remedies, writ proceedings, appellate jurisdiction and petition procedures before the Supreme Court and High Courts. Enquire with VLS Law Academy, Chennai.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Constitutional Law & Practice Boot Camp | VLS Law Academy",
    description:
      "Understand the Constitution. Learn the Remedies. Explore Court Practice.",
    type: "website",
    siteName: "VLS Law Academy",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}

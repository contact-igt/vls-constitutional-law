import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { indexable, siteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const serif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Constitutional Law & Practice Boot Camp | VLS Law Academy",
  description:
    "A focused boot camp on constitutional remedies, writ proceedings, appellate jurisdiction and petition procedures before the Supreme Court and High Courts. Enquire with VLS Law Academy, Chennai.",
  alternates: { canonical: "/" },
  robots: indexable ? undefined : { index: false, follow: false },
  openGraph: {
    title: "Constitutional Law & Practice Boot Camp | VLS Law Academy",
    description:
      "Understand the Constitution. Learn the Remedies. Explore Court Practice.",
    type: "website",
    url: "/",
    siteName: "VLS Law Academy",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Constitutional Law & Practice Boot Camp | VLS Law Academy",
    description: "Understand the Constitution. Learn the Remedies. Explore Court Practice.",
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
      <body>
        {children}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

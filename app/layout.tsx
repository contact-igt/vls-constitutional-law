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
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1320569916265124');
          fbq('track', 'PageView');
        `}</Script>
        <noscript>
          {/* Meta requires this tracking pixel to be a plain image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1320569916265124&ev=PageView&noscript=1" alt="" />
        </noscript>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

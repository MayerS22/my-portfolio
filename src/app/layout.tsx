import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mayer Frieg - Full Stack Developer",
  description: "Professional full-stack developer specializing in modern web technologies. Creating exceptional digital experiences with React, Next.js, Node.js, and more.",
  keywords: "full stack developer, web developer, react, nextjs, typescript, nodejs, portfolio, mayer frieg",
  authors: [{ name: "Mayer Frieg" }],
  creator: "Mayer Frieg",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mayerfrieg.dev",
    title: "Mayer Frieg - Full Stack Developer",
    description: "Professional full-stack developer specializing in modern web technologies.",
    siteName: "Mayer Frieg Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayer Frieg - Full Stack Developer",
    description: "Professional full-stack developer specializing in modern web technologies.",
    creator: "@mayerfrieg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

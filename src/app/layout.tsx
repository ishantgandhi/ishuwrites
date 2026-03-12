import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ishu.writes",
  description: "Ishu's Gallery",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  metadataBase: new URL("https://ishuwrites.com"),
  openGraph: {
    title: "ishu.writes",
    description: "Ishu's Gallery",
    url: "https://ishuwrites.com",
    siteName: "ishu.writes",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "ishu.writes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ishu.writes",
    description: "Ishu's Gallery",
    images: ["/banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}


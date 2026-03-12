import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ishu.iso",
  description: "Ishu's Gallery",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  metadataBase: new URL('https://ishuiso.com'),
  openGraph: {
    title: "ishu.iso",
    description: "Ishu's Gallery",
    url: 'https://ishuiso.com',
    siteName: 'ishu.iso',
    images: [
      {
        url: '/banner.png',
        width: 1200,
        height: 630,
        alt: 'ishu.iso',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ishu.iso",
    description: "Ishu's Gallery",
    images: ['/banner.png'],
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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}


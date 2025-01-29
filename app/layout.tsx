import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display'
});
const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  title: 'Plant Scanner - Identify Plants Instantly',
  description: 'Upload a photo of any plant and get instant identification with detailed care instructions using AI.',
  keywords: ['plant identification', 'plant scanner', 'plant care', 'garden helper', 'plant species', 'AI plant identification'],
  authors: [{ name: 'Plant Scanner Team' }],
  openGraph: {
    title: 'Plant Scanner - Your AI Plant Identification Assistant',
    description: 'Instantly identify plants and get detailed care instructions with our AI-powered plant scanner.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plant Scanner',
    description: 'AI-powered plant identification and care guide',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${lora.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

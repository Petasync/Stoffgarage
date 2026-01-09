import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "Stoffgarage - Premium Autoabdeckungen | 3D Konfigurator",
  description: "Hochwertige Autoabdeckungen mit 3D-Konfigurator und 360° Ansicht. Klassisch, Praktisch, Premium, Exclusiv. Wasserdicht, UV-beständig, perfekte Passform.",
  keywords: "Autoabdeckung, PKW Abdeckung, Hagelschutz, Premium Autoabdeckung, Carport Abdeckung, Ganzjahresschutz",
  authors: [{ name: "Stoffgarage" }],
  creator: "Stoffgarage",
  publisher: "Stoffgarage",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://stoffgarage.de'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://stoffgarage.de',
    siteName: 'Stoffgarage',
    title: 'Stoffgarage - Premium Autoabdeckungen',
    description: 'Hochwertige Autoabdeckungen mit 3D-Konfigurator. Perfekter Schutz für Ihr Fahrzeug.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stoffgarage Premium Autoabdeckungen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stoffgarage - Premium Autoabdeckungen',
    description: 'Hochwertige Autoabdeckungen mit 3D-Konfigurator',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

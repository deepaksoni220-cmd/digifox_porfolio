import type { Metadata } from 'next';
import './736463740f297660.css';
import './blacklane-custom.css';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'bookcabs aus | Premium Chauffeur Service Australia',
  description: 'Professional luxury chauffeur driven car service in Melbourne and Australia by bookcabs aus. Arrive at your best.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div id="__next">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

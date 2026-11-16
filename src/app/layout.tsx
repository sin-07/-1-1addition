import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy 17th Birthday, Akankshya Mishra! ❤️✨",
  description: "A cinematic, magical birthday gift website created with love for Akankshya Mishra.",
  keywords: ["Akankshya Mishra", "Birthday Surprise", "17th Birthday", "Celebration", "Special Day"],
  authors: [{ name: "With Love" }],
  openGraph: {
    title: "Happy 17th Birthday, Akankshya Mishra! ❤️",
    description: "Someone extraordinary has a birthday today. Open your gift!",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060713",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#060713] text-slate-100 min-h-screen overflow-x-hidden relative selection:bg-pink-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

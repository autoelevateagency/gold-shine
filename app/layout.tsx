import type { Metadata, Viewport } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import { getDictionary } from "@/data/dictionary";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const dictionary = getDictionary("EN");

export const metadata: Metadata = {
  title: dictionary.meta.title,
  description: dictionary.meta.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">): React.ReactElement {
  return (
    <html lang="en" className={`${bodoni.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}

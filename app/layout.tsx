import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/content/profile";
import "./globals.css";

const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const title = `${profile.name} — ${profile.role}`;
const description =
  "Senior Software Engineer and full-stack developer: React, Angular, Node.js, AWS and AI-driven engineering. Experience, projects and contact.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title,
  description,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

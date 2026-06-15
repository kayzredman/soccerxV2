import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";
import { SiteHeader } from "@/components/navigation/site-header";
import { Footer } from "@/components/navigation/footer";

export const metadata: Metadata = {
  title: "SoccerX | World Cup 2026 Predictions",
  description: "A motion-first social football prediction game for FIFA World Cup 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <body className="min-h-screen flex flex-col">
          <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-surface" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-brand-500/[0.04] blur-[120px]" />
            <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-500/[0.04] blur-[100px]" />
          </div>
          <SiteHeader />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

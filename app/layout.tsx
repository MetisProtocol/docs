import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { createMetadata, baseUrl } from "@/lib/metadata";
import { AskCookbook } from "@/components/AskCookbook";
import { Banner } from "fumadocs-ui/components/banner";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = createMetadata({
  title: {
    template: "%s | Metis Docs",
    default: "Metis Docs",
  },
  description: "The documentation for Metis L2",
  metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{
            defaultTheme: "dark",
          }}
        >
          <Banner>Metis Hyperion supports the Ethereum Pectra fork</Banner>
          {children}
          <AskCookbook />
        </RootProvider>
      </body>
    </html>
  );
}

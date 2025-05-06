import "../global.css";
import "katex/dist/katex.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Banner } from "fumadocs-ui/components/banner";
import { AskCookbook } from "@/components/AskCookbook";
import { baseUrl } from "@/lib/metadata";
import { createMetadata } from "@/lib/metadata";

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
          <Banner>
            Metis Hyperion supports Ethereum Pectra fork
          </Banner>

          <DocsLayout tree={source.pageTree} {...baseOptions}>
            {children}
          </DocsLayout>

          <AskCookbook />
        </RootProvider>
      </body>
    </html>
  );
}

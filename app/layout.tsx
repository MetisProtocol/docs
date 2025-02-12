import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "katex/dist/katex.css";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Banner } from "fumadocs-ui/components/banner";
import { AskCookbook } from "@/components/AskCookbook";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          theme={{
            enabled: true,
            forcedTheme: "dark",
          }}
        >
          <Banner>
            Metis supports Berlin + PUSH0 of Shanghai (Solidity v0.8.23 and
            lower)
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

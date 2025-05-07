import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "Metis Docs",
    url: "/",
  },
  githubUrl: "https://github.com/MetisProtocol/docs",
  links: [
    {
      type: "menu",
      text: "Explorers",
      items: [
        {
          text: "Andromeda",
          url: "https://explorer.metis.io",
        },
        {
          text: "Sepolia",
          url: "https://sepolia-explorer.metisdevops.link",
        },
        {
          text: "Hyperion Testnet",
          url: "https://hyperion-testnet-explorer.metisdevops.link",
        },
      ],
    },
    {
      type: "menu",
      text: "Developer Channels",
      items: [
        {
          text: "Telegram",
          url: "https://t.me/metis_dev",
        },
        {
          text: "Twitter",
          url: "https://x.com/metisdevs",
        },
        {
          text: "YouTube",
          url: "https://www.youtube.com/playlist?list=PLpYi1DzeXBB9dzWw3xk4UMbUHWlRs-i9s",
        },
      ],
    },
    {
      type: "menu",
      text: "Faucets",
      items: [
        {
          text: "Hyperion Faucet",
          url: "https://hype-faucet.metis.io/",
        },
        {
          text: "Metis Sepolia Faucet",
          url: "https://faucet.metis.io/",
        },
      ],
    },
  ],
};

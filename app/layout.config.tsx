import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Droplet } from "lucide-react";

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
    url: "/docs",
    enableSearch: true,
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
      ],
    },
    {
      type: "menu",
      text: "Help Centers",
      items: [
        {
          text: "Discord",
          url: "https://discord.gg/metis",
        },
        {
          text: "Telegram",
          url: "https://t.me/metis_dev",
        },
      ],
    },
    {
      icon: <Droplet />,
      text: "Faucet",
      url: "https://faucet.metis.io/",
    },
  ],
};

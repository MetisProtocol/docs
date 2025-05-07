import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // webpack: (config) => {
  //   // Handle native binary modules
  //   config.module.rules.push({
  //     test: /\.node$/,
  //     use: "node-loader",
  //   });

  //   return config;
  // },
};

export default withMDX(config);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Exclude binary modules from client-side bundles
    config.module = {
      ...config.module,
      exprContextCritical: false,
      rules: [
        ...config.module.rules,
        {
          test: /\.node$/,
          use: "node-loader",
        },
      ],
    };
    return config;
  },
  // Add this if you're using MDX
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

module.exports = nextConfig;

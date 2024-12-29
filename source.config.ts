import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const { docs, meta } = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    // Place it at first so that it won't be changed by syntax highlighter
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});

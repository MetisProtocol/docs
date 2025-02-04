// app/[[...slug]]/page.tsx
import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Web3Provider from "@/components/providers/Web3Provider";
import { ApolloProvider } from "@/components/providers/ApolloProvider";
import type { MDXComponents } from "mdx/types";

// Define which paths should include the Web3Provider
const WEB3_ENABLED_PATHS = ["demo"];

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

const mdxComponents = {
  ...defaultMdxComponents,
} as MDXComponents;

export default async function Page(props: PageProps) {
  const { slug = [] } = await props.params;

  // Check if the current path should have Web3Provider
  const shouldEnableWeb3 = slug[2] && WEB3_ENABLED_PATHS.includes(slug[2]);

  // Get the page data
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const Content = (
    <DocsBody>
      <MDX components={mdxComponents} />
    </DocsBody>
  );

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {shouldEnableWeb3 ? (
        <ApolloProvider>
          <Web3Provider>{Content}</Web3Provider>
        </ApolloProvider>
      ) : (
        Content
      )}
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

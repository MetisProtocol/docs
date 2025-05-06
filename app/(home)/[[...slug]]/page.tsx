import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound, redirect } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import Web3Provider from "@/components/rainbowkit/Provider";
import { ApolloProvider } from "@/components/ApolloProvider";
import type { MDXComponents } from "mdx/types";
import { ThirdwebProvider } from "thirdweb/react";
import { metadataImage } from "@/lib/metadata-image";
import { createMetadata } from "@/lib/metadata";
import { Metadata } from "next/types";

// Define which paths should include the Web3Provider
const WEB3_ENABLED_PATHS = ["demo"];
const THIRDWEB_ENABLED_PATHS = ["thirdweb"];

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

const mdxComponents = {
  ...defaultMdxComponents,
} as MDXComponents;

export default async function Page(props: PageProps) {
  const { slug = [] } = await props.params;

  // Redirect / to /hyperion
  if (slug.length === 0) {
    redirect("/hyperion");
  }

  // Check if the current path should have Web3Provider
  const shouldEnableWeb3 = slug[3] && WEB3_ENABLED_PATHS.includes(slug[3]);
  const isThirdWeb = slug[4] && THIRDWEB_ENABLED_PATHS.includes(slug[4]);

  // Get the page data
  const page = source.getPage(slug);
  if (!page) notFound();

  const path = `content/docs/${page.file.path}`;

  const MDX = page.data.body;

  const Content = (
    <DocsBody>
      <MDX components={mdxComponents} />
    </DocsBody>
  );

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      editOnGithub={{
        owner: "MetisProtocol",
        repo: "docs",
        sha: "main",
        path,
      }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {shouldEnableWeb3 ? (
        <ApolloProvider>
          {isThirdWeb ? (
            <ThirdwebProvider>{Content}</ThirdwebProvider>
          ) : (
            <Web3Provider>{Content}</Web3Provider>
          )}
        </ApolloProvider>
      ) : (
        Content
      )}
    </DocsPage>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const description = page.data.description;

  return createMetadata(
    metadataImage.withImage(page.slugs, {
      title: page.data.title,
      description,
      openGraph: {
        url: `/${page.slugs.join("/")}`,
      },
    })
  );
}

export function generateStaticParams(): { slug: string[] }[] {
  return source.generateParams();
}

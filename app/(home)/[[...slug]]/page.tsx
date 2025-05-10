import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound, redirect } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import MetisSepoliaProvider from "@/components/rainbowkit/MetisSepoliaProvider";
import HyperionProvider from "@/components/rainbowkit/HyperionProvider";
import { ApolloProvider } from "@/components/ApolloProvider";
import type { MDXComponents } from "mdx/types";
import { ThirdwebProvider } from "thirdweb/react";
import { metadataImage } from "@/lib/metadata-image";
import { createMetadata } from "@/lib/metadata";
import { Metadata } from "next/types";

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
  const shouldEnableWeb3Hyperion = slug[0] === "hyperion";
  const shouldEnableWeb3Andromeda = slug[3] === "demo";
  const isThirdWeb = slug[4] === "thirdweb";

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
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {shouldEnableWeb3Andromeda ? (
        <ApolloProvider>
          {isThirdWeb ? (
            <ThirdwebProvider>{Content}</ThirdwebProvider>
          ) : (
            <MetisSepoliaProvider>{Content}</MetisSepoliaProvider>
          )}
        </ApolloProvider>
      ) : shouldEnableWeb3Hyperion ? (
        <HyperionProvider>{Content}</HyperionProvider>
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

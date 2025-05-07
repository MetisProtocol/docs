"use client";

import BaseAskCookbook from "@cookbookdev/docsbot/react";

/**
 * NOTE: For the DocsBot widget to work correctly, your layout should include:
 *   <div id="docsbot-portal-root"></div>
 * or the anchor element required by the library. See @cookbookdev/docsbot/react docs.
 */

export function AskCookbook() {
  const apiKey = process.env.NEXT_PUBLIC_COOKBOOK_API_KEY || "";

  if (!apiKey) {
    // Optionally, show nothing or a warning in dev
    if (process.env.NODE_ENV !== "production") {
      return <div style={{color: 'red'}}>Cookbook API key is missing.</div>;
    }
    return null;
  }

  return (
    <BaseAskCookbook apiKey={apiKey} />
  );
}


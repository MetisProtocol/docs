"use client";

import BaseAskCookbook from "@cookbookdev/docsbot/react";

export function AskCookbook() {
  return (
    <BaseAskCookbook apiKey={process.env.NEXT_PUBLIC_COOKBOOK_API_KEY || ""} />
  );
}

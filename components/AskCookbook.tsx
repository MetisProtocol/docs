"use client";

import BaseAskCookbook from "@cookbookdev/docsbot/react";

const COOKBOOK_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjA2MTA3NjVhYjBkODdjYTY1OGZkY2QiLCJpYXQiOjE3MTE2NzM0NjIsImV4cCI6MjAyNzI0OTQ2Mn0.3CzsGiIGVlyEFchI5M4YRWVMeobp3DBixKXjD5HWscE"; // It's a public key, so it's safe to expose it here

export function AskCookbook() {
  return <BaseAskCookbook apiKey={COOKBOOK_API_KEY} />;
}

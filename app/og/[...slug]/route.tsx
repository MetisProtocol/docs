import { metadataImage } from "@/lib/metadata-image";
import { ImageResponse } from "next/og";
import { generateOGImage } from "./og";
import { readFileSync } from "fs";

const font = readFileSync("./app/og/[...slug]/Raleway-Regular.ttf");
const fontBold = readFileSync("./app/og/[...slug]/Raleway-Bold.ttf");

export const GET = metadataImage.createAPI((page): ImageResponse => {
  return generateOGImage({
    primaryTextColor: "rgb(240,240,240)",
    title: page.data.title,
    description: page.data.description,
    fonts: [
      {
        name: "Raleway",
        data: font,
        weight: 400,
      },
      {
        name: "Raleway",
        data: fontBold,
        weight: 600,
      },
    ],
  });
});
export function generateStaticParams() {
  return metadataImage.generateParams();
}

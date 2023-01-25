import { ImageResponse } from "@vercel/og";
import { NextApiRequest } from "next";

const fonts = fetch(
  new URL("../../assets/fonts/Inter-Black.ttf", import.meta.url)
).then(async (res) => res.arrayBuffer());

export default async function handler(req: NextApiRequest) {
  const fontData = await fonts;

  const { searchParams } = new URL(req.url!);
  const dark = searchParams.get("dark") === "true";
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  if (!title) return new Response("Invalid query", { status: 400 });

  return new ImageResponse(
    (
      <body
        style={{
          color: dark ? "white" : "black",
          backgroundColor: dark ? "black" : "white",
        }}
        tw="h-full w-full"
      >
        <div
          style={{
            paddingLeft: "8%",
            paddingRight: "3%",
          }}
          tw="flex h-full flex-col justify-center"
        >
          <h1 tw="font-bold text-8xl opacity-90 leading-tight">{title}</h1>

          {description && (
            <h2 tw="ml-1 mt-2.5 font-medium text-2xl opacity-50 leading-none">
              {description}
            </h2>
          )}
        </div>
      </body>
    ),
    {
      width: 2048,
      height: 1170,
      statusText: "OK",
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
      fonts: [{ name: "Inter", data: fontData, style: "normal" }],
    }
  );
}

export const config = {
  runtime: "edge",
};

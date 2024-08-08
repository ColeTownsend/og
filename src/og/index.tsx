import type { ILayout, ILayoutConfig } from "../layouts/types";
import satori from "satori";
import { Resvg, type ResvgRenderOptions } from "@resvg/resvg-js";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import fs from "fs";
import type { SatoriOptions } from "satori";

export const config = {
  runtime: "experimental-edge",
};

const fonts: SatoriOptions["fonts"] = [
  {
    name: "Editorial New",
    style: "normal",
    weight: 400,
    data: fs.readFileSync("public/fonts/EditorialNew-Thin.ttf"),
  },
  {
    name: "Supply",
    style: "normal",
    weight: 400,
    data: fs.readFileSync("public/fonts/supply-regular.ttf"),
  },
];

export const renderLayoutToSVG = async ({
  layout,
  config,
}: {
  layout: ILayout;
  config: ILayoutConfig;
}) => {
  const Component = layout.Component;

  const svg = await satori(<Component config={config} />, {
    width: 2400,
    height: 1260,
    fonts,
  });

  return svg;
};

const resvgOpts: ResvgRenderOptions = {
  fitTo: {
    mode: "width",
    value: 2400,
  },
  shapeRendering: 2,
  textRendering: 2,
  imageRendering: 0,
};

export const renderSVGToPNG = async (svg: string) => {
  const resvg = new Resvg(svg, resvgOpts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
};

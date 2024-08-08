import type React from "react";
import { z } from "zod";
import type { ILayout } from "./types";

const itemConfig = z.object({
  image_background_hex: z.string().nullable(),
  imageUrl: z.string(),
  name: z.string(),
  brand_name: z.string(),
});
export type ItemConfig = z.infer<typeof itemConfig>;

const Component: React.FC<{ config: ItemConfig }> = ({ config }) => {
  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: config.image_background_hex || "#ffffff",
      }}
    >
      {/* biome-ignore lint/a11y/useAltText: <explanation> */}
      <img
        src={`https://running.supply/cdn-cgi/image/f=png/${config.imageUrl}`}
        style={{
          height: "1200px",
          width: "1200px",
          objectFit: "cover",
          position: "relative",
          zIndex: "1",
        }}
      />

      <div
        style={{
          display: "flex",
          zIndex: "1",
          flexDirection: "column",
          position: "absolute",
          top: "80px",
          right: "80px",
        }}
      >
        <span
          style={{
            fontSize: "36px",
            display: "flex",
            marginBottom: "30px",
            fontStyle: "normal",
            fontFamily: "'Supply'",
            color: "black",
            fontWeight: 100,
            opacity: 0.25,
            textTransform: "uppercase",
            lineHeight: "1",
            whiteSpace: "pre-wrap",
          }}
        >
          Running Supply
        </span>
      </div>
      <div
        style={{
          zIndex: "1",
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          bottom: "80px",
          left: "80px",
        }}
      >
        <span
          style={{
            fontSize: "36px",
            display: "flex",
            marginBottom: "40px",
            fontStyle: "normal",
            fontFamily: "'Supply'",
            color: "black",
            fontWeight: 100,
            opacity: 0.25,
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {config.brand_name}
        </span>
        <span
          style={{
            fontSize: "72px",
            fontStyle: "normal",
            fontFamily: "'Editorial New'",
            color: "black",
            fontWeight: 100,
            lineHeight: 1,
          }}
        >
          {config.name}
        </span>
      </div>
    </div>
  );
};

export const simpleLayout: ILayout<typeof itemConfig> = {
  name: "simple",
  config: itemConfig,
  properties: [
    {
      name: "name",
      type: "text",
      default: "Pegasus 41",
    },
    {
      name: "image_background_hex",
      type: "text",
      default: "#ffffff",
    },
    {
      name: "imageUrl",
      type: "text",
      default: "https://avatars.githubusercontent.com/u/10681116?v=4",
    },
    {
      name: "brand_name",
      type: "text",
      default: "Nike",
    },
  ],
  Component,
};

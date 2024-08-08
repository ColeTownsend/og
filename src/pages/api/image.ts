import type { NextApiHandler } from "next";
import { z } from "zod";

import { getLayoutAndConfig } from "../../layouts";
import { renderLayoutToSVG, renderSVGToPNG } from "../../og";
import { sanitizeHtml } from "../../layouts/utils";
import { pb } from "../../lib/client";

const imageReq = z.object({
  slug: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    const { slug } = await imageReq.parseAsync(req.query);

    const item = await pb
      .collection("product")
      .getFirstListItem(`slug="${slug}"`, {
        expand: "brand",
      });

    if (!item) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Not found</h1><pre><code>Item not found</code></pre>");
    }

    const { layout, config } = await getLayoutAndConfig("simple", {
      name: item.name,
      brand_name: item.expand?.brand.name || "",
      image_background_hex: item.image_background_hex,
      imageUrl: `https://cms.running.supply/api/files/n10au9ybmqekauc/${item.id}/${item.image}`,
    });
    const svg = await renderLayoutToSVG({ layout, config });

    res.statusCode = 200;
    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000",
    );

    const png = await renderSVGToPNG(svg);
    res.end(png);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<h1>Internal Error</h1><pre><code>${sanitizeHtml(
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        (e as any).message,
      )}</code></pre>`,
    );
    console.error(e);
  }
};

export default handler;

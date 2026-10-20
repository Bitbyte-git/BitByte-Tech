import fs from "node:fs/promises";
import path from "node:path";
import { SEO_BY_PATH, getSeoSchemas } from "../src/seo.js";

const DIST_DIR = path.resolve("dist");
const SITE_URL = "https://bitbytetech.org";

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll('"', "&quot;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const replaceMeta = (html, name, content) => html.replace(
  new RegExp(`<meta\\s+name=["']${name}["'][\\s\\S]*?>`, "i"),
  `<meta name="${name}" content="${escapeHtml(content)}" />`,
);

const renderPage = (template, pathname, config) => {
  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  const schemas = getSeoSchemas(pathname, config)
    .map((schema) => `<script type="application/ld+json" data-seo-schema="true">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`)
    .join("\n    ");

  let html = template.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(config.title)}</title>`);
  html = replaceMeta(html, "description", config.description);
  html = replaceMeta(html, "keywords", config.keywords);
  html = replaceMeta(html, "robots", config.noindex ? "noindex, nofollow" : "index, follow");
  html = html.replace(
    /<link\s+rel=["']canonical["'][\s\S]*?>/i,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  );
  if (schemas) html = html.replace("</head>", `    ${schemas}\n  </head>`);
  return html;
};

const template = await fs.readFile(path.join(DIST_DIR, "index.html"), "utf8");

for (const [pathname, config] of Object.entries(SEO_BY_PATH)) {
  const outputPath = pathname === "/"
    ? path.join(DIST_DIR, "index.html")
    : path.join(DIST_DIR, pathname.slice(1), "index.html");
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const rendered = renderPage(template, pathname, config);
  await fs.writeFile(outputPath, rendered, "utf8");

  const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
  const expected = [
    `<title>${escapeHtml(config.title)}</title>`,
    `name="description" content="${escapeHtml(config.description)}"`,
    `name="keywords" content="${escapeHtml(config.keywords)}"`,
    `name="robots" content="${config.noindex ? "noindex, nofollow" : "index, follow"}"`,
    `rel="canonical" href="${escapeHtml(canonical)}"`,
  ];
  for (const value of expected) {
    if (!rendered.includes(value)) {
      throw new Error(`SEO generation mismatch for ${pathname}: ${value}`);
    }
  }
}

console.log(`Generated ${Object.keys(SEO_BY_PATH).length} route-specific SEO pages.`);

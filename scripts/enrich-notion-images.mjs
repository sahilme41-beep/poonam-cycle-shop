import fs from "fs";
import path from "path";

const projectRoot = process.cwd();
const notionPath = path.join(projectRoot, "notion-products.json");
const productsDir = path.join(projectRoot, "public", "products");

const data = JSON.parse(fs.readFileSync(notionPath, "utf8"));
const filenames = fs.existsSync(productsDir) ? fs.readdirSync(productsDir) : [];

const updated = data.map((item) => {
  const localImage = item.localImage;
  if (!localImage) return { ...item, localImages: item.localImages || [] };

  const filename = String(localImage).split("/").pop() || "";
  const dot = filename.lastIndexOf(".");
  const ext = dot > -1 ? filename.slice(dot) : ".jpg";
  const base = dot > -1 ? filename.slice(0, dot) : filename;

  const matches = filenames
    .filter((name) => name === `${base}${ext}` || name.startsWith(`${base}-`))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const localImages = (matches.length ? matches : [filename]).map((name) => `/products/${name}`);
  return { ...item, localImages };
});

fs.writeFileSync(notionPath, JSON.stringify(updated, null, 2));
console.log(`Updated ${updated.length} products in notion-products.json`);


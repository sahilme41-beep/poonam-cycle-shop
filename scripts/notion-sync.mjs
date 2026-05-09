import fs from "fs";
import path from "path";

const sourceFile = process.argv[2];
if (!sourceFile) {
  throw new Error("Usage: node scripts/notion-sync.mjs <notion-fetch-output-file>");
}

const projectRoot = process.cwd();
const notionRaw = JSON.parse(fs.readFileSync(sourceFile, "utf8"));
const text = notionRaw.text || "";
const lines = text.split(/\r?\n/);

const clean = (value) => value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const toSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

let category = "";
let current = null;
const products = [];

for (const line of lines) {
  const summaryMatch = line.match(/<summary>(.*?)<\/summary>/);
  if (summaryMatch) {
    const summary = clean(summaryMatch[1]);
    if (!summary) continue;

    if (/^\d+$/.test(summary)) {
      if (current) products.push(current);
      current = {
        index: Number(summary),
        category,
        name: "",
        description: "",
        features: [],
        mrp: null,
        price: null,
        imageUrls: [],
        localImages: []
      };
    } else {
      if (current) {
        products.push(current);
        current = null;
      }
      category = summary;
    }
    continue;
  }

  if (!current) continue;

  const imageMatch = line.match(/!\[\]\((https?:[^\)]+)\)/);
  if (imageMatch) {
    current.imageUrls.push(imageMatch[1]);
    continue;
  }

  const mrpMatch = line.match(/Mrp\.?\s*([0-9,]+)/i);
  if (mrpMatch) {
    current.mrp = Number(mrpMatch[1].replace(/,/g, ""));
  }

  const priceMatch = line.match(/Best price\.?\s*([0-9,]+)/i);
  if (priceMatch) {
    current.price = Number(priceMatch[1].replace(/,/g, ""));
  }

  const plain = clean(line);
  if (plain && !plain.includes("Mrp") && !plain.includes("Best price")) {
    current.features.push(plain);
  }
}
if (current) products.push(current);

const imageDir = path.join(projectRoot, "public", "products");
fs.mkdirSync(imageDir, { recursive: true });

for (const product of products) {
  const firstText = product.features[0] || `${product.category} Product ${product.index}`;
  const stopIdx = firstText.search(/[.:]/);
  const shortName = (stopIdx > 10 ? firstText.slice(0, stopIdx) : firstText)
    .split(" ")
    .slice(0, 8)
    .join(" ")
    .trim();
  product.name = shortName || `${product.category} Product ${product.index}`;
  product.description = firstText.slice(0, 320);

  for (let i = 0; i < product.imageUrls.length; i += 1) {
    const url = product.imageUrls[i];
    const filename = `${toSlug(product.category)}-${product.index}-${i + 1}.jpg`;
    const absolute = path.join(imageDir, filename);
    const response = await fetch(url);
    if (!response.ok) continue;
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(absolute, buffer);
    product.localImages.push(`/products/${filename}`);
  }
}

const outputProducts = products.map((product) => ({
  index: product.index,
  category: product.category,
  name: product.name,
  description: product.description,
  features: product.features.slice(0, 6),
  mrp: product.mrp,
  price: product.price,
  localImages: product.localImages
}));

fs.writeFileSync(path.join(projectRoot, "notion-products.json"), JSON.stringify(outputProducts, null, 2));
console.log(`Synced ${outputProducts.length} products from Notion.`);

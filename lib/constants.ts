export const BUSINESS = {
  name: "Poonam Cycle & Toy World",
  address: "Near Kaswam Hospital, Gandhinagar, Kolhapur, Maharashtra",
  mobile: "7588267528",
  sales: "9359165468",
  inquiry: ["9422043565", "7057402575"],
  instagramHandle: "poonam_cycle",
  whatsapp: "7588267528"
};

export const STORE_CATEGORIES = [
  { name: "Electric Cycles", slug: "electric-cycles", subcategories: [] },
  {
    name: "Electric Cars & Toys",
    slug: "electric-cars-toys",
    subcategories: ["Cars", "Bikes", "Jeeps", "Scooters"]
  },
  { name: "Tricycles", slug: "tricycles", subcategories: [] },
];

export function formatCategorySlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function resolveStoreCategory(rawCategory: string, rawName = "", rawDescription = "") {
  const cat = String(rawCategory || "").toLowerCase();
  const text = `${rawName} ${rawDescription}`.toLowerCase();

  if (cat.includes("tricycle")) return STORE_CATEGORIES.find((c) => c.slug === "tricycles")!;
  if (
    text.includes("cycle") ||
    text.includes("bicycle") ||
    text.includes("bike ")
  ) {
    return STORE_CATEGORIES.find((c) => c.slug === "electric-cycles")!;
  }
  return STORE_CATEGORIES.find((c) => c.slug === "electric-cars-toys")!;
}

export function normalizeCategoryName(rawCategory: string, rawName = "", rawDescription = "") {
  return resolveStoreCategory(rawCategory, rawName, rawDescription).name;
}

export function normalizeCategorySlug(rawCategory: string, rawName = "", rawDescription = "") {
  return resolveStoreCategory(rawCategory, rawName, rawDescription).slug;
}

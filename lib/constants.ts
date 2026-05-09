export const BUSINESS = {
  name: "Poonam Cycle & Toy World",
  address: "Near Kaswam Hospital, Gandhinagar, Kolhapur, Maharashtra",
  mobile: "7588267528",
  sales: "9359165468",
  inquiry: ["9422043565", "7057902565"],
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
  if (cat.includes("electric cars") || cat.includes("toy")) {
    return STORE_CATEGORIES.find((c) => c.slug === "electric-cars-toys")!;
  }
  if (cat.includes("electric cycle")) return STORE_CATEGORIES.find((c) => c.slug === "electric-cycles")!;
  if (cat.includes("mtb") || cat.includes("gear") || cat.includes("kids cycle")) {
    return STORE_CATEGORIES.find((c) => c.slug === "tricycles")!;
  }
  const toyKeywords = [
    "ride-on",
    "ride on",
    "toy",
    "jeep",
    "car",
    "scooter",
    "battery operated",
    "remote"
  ];
  if (toyKeywords.some((k) => text.includes(k))) {
    return STORE_CATEGORIES.find((c) => c.slug === "electric-cars-toys")!;
  }
  if (
    text.includes("emotorad") ||
    text.includes(" e-cycle") ||
    text.includes("electric cycle") ||
    /\bx[0-9]+\b/i.test(text) ||
    text.includes("cycle") ||
    text.includes("bicycle") ||
    text.includes("bike ")
  ) {
    return STORE_CATEGORIES.find((c) => c.slug === "electric-cycles")!;
  }
  return STORE_CATEGORIES.find((c) => c.slug === "tricycles")!;
}

export function normalizeCategoryName(rawCategory: string, rawName = "", rawDescription = "") {
  return resolveStoreCategory(rawCategory, rawName, rawDescription).name;
}

export function normalizeCategorySlug(rawCategory: string, rawName = "", rawDescription = "") {
  return resolveStoreCategory(rawCategory, rawName, rawDescription).slug;
}

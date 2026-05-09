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
  { name: "MTB Cycles", slug: "mtb-cycles", subcategories: [] },
  { name: "Gear Cycles", slug: "gear-cycles", subcategories: [] },
  { name: "Kids Cycles", slug: "kids-cycles", subcategories: [] },
  { name: "Electric Ride-On", slug: "electric-ride-on", subcategories: [] },
  { name: "Tricycles", slug: "tricycles", subcategories: [] },
  {
    name: "Electric Cars & Toys",
    slug: "electric-cars-toys",
    subcategories: ["Cars", "Bikes", "Jeeps", "Scooters"]
  }
];

export function formatCategorySlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

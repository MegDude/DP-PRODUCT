import { categoryImageFallbacks, districtImageFallbacks, perkImageRegistry } from "./perkImageRegistry";

function slug(value: unknown): string {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function resolveEntityImage(entity: Record<string, unknown>): string {
  const direct = entity.image || entity.imageUrl || entity.assetKey;
  if (typeof direct === "string" && direct.trim()) return direct;

  const keys = [
    slug(entity.id),
    slug(entity.name),
    slug(entity.brand),
    slug(entity.source),
  ].filter(Boolean);

  for (const key of keys) {
    if (perkImageRegistry[key]) return perkImageRegistry[key];
  }

  const district = String(entity.district || "").toLowerCase();
  if (district && districtImageFallbacks[district]) return districtImageFallbacks[district];

  const category = slug(entity.category || entity.type || entity.partnerType);
  const fallback = categoryImageFallbacks[category] || categoryImageFallbacks.default;

  if (import.meta.env.DEV && !fallback) {
    console.warn("[ImageResolver] Missing image", entity);
  }

  return fallback;
}

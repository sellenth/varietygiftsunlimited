// Deterministic prompt builder for /jewelry-images.
// The user writes one short composition note; everything else is assembled
// from the style settings so every request carries the same quality guidance.

export type JewelryType = "ring" | "necklace" | "earrings" | "bracelet";
export type MetalKey =
  | "match"
  | "white-gold"
  | "yellow-gold"
  | "rose-gold"
  | "platinum"
  | "silver";
export type BackdropKey =
  | "match"
  | "burgundy-velvet"
  | "emerald-velvet"
  | "ivory-silk"
  | "black-marble"
  | "champagne-studio";

export interface PromptInput {
  brand: string;
  composition: string;
  pieceCount: number;
  hasScene: boolean;
  /** a hand-drawn layout sketch is sent right after the product renders */
  hasSketch?: boolean;
  sketchOverPhoto?: boolean;
  jewelryType: JewelryType;
  stack: boolean;
  includeModel: boolean;
  modelDescription: string;
  diamonds: boolean;
  metal: MetalKey;
  backdrop: BackdropKey;
  aspectRatio: string;
}

export interface PromptSection {
  id: string;
  title: string;
  lines: string[];
  /** false for the part the user typed themselves */
  auto: boolean;
}

export const DEFAULT_MODEL_DESCRIPTION =
  "27-year-old Asian woman with a natural warm, lightly tanned skin tone";

export const JEWELRY_TYPES: Record<
  JewelryType,
  { label: string; one: string; many: string; sceneParts: string; skin: string }
> = {
  ring: {
    label: "Rings",
    one: "ring",
    many: "rings",
    sceneParts: "hand, skin tone, finger proportions, nail shape",
    skin: "natural knuckles, and authentic hand proportions",
  },
  bracelet: {
    label: "Bracelet",
    one: "bracelet",
    many: "bracelets",
    sceneParts: "wrist, hand, skin tone",
    skin: "natural knuckles, and authentic wrist and hand proportions",
  },
  necklace: {
    label: "Necklace",
    one: "necklace",
    many: "necklaces",
    sceneParts: "neck, collarbone, skin tone",
    skin: "natural pores, and authentic neck and collarbone proportions",
  },
  earrings: {
    label: "Earrings",
    one: "pair of earrings",
    many: "pairs of earrings",
    sceneParts: "ear, face profile, hair, skin tone",
    skin: "natural pores, and authentic ear and facial proportions",
  },
};

export const METALS: Record<MetalKey, { label: string; phrase: string }> = {
  match: { label: "Match reference", phrase: "" },
  "white-gold": { label: "White gold", phrase: "white-gold" },
  "yellow-gold": { label: "Yellow gold", phrase: "yellow-gold" },
  "rose-gold": { label: "Rose gold", phrase: "rose-gold" },
  platinum: { label: "Platinum", phrase: "platinum" },
  silver: { label: "Silver", phrase: "sterling-silver" },
};

export const BACKDROPS: Record<
  BackdropKey,
  { label: string; short: string; lines: string[] }
> = {
  match: {
    label: "Match scene reference",
    short: "the background",
    lines: [
      "Keep the background, colors, and mood of the scene reference image.",
    ],
  },
  "burgundy-velvet": {
    label: "Burgundy velvet",
    short: "dark red velvet",
    lines: [
      "Deep burgundy velvet curtain background with elegant vertical folds.",
      "Rich, sophisticated red tones.",
    ],
  },
  "emerald-velvet": {
    label: "Emerald velvet",
    short: "deep green velvet",
    lines: [
      "Deep emerald green velvet background with soft, elegant folds.",
      "Rich, saturated jewel-green tones.",
    ],
  },
  "ivory-silk": {
    label: "Ivory silk",
    short: "soft ivory silk",
    lines: [
      "Flowing ivory silk background with gentle, luminous folds.",
      "Soft, airy cream and pearl tones.",
    ],
  },
  "black-marble": {
    label: "Black marble",
    short: "polished black marble",
    lines: [
      "Polished black marble surface and background with subtle white veining.",
      "Dramatic, moody dark tones.",
    ],
  },
  "champagne-studio": {
    label: "Champagne studio",
    short: "the warm champagne backdrop",
    lines: [
      "Seamless warm champagne-gold studio backdrop with a soft gradient.",
      "Warm, glowing neutral tones.",
    ],
  },
};

const RATIO_LINES: Record<string, string> = {
  "4:5": "Vertical 4:5 composition for Instagram.",
  "1:1": "Square 1:1 composition.",
  "3:4": "Vertical 3:4 composition.",
  "2:3": "Vertical 2:3 composition.",
  "9:16": "Vertical 9:16 composition for Stories and Reels.",
  "16:9": "Horizontal 16:9 composition.",
};

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six"];
const word = (n: number) => NUMBER_WORDS[n] ?? String(n);

export function buildSections(input: PromptInput): PromptSection[] {
  const type = JEWELRY_TYPES[input.jewelryType];
  const n = Math.max(0, input.pieceCount);
  const noun = n > 1 ? type.many : type.one;
  const brand = input.brand.trim();
  const composition = input.composition.trim();
  const sections: PromptSection[] = [];

  sections.push({
    id: "intro",
    title: "",
    auto: true,
    lines: [
      `Create an ultra-realistic, high-end luxury jewelry campaign photograph${
        brand ? ` for ${brand}` : ""
      }.`,
    ],
  });

  if (composition) {
    sections.push({
      id: "composition",
      title: "COMPOSITION",
      auto: false,
      lines: composition.split(/\n+/).map((l) => l.trim()).filter(Boolean),
    });
  }

  const refs: string[] = [];
  if (n === 1) {
    refs.push(
      `The first uploaded image is the ${type.one} render. Use it as a precise product reference and carefully study its design.`,
    );
  } else if (n > 1) {
    refs.push(
      `The first ${word(n)} uploaded images are the ${type.one} renders. Use all ${word(n)} as precise product references. Carefully study each design before placing them together.`,
    );
  }
  if (input.hasSketch) {
    refs.push(
      `Uploaded image ${n + 1} is a rough composition sketch${
        input.sketchOverPhoto ? " drawn over a reference photo" : ""
      }. Use it only as a guide for framing, placement, and pose. Do not reproduce any sketch lines, arrows, or marks in the final photograph.`,
    );
  }
  if (input.hasScene) {
    refs.push(
      `The last uploaded image is the scene reference. Use it as the exact reference for the model's ${type.sceneParts}, pose, and background.`,
    );
  }
  if (refs.length) {
    sections.push({
      id: "references",
      title: "REFERENCE IMAGES",
      auto: true,
      lines: refs,
    });
  }

  const accuracy: string[] = [];
  if (n > 0) {
    accuracy.push(
      `Reproduce ${n > 1 ? `every ${type.one}` : `the ${type.one}`} exactly as shown in its reference: same stone shapes, stone count, setting style, metalwork, and proportions.`,
    );
  }
  if (n > 1) {
    if (input.jewelryType === "ring" && input.stack) {
      accuracy.push(
        `Stack all ${word(n)} rings naturally together on the same ring finger.`,
        "Ensure each ring is clearly visible and maintains its individual identity.",
        "Make the rings sit naturally against each other, with realistic spacing and correct finger anatomy.",
        `Do not merge the ${word(n)} designs into one ring.`,
      );
    } else {
      accuracy.push(
        `Show all ${word(n)} ${type.many} worn naturally together, with realistic spacing and correct anatomy.`,
        "Ensure each piece is clearly visible and maintains its individual identity.",
        `Do not merge the ${word(n)} designs into one piece.`,
      );
    }
  } else {
    accuracy.push(
      `Show the ${type.one} worn naturally, at true-to-life scale and with correct anatomy.`,
    );
  }
  sections.push({
    id: "accuracy",
    title: "JEWELRY ACCURACY — EXTREMELY IMPORTANT",
    auto: true,
    lines: accuracy,
  });

  const realism: string[] = [];
  if (input.includeModel) {
    const who = input.modelDescription.trim() || DEFAULT_MODEL_DESCRIPTION;
    realism.push(
      `The model is a ${who}. Keep realistic skin texture, fine lines, ${type.skin}.`,
    );
  }
  if (input.diamonds) {
    realism.push(
      "Diamonds must look like real high-quality natural diamonds, with:",
      "Sharp, clearly defined facets.",
      "Realistic light refraction and internal reflections.",
      "Natural white brilliance with subtle rainbow dispersion.",
      "Beautiful sparkle without excessive artificial glitter.",
      "No blurry, cloudy, plastic-looking, or oversized stones.",
    );
  }
  realism.push(
    input.metal === "match"
      ? "Metal should have realistic polished reflections and match the exact metal color of the product references."
      : `Metal should have realistic polished reflections and accurate ${METALS[input.metal].phrase} coloring.`,
  );
  sections.push({
    id: "realism",
    title: "REALISM & PHOTOGRAPHY",
    auto: true,
    lines: realism,
  });

  const backdrop = BACKDROPS[input.backdrop];
  sections.push({
    id: "aesthetic",
    title: "CAMPAIGN AESTHETIC",
    auto: true,
    lines: [
      ...backdrop.lines,
      "Soft directional studio lighting.",
      `Beautiful contrast between the ${input.diamonds ? "diamonds" : "jewelry"}${
        input.includeModel ? ", warm skin," : ""
      } and ${backdrop.short}.`,
      "Elegant, feminine, timeless luxury aesthetic.",
      "Editorial jewelry photography, shot with a professional macro lens.",
      `Sharp focus on the ${noun}, with natural depth of field.`,
    ],
  });

  sections.push({
    id: "final",
    title: "FINAL RESULT",
    auto: true,
    lines: [
      "The image should look like a real luxury jewelry campaign photographed for an international fine jewelry brand.",
      "Photorealistic, sophisticated, refined, and exceptionally detailed.",
      RATIO_LINES[input.aspectRatio] ??
        `${input.aspectRatio} composition.`,
      "No text, no logos, no watermarks, no additional jewelry.",
    ],
  });

  return sections;
}

export function renderPrompt(sections: PromptSection[]): string {
  return sections
    .map((s) => [s.title, ...s.lines].filter(Boolean).join("\n"))
    .join("\n");
}

export function buildPrompt(input: PromptInput): string {
  return renderPrompt(buildSections(input));
}

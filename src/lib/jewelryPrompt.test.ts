import { describe, expect, it } from "vitest";
import {
  buildPrompt,
  buildSections,
  DEFAULT_MODEL_DESCRIPTION,
  type PromptInput,
} from "./jewelryPrompt";

const base: PromptInput = {
  brand: "MARIS JEWELRY",
  composition: "Hand resting against the curtain, rings catching the light",
  pieceCount: 3,
  hasScene: true,
  jewelryType: "ring",
  stack: true,
  includeModel: true,
  modelDescription: DEFAULT_MODEL_DESCRIPTION,
  diamonds: true,
  metal: "white-gold",
  backdrop: "burgundy-velvet",
  aspectRatio: "4:5",
};

describe("jewelryPrompt", () => {
  it("reproduces the key lines of the reference campaign prompt", () => {
    const prompt = buildPrompt(base);
    for (const line of [
      "Create an ultra-realistic, high-end luxury jewelry campaign photograph for MARIS JEWELRY.",
      "Stack all three rings naturally together on the same ring finger.",
      "Do not merge the three designs into one ring.",
      "Diamonds must look like real high-quality natural diamonds, with:",
      "Metal should have realistic polished reflections and accurate white-gold coloring.",
      "Deep burgundy velvet curtain background with elegant vertical folds.",
      "Vertical 4:5 composition for Instagram.",
      "No text, no logos, no watermarks, no additional jewelry.",
    ]) {
      expect(prompt).toContain(line);
    }
  });

  it("marks only the composition as user-written", () => {
    const manual = buildSections(base).filter((s) => !s.auto);
    expect(manual.map((s) => s.id)).toEqual(["composition"]);
    expect(manual[0].lines[0]).toBe(base.composition);
  });

  it("drops stacking, diamonds, model and scene lines when switched off", () => {
    const prompt = buildPrompt({
      ...base,
      pieceCount: 1,
      hasScene: false,
      includeModel: false,
      diamonds: false,
      metal: "match",
      composition: "",
    });
    expect(prompt).not.toContain("Stack all");
    expect(prompt).not.toContain("Diamonds must");
    expect(prompt).not.toContain("The model is");
    expect(prompt).not.toContain("scene reference");
    expect(prompt).not.toContain("COMPOSITION");
    expect(prompt).toContain("The first uploaded image is the ring render.");
    expect(prompt).toContain("match the exact metal color");
  });

  it("describes a layout sketch as guidance only", () => {
    const prompt = buildPrompt({ ...base, hasSketch: true, sketchOverPhoto: true });
    expect(prompt).toContain(
      "Uploaded image 4 is a rough composition sketch drawn over a reference photo.",
    );
    expect(prompt).toContain("Do not reproduce any sketch lines");
    expect(buildPrompt(base)).not.toContain("composition sketch");
  });

  it("does not stack non-ring pieces", () => {
    const prompt = buildPrompt({ ...base, jewelryType: "necklace", pieceCount: 2 });
    expect(prompt).toContain("Show all two necklaces worn naturally together");
    expect(prompt).not.toContain("ring finger");
  });
});

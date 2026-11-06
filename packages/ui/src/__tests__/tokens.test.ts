import preset from "../../tailwind-preset.js";
import { tokens } from "../tokens";

// The same colors and breakpoints are written in two files:
// src/tokens.ts and tailwind-preset.js. This test fails if they stop matching,
// so change both files together.
describe("design tokens", () => {
  it("tailwind preset colors match tokens.ts", () => {
    expect(preset.theme?.extend?.colors).toEqual(tokens.colors);
  });

  it("tailwind preset breakpoint xs matches tokens.ts", () => {
    expect(preset.theme?.extend?.screens).toEqual({ xs: tokens.screens.xs });
  });
});

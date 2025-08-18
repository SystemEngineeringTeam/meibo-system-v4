import type { Preset, Tokens } from "@pandacss/dev";
import { defineConfig, definePreset } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import { globalCss } from "src/styles/global";
import { colorSemanticTokens, colorTokens } from "@/styles/colors";

function getDefaultPresetWithoutColor(): Preset {
  const { colors, ...rest } = pandaPreset.theme.tokens;

  return {
    ...pandaPreset,
    theme: {
      ...pandaPreset.theme,
      tokens: rest as Tokens,
    },
  };
}

const preset = definePreset({
  name: "meibo-system-v4@0.0.0",
  theme: {
    tokens: {
      colors: colorTokens.colors,
      fonts: {
        sans: { value: "'Noto Sans JP Variable', sans-serif" },
        mono: { value: "'UDEV Gothic 35JPDOC', monospace" },
      },
      zIndex: {
        header: { value: 10 },
        modal: { value: 100 },
        modalContent: { value: 110 },
      },
    },
    semanticTokens: colorSemanticTokens,
  },
});

// ref: https://panda-css.com/docs/installation/react-router#configure-the-content
export default defineConfig({
  preflight: true,
  include: ["./src/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  globalCss,
  presets: [getDefaultPresetWithoutColor(), preset],
  outdir: "panda",
  jsxFramework: "react",
});

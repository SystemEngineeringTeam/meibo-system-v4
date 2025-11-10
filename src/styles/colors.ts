import type { SemanticTokens, Tokens } from "@pandacss/dev";
import { palettes } from "@/assets/material-theme.json";

const palettePair = {
  a1: "primary",
  a2: "secondary",
  a3: "tertiary",
  n1: "neutral",
  n2: "neutral-variant",
  error: "error",
} as const;

const semanticTonePair = {
  primary: { palette: "a1", tone: [40, 80] },
  onPrimary: { palette: "a1", tone: [100, 20] },
  primaryContainer: { palette: "a1", tone: [90, 30] },
  onPrimaryContainer: { palette: "a1", tone: [10, 90] },
  secondary: { palette: "a2", tone: [40, 80] },
  onSecondary: { palette: "a2", tone: [100, 20] },
  secondaryContainer: { palette: "a2", tone: [90, 30] },
  onSecondaryContainer: { palette: "a2", tone: [10, 90] },
  tertiary: { palette: "a3", tone: [40, 80] },
  onTertiary: { palette: "a3", tone: [100, 20] },
  tertiaryContainer: { palette: "a3", tone: [90, 30] },
  onTertiaryContainer: { palette: "a3", tone: [10, 90] },
  error: { palette: "error", tone: [40, 80] },
  onError: { palette: "error", tone: [100, 20] },
  errorContainer: { palette: "error", tone: [90, 30] },
  onErrorContainer: { palette: "error", tone: [10, 80] },
  background: { palette: "n1", tone: [99, 10] },
  onBackground: { palette: "n1", tone: [10, 90] },
  surface: { palette: "n1", tone: [99, 10] },
  onSurface: { palette: "n1", tone: [10, 90] },
  surfaceVariant: { palette: "n2", tone: [90, 30] },
  onSurfaceVariant: { palette: "n2", tone: [30, 80] },
  outline: { palette: "n2", tone: [50, 60] },
  outlineVariant: { palette: "n2", tone: [80, 30] },
  shadow: { palette: "n1", tone: [0, 0] },
  scrim: { palette: "n1", tone: [0, 0] },
  inverseSurface: { palette: "n1", tone: [20, 90] },
  inverseOnSurface: { palette: "n1", tone: [95, 20] },
  inversePrimary: { palette: "a1", tone: [80, 40] },
} as const satisfies Record<
  string,
  {
    palette: keyof typeof palettePair;
    tone: [number, number];
  }
>;

type InputPalettes = {
  [key: string]: Record<string, string>;
};

type OutputPalettes = {
  [key: string]: Record<string, { value: string }>;
};

function generateTokens(input: InputPalettes): OutputPalettes {
  const output: OutputPalettes = {};

  for (const [paletteName, colors] of Object.entries(input)) {
    const name = `m3-${paletteName}`;
    output[name] = {};

    for (const [shade, color] of Object.entries(colors)) {
      output[name][shade] = { value: color };
    }
  }

  return output;
}

const errorPalette = {
  0: "#000000",
  5: "#2d0001",
  10: "#410002",
  15: "#540003",
  20: "#690005",
  25: "#7e0007",
  30: "#93000a",
  35: "#a80710",
  40: "#ba1a1a",
  50: "#de3730",
  60: "#ff5449",
  70: "#ff897d",
  80: "#ffb4ab",
  90: "#ffdad6",
  95: "#ffedea",
  98: "#fff8f7",
  99: "#fffbff",
  100: "#ffffff",
} as const satisfies Record<string, string>;

type OutputObject = {
  [key: string]: {
    value: {
      base: string;
      _dark: string;
    };
  };
};

function generateSemanticTokens(input: typeof semanticTonePair): OutputObject {
  const output: OutputObject = {};

  for (const [key, { palette, tone }] of Object.entries(input)) {
    const name = palettePair[palette];
    const [light, dark] = tone;

    output[`mv4-${key}`] = {
      value: {
        base: `{colors.m3-${name}.${light}}`,
        _dark: `{colors.m3-${name}.${dark}}`,
      },
    };
  }

  return output;
}

export const colorTokens = {
  colors: generateTokens({ ...palettes, error: errorPalette }),
} satisfies Tokens;

export const colorSemanticTokens = {
  colors: generateSemanticTokens(semanticTonePair),
} satisfies SemanticTokens;

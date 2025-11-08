import { cva } from "panda/css";
import { styled as p } from "panda/jsx";

export const cvaButton = cva({
  base: {
    "colorPalette": "mv4-primary",
    "py": "10",
    "px": "15",
    "borderRadius": "10px",
    "cursor": "pointer",
    "_disabled": {
      cursor: "not-allowed",
      opacity: 0.4,
    },
    "_enabled": {
      _hover: {
        bg: "colorPalette/10",
      },
    },
    "& svg": {
      transform: "translateY(1.5px)",
    },
  },
  variants: {
    variant: {
      light: {
        bg: "colorPalette/5",
        color: "colorPalette",
        _enabled: { _hover: { bg: "colorPalette/10" } },
      },
      filled: {
        bg: "colorPalette",
        color: "mv4-background",
        _enabled: { _hover: { bg: "colorPalette/90" } },
      },
      outlined: {
        outline: "1px solid",
        outlineColor: "colorPalette",
        color: "colorPalette",
        _enabled: { _hover: { bg: "colorPalette/5" } },
      },
      text: {
        // eslint-disable-next-line @pandacss/no-hardcoded-color
        bg: "transparent",
        color: "colorPalette",
        _enabled: { _hover: { bg: "colorPalette/10" } },
      },
      danger: {
        bg: "mv4-error",
        color: "mv4-background",
        _enabled: { _hover: { bg: "mv4-error/90" } },
      },
      dangerLight: {
        bg: "mv4-errorContainer",
        color: "mv4-onBackground",
        _enabled: { _hover: { bg: "mv4-errorContainer/90" } },
      },
    },
    size: {
      sm: {
        fontSize: "sm",
        px: "2",
        py: "1",
      },
      md: {
        fontSize: "md",
      },
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

export const Button = p("button", cvaButton);

import { cva } from "panda/css";
import { styled as p } from "panda/jsx";

export const cvaInput = cva({
  base: {
    colorPalette: "mv4-outlineVariant",
    width: "215px",
    height: "40px",
    border: "1px solid",
    borderColor: "colorPalette",
    borderRadius: "4px",
    padding: "2",
    pl: "13px",
    fontSize: "md",
    fontWeight: "medium",
    _placeholder: {
      color: "colorPalette",
    },
    _disabled: {
      cursor: "not-allowed",
      opacity: 0.4,
    },
    _focus: {
      outline: "2px solid",
      outlineColor: "colorPalette",
      outlineOffset: "-1px",
    },
  },
});

export const Input = p("input", cvaInput);

import type { ReactElement } from "react";
import { cva } from "panda/css";
import { styled as p } from "panda/jsx";

function DeleteIcon(): ReactElement {
  return (
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 22.9998V27.9998H9L23.7467 13.2531L18.7467 8.25313L4 22.9998ZM28.5467 8.45313L23.5467 3.45312L20.1733 6.83979L25.1733 11.8398L28.5467 8.45313Z" fill="#2C638B" />
    </svg>
  );
}

export const cvaDeleteButton = cva({
  base: {
    borderRadius: "10px",
    border: "1px solid var(--Schemes-Primary, #2C638B)",
    display: "inline-flex",
    padding: "10px 20px 10px 15px",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "6px",
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
    animateOnHover: {
      true: {
        "& svg": {
          transition: "transform 0.2s",
        },
        "_hover": {
          "& svg": {
            transform: "translateX(1px) translateY(-1px)",
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

const StyledDeleteButton = p("button", cvaDeleteButton);

export function DeleteButton(props: any): ReactElement {
  return (
    <StyledDeleteButton {...props}>
      <DeleteIcon />
      削除
    </StyledDeleteButton>
  );
}

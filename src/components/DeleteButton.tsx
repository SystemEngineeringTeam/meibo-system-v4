import type { ReactElement } from "react";
import { cva } from "panda/css";
import { styled as p } from "panda/jsx";

function DeleteIcon(): ReactElement {
  return (
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33301 28C8.59967 28 7.97212 27.7391 7.45034 27.2173C6.92856 26.6956 6.66723 26.0676 6.66634 25.3333V8H5.33301V5.33333H11.9997V4H19.9997V5.33333H26.6663V8H25.333V25.3333C25.333 26.0667 25.0721 26.6947 24.5503 27.2173C24.0286 27.74 23.4006 28.0009 22.6663 28H9.33301ZM22.6663 8H9.33301V25.3333H22.6663V8ZM11.9997 22.6667H14.6663V10.6667H11.9997V22.6667ZM17.333 22.6667H19.9997V10.6667H17.333V22.6667Z" fill="#2C638B" />
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

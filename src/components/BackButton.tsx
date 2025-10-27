import type { ReactElement } from "react";
import { cva } from "panda/css";
import { styled as p } from "panda/jsx";

function BackIcon(): ReactElement {
  return (
    <svg fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.433 17.3334L17.8997 24.8L15.9997 26.6667L5.33301 16L15.9997 5.33337L17.8997 7.20004L10.433 14.6667H26.6663V17.3334H10.433Z" fill="#2C638B" />
    </svg>
  );
}

export const cvaBackButton = cva({
  base: {
    top: "0",
    left: "0",
    borderRadius: "10px",
    border: "1px solid var(--Schemes-Primary, #2C638B)",
    display: "flex",
    padding: "10px 20px 10px 15px",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
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

const StyledBackButton = p("button", cvaBackButton);

export function BackButton(props: any): ReactElement {
  return (
    <StyledBackButton {...props}>
      <BackIcon />
      戻る
    </StyledBackButton>
  );
}

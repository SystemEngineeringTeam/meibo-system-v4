import type { GlobalStyleObject } from "@pandacss/dev";

export const globalCss: GlobalStyleObject = {
  "html, body": {
    "color": "text",
    "& body": {
      bg: "bg",
    },
    "fontFeatureSettings": "'palt'",
    "fontFamily": "sans",
    "scrollBehavior": "smooth",
    "scrollPaddingTop": "130px",

    "fontSize": {
      base: "large",
      mdDown: "md",
    },

    "_dark": {
      colorScheme: "dark",
    },

    // ref: https://ics.media/entry/240411/#%E3%81%BE%E3%81%A8%E3%82%81
    "overflowWrap": "anywhere",
    "wordBreak": "normal",
    "lineBreak": "strict",
  },

  "pre, code": {
    fontFamily: "mono",
  },

  "ul, menu, dir": {
    display: "block",
    listStyleType: "disc",
    paddingLeft: "1.3rem",
  },
  "ol": {
    display: "block",
    listStyleType: "decimal",
    paddingLeft: "1.3rem",
  },
  "li": {
    display: "list-item",
  },
  "ul ul, ol ul": {
    listStyleType: "circle",
  },
  "ol ol ul, ol ul ul, ul ol ul, ul ul ul": {
    listStyleType: "square",
  },

  "table": {
    border: "1px solid",
    th: {
      borderBottom: "2px solid",
      padding: "3",
    },
    td: {
      border: "1px solid",
      padding: "3",
    },
  },

  ".react-aria-Tabs": {
    "display": "flex",
    "color": "mv4-onBackground",
    "&[data-orientation=horizontal]": {
      flexDirection: "column",
    },
  },

  ".react-aria-TabList": {
    "display": "flex",
    "&[data-orientation=horizontal]": {
      "borderBottom": "1px solid",
      "borderColor": "mv4-outline",
      ".react-aria-SelectionIndicator": {
        left: 0,
        bottom: 0,
        width: "100%",
        borderBottom: "3px solid",
        borderBottomColor: "mv4-outline",
      },
    },
  },

  ".react-aria-Tab": {
    "padding": "10px",
    "cursor": "default",
    "outline": "none",
    "position": "relative",
    "color": "mv4-onSurface",
    "transition": "color 200ms",
    "--border-color": "transparent",
    "forcedColorAdjust": "none",
    ".react-aria-SelectionIndicator": {
      "position": "absolute",
      "transitionProperty": "translate, width, height",
      "transitionDuration": "200ms",
      "@media (prefers-reduced-motion: reduce)": {
        transition: "none",
      },
    },
    "&[data-hovered], &[data-focused]": {
      color: "mv4-primary",
    },
    "&[data-selected]": {
      "--border-color": "mv4-primary",
      "color": "mv4-onBackground",
      ".react-aria-SelectionIndicator": {
        borderBottomColor: "mv4-primary",
      },
    },
    "&[data-disabled]": {
      "color": "mv4-onSurface/40",
      "&[data-selected]": {
        "--border-color": "mv4-onSurface/40",
        ".react-aria-SelectionIndicator": {
          borderBottomColor: "mv4-onSurface/40",
        },
      },
    },
    "&[data-focus-visible]:after": {
      content: "''",
      position: "absolute",
      inset: "4px",
      borderRadius: "4px",
      border: "2px solid",
      borderColor: "mv4-primary",
    },
  },

  ".react-aria-TabPanel": {
    "marginTop": "4px",
    "padding": "10px",
    "borderRadius": "4px",
    "outline": "none",
    "&[data-focus-visible]": {
      outline: "2px solid",
      outlineColor: "mv4-primary",
    },
  },
};

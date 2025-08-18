import type { ReactElement, ReactNode } from "react";
import type { Route } from "./+types/root";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Expanded } from "./components/recipes/atomic/Expanded";
import fonts from "./styles/fonts.css?url";
import index from "./styles/index.css?url";
import "@fontsource-variable/noto-sans-jp";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: index },
  { rel: "stylesheet", href: fonts },
];

export function HydrateFallback(): ReactElement {
  return (
    <Expanded basedOn="screen" items="center">
      Loading...
    </Expanded>
  );
}

export function Layout({ children }: { children: ReactNode }): ReactElement {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function (): ReactElement {
  return (
    <Expanded basedOn="screen" items="center">
      <Outlet />
    </Expanded>
  );
}

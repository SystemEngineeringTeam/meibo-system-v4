import type { ComponentProps, ReactElement } from "react";
import { HStack } from "panda/jsx";
import { match } from "ts-pattern";
import { Button } from "@/components/recipes/atomic/Button";

function IconButton(
  {
    icon,
    children,
    iconPosition = "left",
    ...rest
  }:
    ComponentProps<typeof Button> & {
      icon: ReactElement;
      children: ReactElement;
      iconPosition?: "left" | "right";
    },
): ReactElement {
  return (
    <Button {...rest}>
      <HStack
        alignItems="center"
        gap="5px"
        style={{
          flexDirection: match(iconPosition)
            .with("left", () => "row" as const)
            .with("right", () => "row-reverse" as const)
            .exhaustive(),
        }}
      >
        {icon}
        {children}
      </HStack>
    </Button>
  );
}
export default IconButton;

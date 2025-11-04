import type { ComponentProps, ReactElement } from "react";
import { HStack } from "panda/jsx";
import { Button } from "@/components/recipes/atomic/Button";

function IconButton(
  { icon, children, ...rest }:
    ComponentProps<typeof Button> & {
      icon: ReactElement;
      children: ReactElement;
    },
): ReactElement {
  return (
    <Button {...rest}>
      <HStack alignItems="center" gap="2">
        {icon}
        {children}
      </HStack>
    </Button>
  );
}
export default IconButton;

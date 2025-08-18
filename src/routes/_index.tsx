import type { ReactElement } from "react";
import { css } from "panda/css";
import { Flex, styled as p } from "panda/jsx";

const oreorep = css({
  "& > p": {
    _hover: { bg: "mv4-error", transform: "translateY(-1px)" },
    bg: "mv4-primary",
    color: "mv4-onPrimary",
    px: "10",
    transition: "all 0.2s",
  },
});
export default function (): ReactElement {
  return (
    <Flex
      className={oreorep}
      flexDir={{
        base: "column",
        md: "row",
      }}
      gap="100"
    >

      <p.p>
        やあ
      </p.p>
      <p.p>
        やあ
      </p.p>
      <p.p>
        やあ
      </p.p>
    </Flex>
  );
}

import type { ReactElement } from "react";
import { styled as p } from "panda/jsx";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/recipes/atomic/Button";

export default function (): ReactElement {
  return (
    <>
      <p.div color="mv4-primary">
        やあ
      </p.div>
      <Button>hi</Button>
      <BackButton>Back</BackButton>
    </>
  );
}

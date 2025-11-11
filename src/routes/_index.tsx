import type { ReactElement } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/recipes/atomic/Button";

export default function (): ReactElement {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Button
        onClick={(): void => {
          void navigate(`/registration`);
        }}
        variant="filled"
      >
        ログイン
      </Button>
    </div>
  );
}

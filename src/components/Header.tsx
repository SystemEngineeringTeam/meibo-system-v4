import type { ReactElement } from "react";
import { Box } from "panda/jsx";
import { useNavigate } from "react-router";
import syskenLogo from "@/assets/images/sysken_logo.svg";
import { Button } from "./recipes/atomic/Button";

export default function Header(): ReactElement {
  const navigate = useNavigate();

  const handleNavigation = (path: string): void => {
    void navigate(path);
  };

  return (
    <Box>
      <Box alignItems="center" display="flex" gap="8">
        <img
          alt="システム研究会ロゴ"
          onClick={() => {
            handleNavigation("/");
          }}
          src={syskenLogo}
          width="150px"
        />
        <h1>名簿システム</h1>
      </Box>
      <Box alignItems="center" display="flex" gap="8">
        <Button onClick={() => {
          handleNavigation("/members");
        }}
        >
          メンバー
        </Button>
        <Button onClick={() => {
          handleNavigation("/events");
        }}
        >
          イベント
        </Button>
        <Button onClick={() => {
          handleNavigation("/payments");
        }}
        >
          支払い
        </Button>
        <img
          alt="ユーザープロフィール画像"
          height="50px"
          onClick={() => {
            handleNavigation("/profile");
          }}
          src="https://pbs.twimg.com/profile_images/1930864387885273088/KnzR2heh_400x400.jpg"
          style={{
            borderRadius: "50%",
            aspectRatio: "1/1",
            width: "50px",
          }}
        />
      </Box>
    </Box>
  );
}

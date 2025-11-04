import type { ReactElement } from "react";
import { Box, Circle, styled as p } from "panda/jsx";
import { useNavigate } from "react-router";
import syskenLogo from "@/assets/images/sysken_logo.svg";
import { Button } from "./recipes/atomic/Button";

export default function Header(): ReactElement {
  const navigate = useNavigate();

  const handleNavigation = (path: string): void => {
    void navigate(path);
  };

  return (
    <Box bg="mv4-primaryContainer" display="flex" h="90px" justifyContent="space-between" padding="12px 28px">
      <Box alignItems="center" display="flex" gap="8">

        <Button onClick={() => {
          handleNavigation("/");
        }}
        >
          <p.img
            alt="システム研究会ロゴ"
            src={syskenLogo}
            width="150px"
          />
        </Button>
        <p.h1>名簿システム</p.h1>
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
        <Circle>
          <p.img
            alt="ユーザープロフィール画像"
            aspectRatio="1 / 1"
            height="50px"
            onClick={() => {
              handleNavigation("/profile");
            }}
            rounded="50%"
            src="https://pbs.twimg.com/profile_images/1930864387885273088/KnzR2heh_400x400.jpg"
            w="50px"
          />
        </Circle>
      </Box>
    </Box>
  );
}

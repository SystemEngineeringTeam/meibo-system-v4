import type { ReactElement } from "react";
import { Box, styled as p } from "panda/jsx";
import { Link, useNavigate } from "react-router";
import syskenLogo from "@/assets/images/sysken_logo.svg";

export default function Header(): ReactElement {
  const navigate = useNavigate();

  const handleNavigation = (path: string): void => {
    void navigate(path);
  };

  return (
    <Box bg="mv4-primaryContainer" display="flex" h="90px" justifyContent="space-between" padding="12px 28px">
      <Box alignItems="center" display="flex" gap="8">
        <Link to="/members">
          <p.img
            alt="システム研究会ロゴ"
            src={syskenLogo}
            width="150px"
          />
        </Link>
        <p.h1>名簿システム</p.h1>
      </Box>
      <Box alignItems="center" display="flex" gap="8">
        <Link to="/members">
          メンバー
        </Link>
        <Link to="/events">
          イベント
        </Link>
        <Link to="/payments">
          支払い
        </Link>
        <p.img
          alt="ユーザープロフィール画像"
          aspectRatio="1 / 1"
          height="50px"
          onClick={() => {
            handleNavigation("/members");
          }}
          rounded="50%"
          src="https://pbs.twimg.com/profile_images/1930864387885273088/KnzR2heh_400x400.jpg"
          w="50px"
        />
      </Box>
    </Box>
  );
}

import type { JSX } from "react";
import { useNavigate, useParams } from "react-router";

import IconButton from "@/components/IconButton";

type MemberData = {
  id: string;
  grade: string;
  icon: string;
  studentId: string;
  name: string;
};

const defaultIcon = "https://nenex.me/assets/ira-D6gCFlkL.png";

const initialMembers: MemberData[] = [
  { id: "1", grade: "B3", icon: defaultIcon, studentId: "K24015", name: "石丸凜弥" },
  { id: "2", grade: "B4", icon: defaultIcon, studentId: "K24115", name: "加藤まさし" },
  { id: "3", grade: "B2", icon: defaultIcon, studentId: "X24015", name: "愛工太郎" },
  { id: "4", grade: "B1", icon: defaultIcon, studentId: "V24125", name: "矢部大地" },
  { id: "5", grade: "B4", icon: defaultIcon, studentId: "V24115", name: "町田わたる" },
  { id: "6", grade: "M1", icon: defaultIcon, studentId: "K24015", name: "石丸凜弥" },
  { id: "7", grade: "B2", icon: defaultIcon, studentId: "K24016", name: "佐藤健" },
  { id: "8", grade: "B3", icon: defaultIcon, studentId: "K24017", name: "田中花子" },
  { id: "9", grade: "B1", icon: defaultIcon, studentId: "K24018", name: "山田太郎" },
  { id: "10", grade: "M2", icon: defaultIcon, studentId: "K24019", name: "鈴木一郎" },
  { id: "11", grade: "B4", icon: defaultIcon, studentId: "K24020", name: "高橋優" },
  { id: "12", grade: "B3", icon: defaultIcon, studentId: "K24021", name: "中村美咲" },
  { id: "13", grade: "B2", icon: defaultIcon, studentId: "K24022", name: "小林翔" },
  { id: "14", grade: "B1", icon: defaultIcon, studentId: "K24023", name: "松本花" },
  { id: "15", grade: "M1", icon: defaultIcon, studentId: "K24024", name: "伊藤健太" },
  { id: "16", grade: "B4", icon: defaultIcon, studentId: "K24025", name: "渡辺優子" },
  { id: "17", grade: "B3", icon: defaultIcon, studentId: "K24026", name: "山本太郎" },
  { id: "18", grade: "B2", icon: defaultIcon, studentId: "K24027", name: "中島美咲" },
  { id: "19", grade: "B1", icon: defaultIcon, studentId: "K24028", name: "高橋一郎" },
  { id: "20", grade: "M2", icon: defaultIcon, studentId: "K24029", name: "佐々木花子" },
  { id: "21", grade: "B4", icon: defaultIcon, studentId: "K24030", name: "藤田健" },
  { id: "22", grade: "B3", icon: defaultIcon, studentId: "K24031", name: "岡田優" },
  { id: "23", grade: "B2", icon: defaultIcon, studentId: "K24032", name: "村上翔太" },
  { id: "24", grade: "B1", icon: defaultIcon, studentId: "K24033", name: "石井花" },
];

export default function Member(): JSX.Element {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();

  return (

    <div>
      <div>
        <img
          src={defaultIcon}
          style={{ width: "89px", height: "89px", borderRadius: "50%" }}
        />
        {initialMembers.find((member) => member.id === memberId)?.name}
        {initialMembers.find((member) => member.id === memberId)?.studentId}
        <IconButton
          icon={<IconMaterialSymbolsArrowBack />}
          onClick={() => void navigate("/members")}
          variant="outlined"
        >
          <p>戻る</p>
        </IconButton>
        <IconButton icon={<IconMaterialSymbolsEdit />} variant="filled">
          <p>自分の情報の編集</p>
        </IconButton>
        <IconButton icon={<IconMaterialSymbolsDeleteForever />} variant="danger">
          <p>部員を削除</p>
        </IconButton>

      </div>
    </div>
  );
}

import type { ColumnDef } from "@tanstack/react-table";
import type { JSX } from "react";
import { useCallback, useMemo, useState } from "react";
import IconMaterialSymbolsArrowDropDown from "~icons/material-symbols/arrow-drop-down";
import IconMaterialSymbolsArrowDropUp from "~icons/material-symbols/arrow-drop-up";
import IconMaterialSymbolsEdit from "~icons/material-symbols/edit";
import IconMaterialSymbolsQrCodeScanner from "~icons/material-symbols/qr-code-scanner";
import IconMaterialSymbolsSearch from "~icons/material-symbols/search";
import IconButton from "@/components/IconButton";
import { Button } from "@/components/recipes/atomic/Button";
import MemberTable from "@/components/table";

type MemberData = {
  id: string;
  grade: string;
  icon: string;
  studentId: string;
  name: string;
  attendance: "attended" | "unattended";
};

const defaultIcon = "https://nenex.me/assets/ira-D6gCFlkL.png";

const initialMembers: MemberData[] = [
  { id: "1", grade: "B3", icon: defaultIcon, studentId: "K24015", name: "石丸凜弥", attendance: "unattended" },
  { id: "2", grade: "B4", icon: defaultIcon, studentId: "K24115", name: "加藤まさし", attendance: "unattended" },
  { id: "3", grade: "B2", icon: defaultIcon, studentId: "X24015", name: "愛工太郎", attendance: "unattended" },
  { id: "4", grade: "B1", icon: defaultIcon, studentId: "V24125", name: "矢部大地", attendance: "unattended" },
  { id: "5", grade: "B4", icon: defaultIcon, studentId: "V24115", name: "町田わたる", attendance: "unattended" },
  { id: "6", grade: "M1", icon: defaultIcon, studentId: "K24015", name: "石丸凜弥", attendance: "unattended" },
  { id: "7", grade: "B2", icon: defaultIcon, studentId: "K24016", name: "佐藤健", attendance: "unattended" },
  { id: "8", grade: "B3", icon: defaultIcon, studentId: "K24017", name: "田中花子", attendance: "unattended" },
  { id: "9", grade: "B1", icon: defaultIcon, studentId: "K24018", name: "山田太郎", attendance: "unattended" },
  { id: "10", grade: "M2", icon: defaultIcon, studentId: "K24019", name: "鈴木一郎", attendance: "unattended" },
  { id: "11", grade: "B4", icon: defaultIcon, studentId: "K24020", name: "高橋優", attendance: "unattended" },
  { id: "12", grade: "B3", icon: defaultIcon, studentId: "K24021", name: "中村美咲", attendance: "unattended" },
  { id: "13", grade: "B2", icon: defaultIcon, studentId: "K24022", name: "小林翔", attendance: "unattended" },
  { id: "14", grade: "B1", icon: defaultIcon, studentId: "K24023", name: "松本花", attendance: "unattended" },
  { id: "15", grade: "M1", icon: defaultIcon, studentId: "K24024", name: "伊藤健太", attendance: "unattended" },
  { id: "16", grade: "B4", icon: defaultIcon, studentId: "K24025", name: "渡辺優子", attendance: "unattended" },
  { id: "17", grade: "B3", icon: defaultIcon, studentId: "K24026", name: "山本太郎", attendance: "unattended" },
  { id: "18", grade: "B2", icon: defaultIcon, studentId: "K24027", name: "中島美咲", attendance: "unattended" },
  { id: "19", grade: "B1", icon: defaultIcon, studentId: "K24028", name: "高橋一郎", attendance: "unattended" },
  { id: "20", grade: "M2", icon: defaultIcon, studentId: "K24029", name: "佐々木花子", attendance: "unattended" },
  { id: "21", grade: "B4", icon: defaultIcon, studentId: "K24030", name: "藤田健", attendance: "unattended" },
  { id: "22", grade: "B3", icon: defaultIcon, studentId: "K24031", name: "岡田優", attendance: "unattended" },
  { id: "23", grade: "B2", icon: defaultIcon, studentId: "K24032", name: "村上翔太", attendance: "unattended" },
  { id: "24", grade: "B1", icon: defaultIcon, studentId: "K24033", name: "石井花", attendance: "unattended" },
];

export default function Members(): JSX.Element {
  const [sortedBy, setSortedBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [members, setMembers] = useState<MemberData[]>(() => initialMembers);

  const handleSort = useCallback((sortKey: string): void => {
    if (sortedBy === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortedBy(sortKey);
      setSortOrder("asc");
    }
  }, [sortedBy]);

  const handleAttendanceToggle = useCallback((id: string): void => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, attendance: member.attendance === "attended" ? "unattended" : "attended" }
          : member,
      ),
    );
  }, []);

  const columns = useMemo<Array<ColumnDef<MemberData>>>(
    () => [
      {
        id: "icon",
        header: (): string => "",
        cell: ({ row }): JSX.Element => (
          <img
            alt="Member Icon"
            src={row.original.icon}
            style={{ width: "50px", height: "50px", borderRadius: "50px" }}
          />
        ),
        size: 40,
      },
      {
        accessorKey: "studentId",
        header: (): JSX.Element => (
          <div
            onClick={(): void => {
              handleSort("studentId");
            }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            学籍番号
            {(sortedBy === "" || sortedBy === "studentId") && (
              sortOrder === "asc"
                ? <IconMaterialSymbolsArrowDropUp />
                : <IconMaterialSymbolsArrowDropDown />
            )}
          </div>
        ),
        cell: ({ getValue }): string => getValue() as string,
        size: 60,
      },
      {
        accessorKey: "name",
        header: (): string => "氏名",
        cell: ({ getValue }): string => getValue() as string,
        size: 200,
      },
      {
        id: "attendance",
        header: (): string => "出席状況",
        cell: ({ row }): JSX.Element => (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                handleAttendanceToggle(row.original.id);
              }}
              variant={row.original.attendance === "attended" ? "filled" : "danger"}
            >
              {row.original.attendance === "attended" ? "出席" : "未出席"}
            </Button>
          </div>
        ),
        size: 100,
      },
    ],
    [sortedBy, sortOrder, handleSort, handleAttendanceToggle],
  );

  // フィルタリングとソート
  const filteredAndSortedData = useMemo(() => {
    let data = [...members];

    // 検索フィルタリング
    if (searchQuery !== "") {
      const query = searchQuery.toLowerCase();
      data = data.filter(
        (member) =>
          member.name.toLowerCase().includes(query)
          || member.studentId.toLowerCase().includes(query)
          || member.grade.toLowerCase().includes(query),
      );
    }

    // ソート
    if (sortedBy !== "") {
      data = data.sort((a, b) => {
        const aValue = a[sortedBy as keyof typeof a];
        const bValue = b[sortedBy as keyof typeof b];

        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue);
          return sortOrder === "asc" ? comparison : -comparison;
        }

        return 0;
      });
    }

    return data;
  }, [members, sortedBy, sortOrder, searchQuery]);

  return (
    <div style={{ padding: "1.5rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <IconButton icon={<IconMaterialSymbolsQrCodeScanner />} variant="filled">
            <p>QRコード読み取り</p>
          </IconButton>
          <IconButton icon={<IconMaterialSymbolsEdit />} variant="filled">
            <p>編集</p>
          </IconButton>
        </div>
        <div style={{ position: "relative", width: "300px", padding: "20px" }}>
          <IconMaterialSymbolsSearch
            style={{
              position: "absolute",
              left: "1.4rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
              fontSize: "1.25rem",
            }}
          />
          <input
            onChange={(e): void => {
              setSearchQuery(e.target.value);
            }}
            placeholder="メンバーを検索..."
            style={{
              width: "100%",
              padding: "0.625rem 0.75rem 0.625rem 2.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "0.875rem",
              outline: "none",
            }}
            type="text"
            value={searchQuery}
          />
        </div>
      </div>
      <MemberTable
        columns={columns}
        data={filteredAndSortedData}
        onSort={handleSort}
        sortOrder={sortOrder}
        sortedBy={sortedBy}
      />
    </div>
  );
}

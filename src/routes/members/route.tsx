import type { ColumnDef } from "@tanstack/react-table";
import type { JSX } from "react";
import type { MemberData } from "@/components/table";
import { useCallback, useMemo, useState } from "react";
import IconMaterialSymbolsArrowDropDown from "~icons/material-symbols/arrow-drop-down";

import IconMaterialSymbolsArrowDropUp from "~icons/material-symbols/arrow-drop-up";
import MemberTable from "@/components/table";

export default function Members(): JSX.Element {
  const icon = "https://nenex.me/assets/ira-D6gCFlkL.png";

  const [sortedBy, setSortedBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = useCallback((sortKey: string): void => {
    if (sortedBy === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortedBy(sortKey);
      setSortOrder("asc");
    }
  }, [sortedBy]);
  const [, setSelectedRows] = useState<Set<string>>(); // 選択された行のIDを管理←これでuserの削除など

  const handleRowSelection = useCallback((id: string, isChecked: boolean): void => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (isChecked) {
        updated.add(id);
      } else {
        updated.delete(id);
      }
      return updated;
    });
  }, []);

  const columns = useMemo<Array<ColumnDef<MemberData>>>(
    () => [
      {
        id: "checkbox",
        header: (): string => "",
        cell: ({ row }): JSX.Element => (
          <div>
            <input
              onChange={(e) => {
                handleRowSelection(row.original.id, e.target.checked);
              }}
              style={{ width: "30px", height: "20px" }}
              type="checkbox"
            />
          </div>
        ),
        size: 10,
      },
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
        size: 25,
      },
      {
        accessorKey: "grade",
        header: (): JSX.Element => (
          <div
            onClick={(): void => {
              handleSort("grade");
            }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            学年
            {(sortedBy === "" || sortedBy === "grade") && (
              sortOrder === "asc"
                ? <IconMaterialSymbolsArrowDropUp />
                : <IconMaterialSymbolsArrowDropDown />
            )}
          </div>
        ),
        cell: ({ getValue }): string => getValue() as string,
        size: 30,
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
        size: 30,
      },
      {
        accessorKey: "name",
        header: (): string => "氏名",
        cell: ({ getValue }): string => getValue() as string,
        size: 200,
      },
    ],
    [sortedBy, sortOrder, handleSort, handleRowSelection],
  );

  // テーブルのデータ
  const tableData = [
    { id: "1", grade: "B3", icon, studentId: "K24015", name: "石丸凜弥" },
    { id: "2", grade: "B4", icon, studentId: "K24115", name: "加藤まさし" },
    { id: "3", grade: "B2", icon, studentId: "X24015", name: "愛工太郎" },
    { id: "4", grade: "B1", icon, studentId: "V24125", name: "矢部大地" },
    { id: "5", grade: "B4", icon, studentId: "V24115", name: "町田わたる" },
    { id: "6", grade: "M1", icon, studentId: "K24015", name: "石丸凜弥" },
    { id: "7", grade: "B2", icon, studentId: "K24016", name: "佐藤健" },
    { id: "8", grade: "B3", icon, studentId: "K24017", name: "田中花子" },
    { id: "9", grade: "B1", icon, studentId: "K24018", name: "山田太郎" },
    { id: "10", grade: "M2", icon, studentId: "K24019", name: "鈴木一郎" },
    { id: "11", grade: "B4", icon, studentId: "K24020", name: "高橋優" },
    { id: "12", grade: "B3", icon, studentId: "K24021", name: "中村美咲" },
    { id: "13", grade: "B2", icon, studentId: "K24022", name: "小林翔" },
    { id: "14", grade: "B1", icon, studentId: "K24023", name: "松本花" },
    { id: "15", grade: "M1", icon, studentId: "K24024", name: "伊藤健太" },
    { id: "16", grade: "B4", icon, studentId: "K24025", name: "渡辺優子" },
    { id: "17", grade: "B3", icon, studentId: "K24026", name: "山本太郎" },
    { id: "18", grade: "B2", icon, studentId: "K24027", name: "中島美咲" },
    { id: "19", grade: "B1", icon, studentId: "K24028", name: "高橋一郎" },
    { id: "20", grade: "M2", icon, studentId: "K24029", name: "佐々木花子" },
    { id: "21", grade: "B4", icon, studentId: "K24030", name: "藤田健" },
    { id: "22", grade: "B3", icon, studentId: "K24031", name: "岡田優" },
    { id: "23", grade: "B2", icon, studentId: "K24032", name: "村上翔太" },
    { id: "24", grade: "B1", icon, studentId: "K24033", name: "石井花" },
  ];

  // フィルタリングとソート
  const filteredAndSortedData = tableData
    .sort((a, b) => {
      if (sortedBy === "") {
        return 0;
      }

      const aValue = a[sortedBy as keyof typeof a];
      const bValue = b[sortedBy as keyof typeof b];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortOrder === "asc" ? comparison : -comparison;
      }

      return 0;
    });

  return (
    <div>
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

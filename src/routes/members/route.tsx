import type { JSX } from "react";
import type { ColumnDef } from "@/components/MemberTable";

import { useState } from "react";

import MemberTable from "@/components/MemberTable";

export default function Members(): JSX.Element {
  const icon = "https://nenex.me/assets/ira-D6gCFlkL.png";

  const [sortedBy, setSortedBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (sortKey: string): void => {
    if (sortedBy === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortedBy(sortKey);
      setSortOrder("asc");
    }
  };

  const columns: ColumnDef[] = [
    {
      id: "checkbox",
      label: "",
      isRowHeader: false,
      width: "80px",
    },
    {
      id: "icon",
      label: "",
      isRowHeader: false,
      width: "100px",
    },
    {
      id: "grade",
      label: "学年",
      isRowHeader: true,
      width: "120px",
      sortable: true,
      sortKey: "grade",
    },
    {
      id: "studentId",
      label: "学籍番号",
      isRowHeader: false,
      width: "150px",
      sortable: true,
      sortKey: "studentId",
    },
    {
      id: "name",
      label: "氏名",
      isRowHeader: false,
      width: "150px",
    },
    {
      id: "space", // これがないと表の幅がいい感じにできなかった
      label: "",
      isRowHeader: false,
      width: "auto",
    },
  ];

  // テーブルのデータ
  const tableData = [
    { id: "1", grade: "B3", icon, studentId: "K24015", name: "石丸凜弥", space: "" },
    { id: "2", grade: "B4", icon, studentId: "K24115", name: "加藤まさし", space: "" },
    { id: "3", grade: "B2", icon, studentId: "X24015", name: "愛工太郎", space: "" },
    { id: "4", grade: "B1", icon, studentId: "V24125", name: "矢部大地", space: "" },
    { id: "5", grade: "B4", icon, studentId: "V24115", name: "町田わたる", space: "" },
    { id: "6", grade: "M1", icon, studentId: "K24015", name: "石丸凜弥", space: "" },
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

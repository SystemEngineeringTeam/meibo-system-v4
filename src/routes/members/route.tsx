import type { JSX } from "react";
import type { ColumnDef } from "@/components/MemberTable";

import { useState } from "react";

import MemberTable from "@/components/MemberTable";

export default function Members(): JSX.Element {
  const icon = "https://nenex.me/assets/ira-D6gCFlkL.png";

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [gradeSortOrder, setGradeSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedBy, setSortedBy] = useState<"studentId" | "grade">("studentId");

  const handleStudentIdClick = (): void => {
    setSortedBy("studentId");
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleGradeClick = (): void => {
    setSortedBy("grade");
    setGradeSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
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
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          学年
          {
            gradeSortOrder === "asc"
              ? (
                  <IconMaterialSymbolsArrowDropUp />
                )
              : (
                  <IconMaterialSymbolsArrowDropDown />
                )
          }
        </span>
      ),
      isRowHeader: true,
      width: "120px",
      onClick: (): void => {
        handleGradeClick();
      },
    },
    {
      id: "studentId",
      label: (
        <span style={{ display: "flex", alignItems: "center" }}>
          学籍番号
          {
            sortOrder === "asc"
              ? (
                  <IconMaterialSymbolsArrowDropUp />
                )
              : (
                  <IconMaterialSymbolsArrowDropDown />
                )
          }
        </span>
      ),
      isRowHeader: false,
      width: "150px",
      onClick: (): void => {
        handleStudentIdClick();
      },
    },
    {
      id: "name",
      label: "氏名",
      isRowHeader: false,
      width: "150px",

    },
    {
      id: "space",
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
      if (sortedBy === "grade") {
        const comparison = a.grade.localeCompare(b.grade);
        return gradeSortOrder === "asc" ? comparison : -comparison;
      } else {
        const comparison = a.studentId.localeCompare(b.studentId);
        return sortOrder === "asc" ? comparison : -comparison;
      }
    });

  return (
    <div>
      <MemberTable columns={columns} data={filteredAndSortedData} />
    </div>
  );
}

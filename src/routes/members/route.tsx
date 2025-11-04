import type { JSX } from "react";

import { sva } from "panda/css";
import { useState } from "react";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

const styles = sva({
  slots: ["container", "table", "header", "column", "lastColumn", "image"],
  base: {
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    table: {
      "width": "80%",
      "tableLayout": "fixed",
      "& th, & td": {
        border: "1px solid #000",
        borderLeft: "none",
        borderRight: "none",
        padding: "8px",
      },
    },
    header: {
      backgroundColor: "mv4-primaryContainer",
    },
    column: {
      textAlign: "left",
      fontSize: "lg",
    },
    lastColumn: {
      textAlign: "left",
      fontSize: "lg",
    },
    image: {
      width: "50px",
      height: "50px",
      borderRadius: "50px",
    },
  },
});

export default function Members(): JSX.Element {
  const icon = "https://nenex.me/assets/ira-D6gCFlkL.png";

  const style = styles();

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

  const columns = [
    {
      id: "icon",
      className: style.column ?? "",
      label: "",
      isRowHeader: false,
      width: "100px",
    },
    {
      id: "grade",
      className: style.column ?? "",
      label: "学年",
      isRowHeader: true,
      width: "120px",
      onClick: (): void => {
        handleGradeClick();
      },
    },
    {
      id: "studentId",
      className: style.column ?? "",
      label: "学籍番号",
      isRowHeader: false,
      width: "150px",
      onClick: (): void => {
        handleStudentIdClick();
      },
    },
    {
      id: "name",
      className: style.column ?? "",
      label: "氏名",
      isRowHeader: false,
      width: "150px",
    },
    {
      id: "space",
      className: style.lastColumn ?? "",
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
    <div className={style.container}>
      <div style={{ marginBottom: "16px", display: "flex", gap: "8px" }}>

      </div>
      <Table aria-label="Files" className={style.table ?? ""}>
        <TableHeader className={style.header ?? ""}>
          {columns.map((col) => (
            <Column
              className={col.className}
              isRowHeader={col.isRowHeader}
              key={col.id}
              style={{
                width: col.width,
                cursor: "pointer",
              }}
            >
              <div
                onClick={col.onClick}
              >
                {col.label}
              </div>
            </Column>
          ))}
        </TableHeader>
        <TableBody>
          {filteredAndSortedData.map((member) => (
            <Row
              key={member.id}
              style={{ cursor: "pointer" }}
            >
              <Cell>
                <img
                  alt="userIcon"
                  className={style.image}
                  src={member.icon}
                />
              </Cell>
              <Cell>{member.grade}</Cell>
              <Cell
                style={{ cursor: "pointer" }}
              >
                {member.studentId}
              </Cell>
              <Cell>{member.name}</Cell>
              <Cell>{member.space}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

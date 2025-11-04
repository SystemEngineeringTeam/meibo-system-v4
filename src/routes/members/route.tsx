import type { JSX } from "react";
import { sva } from "panda/css";
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

function handleClick(): void {
  // eslint-disable-next-line no-alert
  alert("行がクリックされました！");
}

export default function Members(): JSX.Element {
  const icon = "https://nenex.me/assets/ira-D6gCFlkL.png";

  const style = styles();

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
    },
    {
      id: "studentId",
      className: style.column ?? "",
      label: "学籍番号",
      isRowHeader: false,
      width: "150px",
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
    { id: "2", grade: "B4", icon, studentId: "K24115", name: "石丸凜弥", space: "" },
    { id: "3", grade: "B2", icon, studentId: "X24015", name: "石丸凜弥", space: "" },
    { id: "4", grade: "B1", icon, studentId: "V24125", name: "石丸凜弥", space: "" },
    { id: "5", grade: "B4", icon, studentId: "V24115", name: "石丸凜弥", space: "" },
    { id: "6", grade: "M1", icon, studentId: "K24015", name: "石丸凜弥", space: "" },
  ];

  return (
    <div className={style.container}>
      <Table aria-label="Files" className={style.table ?? ""}>
        <TableHeader className={style.header ?? ""}>
          {columns.map((col) => (
            <Column
              className={col.className}
              isRowHeader={col.isRowHeader}
              key={col.id}
              style={{ width: col.width }}
            >
              {col.label}
            </Column>
          ))}
        </TableHeader>
        <TableBody>
          {tableData.map((member) => (
            <Row
              key={member.id}
              onClick={handleClick}
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
              <Cell>{member.studentId}</Cell>
              <Cell>{member.name}</Cell>
              <Cell>{member.space}</Cell>
            </Row>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

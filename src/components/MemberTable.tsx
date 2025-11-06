import type { JSX } from "react";

import { sva } from "panda/css";
import {
  Cell,
  Checkbox,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "react-aria-components";

const styles = sva({
  slots: ["container", "table", "header", "column", "lastColumn", "image", "checkbox"],
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
    checkbox: {
      "display": "flex",
      "alignItems": "center",
      "gap": "8px",
      "cursor": "pointer",

      "& .checkbox-box": {
        width: "30px",
        height: "30px",
        border: "2px solid #000",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      },

      "& svg": {
        width: "20px",
        height: "20px",
        fill: "mv4-primary",
        stroke: "mv4-onPrimary",
        strokeWidth: "3",
        display: "none",
        strokeDashoffset: 66,
      },

      "&[data-selected] .checkbox-box": {
        backgroundColor: "mv4-primary",
      },

      "&[data-selected] svg": {
        display: "block",
      },
    },
  },
});

export type ColumnDef = {
  id: string;
  label: string;
  isRowHeader: boolean;
  width?: string;
  sortable?: boolean;
  sortKey?: string;
};

export type MemberData = {
  id: string;
  grade: string;
  icon: string;
  studentId: string;
  name: string;
  space: string;
};

type MemberTableProps = {
  columns: ColumnDef[];
  data: MemberData[];
  onSort: (sortKey: string) => void;
  sortedBy: string;
  sortOrder: "asc" | "desc";
};

export default function MemberTable({ columns, data, onSort, sortedBy, sortOrder }: MemberTableProps): JSX.Element {
  const style = styles();

  const handleColumnClick = (col: ColumnDef): void => {
    if (col.sortable === true && col.sortKey !== undefined && col.sortKey !== "" && onSort !== undefined) {
      onSort(col.sortKey);
    }
  };

  return (
    <div className={style.container}>
      <Table aria-label="Members" className={style.table ?? ""}>
        <TableHeader className={style.header ?? ""}>
          {columns.map((col) => (
            <Column
              isRowHeader={col.isRowHeader ?? false}
              key={col.id}
              onClick={(): void => {
                handleColumnClick(col);
              }}
              style={{ width: col.width, cursor: col.sortable === true ? "pointer" : "default" }}
            >
              <div className={style.column ?? ""} style={{ display: "flex", alignItems: "center" }}>
                {col.label}
                {col.sortable === true && (sortedBy === "" || col.sortKey === sortedBy) && (
                  sortOrder === "asc"
                    ? (
                        <IconMaterialSymbolsArrowDropUp />
                      )
                    : (
                        <IconMaterialSymbolsArrowDropDown />
                      )
                )}
              </div>
            </Column>
          ))}
        </TableHeader>
        <TableBody>
          {data.map((member) => (
            <Row
              key={member.id}
              style={{ cursor: "pointer" }}
            >
              <Cell>
                <Checkbox className={style.checkbox ?? ""}>
                  <div
                    className="checkbox-box"
                    onClick={(e): void => {
                      e.stopPropagation();
                    }}
                  >
                    <svg aria-hidden="true" viewBox="0 0 18 18">
                      <polyline points="1 9 7 14 15 4" />
                    </svg>
                  </div>
                </Checkbox>
              </Cell>
              <Cell>
                <img alt="Member Icon" className={style.image ?? ""} src={member.icon} />
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

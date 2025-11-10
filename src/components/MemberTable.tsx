import type { ColumnDef as TanStackColumnDef } from "@tanstack/react-table";

import type { JSX } from "react";
import {
  flexRender,
  getCoreRowModel,

  useReactTable,
} from "@tanstack/react-table";
import { sva } from "panda/css";

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

export type MemberData = {
  id: string;
  grade: string;
  icon: string;
  studentId: string;
  name: string;
  space: string;
};

type MemberTableProps = {
  columns: Array<TanStackColumnDef<MemberData>>;
  data: MemberData[];
  onSort?: (sortKey: string) => void;
  sortedBy?: string;
  sortOrder?: "asc" | "desc";
};

export default function MemberTable({ columns, data }: MemberTableProps): JSX.Element {
  const style = styles();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={style.container}>
      <table aria-label="Members" className={style.table ?? ""}>
        <thead className={style.header ?? ""}>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th className={style.column ?? ""} key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{ cursor: "pointer" }}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

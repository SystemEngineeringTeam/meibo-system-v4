import type { ColumnDef as TanStackColumnDef } from "@tanstack/react-table";

import type { JSX } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { sva } from "panda/css";

const styles = sva({
  slots: ["container", "table", "header", "column", "lastColumn", "image", "checkbox", "pagination", "pageButton", "activePageButton", "pageInfo"],
  base: {
    container: {
      marginBlock: "30px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
    image: {
      width: "50px",
      height: "50px",
      borderRadius: "50px",
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      marginTop: "20px",
      padding: "0",
    },
    pageButton: {
      display: "block",
      width: "fit-content",
      padding: "7px 14px",
      borderRadius: "50px",
      border: "1px solid #2C638B",
      cursor: "pointer",
      color: "mv4-primary",
      background: "mv4-onPrimary",
      _disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
    activePageButton: {
      display: "block",
      width: "fit-content",
      bg: "mv4-primary",
      border: "1px solid #2C638B",
      color: "mv4-onPrimary",
      padding: "7px 14px",
      borderRadius: "50px",
      cursor: "pointer",
    },
    pageInfo: {
      padding: "7px 14px",
      color: "mv4-primary",
    },
  },
});

export type MemberData = {
  id: string;
  grade: string;
  icon: string;
  studentId: string;
  name: string;
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
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <div className={style.container}>
      <table aria-label="Members" className={style.table ?? ""}>
        <thead className={style.header ?? ""}>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  className={style.column ?? ""}
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                >
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

      <div className={style.pagination ?? ""}>
        <button
          className={style.pageButton ?? ""}
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
          type="button"
        >
          {"<"}
        </button>
        <span className={style.pageInfo ?? ""}>
          ページ
          {table.getState().pagination.pageIndex + 1}
          {" "}
          /
          {" "}
          {table.getPageCount()}
        </span>
        <button
          className={style.pageButton ?? ""}
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
          type="button"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

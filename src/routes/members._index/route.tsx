import type { ColumnDef } from "@tanstack/react-table";
import type { JSX } from "react";
import { useCallback, useMemo, useState } from "react";
import { Button as AriaButton, DialogTrigger } from "react-aria-components";
import { useNavigate } from "react-router";
import IconMaterialSymbolsArrowBack from "~icons/material-symbols/arrow-back";
import IconMaterialSymbolsArrowDropDown from "~icons/material-symbols/arrow-drop-down";
import IconMaterialSymbolsArrowDropUp from "~icons/material-symbols/arrow-drop-up";
import IconMaterialSymbolsArrowForward from "~icons/material-symbols/arrow-forward";
import IconMaterialSymbolsDelete from "~icons/material-symbols/delete";
import IconMaterialSymbolsEdit from "~icons/material-symbols/edit";
import IconMaterialSymbolsSearch from "~icons/material-symbols/search";
import IconButton from "@/components/IconButton";
import { Modal, ModalFooter } from "@/components/modal";
import MemberTable from "@/components/table";

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

export default function Members(): JSX.Element {
  const navigate = useNavigate();

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
  const [selectedRows, setSelectedRows] = useState<Set<string>>(() => new Set()); // 選択された行のIDを管理←これでuserの削除など

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

  const handleDeleteSelected = useCallback((): void => {
    if (selectedRows.size === 0) {
      return;
    }
    setMembers((prev) => prev.filter((member) => !selectedRows.has(member.id)));
    setSelectedRows(() => new Set());
  }, [selectedRows]);

  const columns = useMemo<Array<ColumnDef<MemberData>>>(
    () => [
      {
        id: "checkbox",
        header: (): string => "",
        cell: ({ row }): JSX.Element => {
          const isChecked = selectedRows.has(String(row.original.id));
          return (
            <div>
              <input
                checked={isChecked}
                onChange={(e) => {
                  handleRowSelection(String(row.original.id), e.target.checked);
                }}
                style={{ width: "30px", height: "20px" }}
                type="checkbox"
              />
            </div>
          );
        },
        size: 20,
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
        size: 40,
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
        size: 50,
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
        id: "action",
        header: (): string => "",
        cell: ({ row }): JSX.Element => (
          <IconButton
            icon={<IconMaterialSymbolsArrowForward />}
            onClick={(): void => {
              void navigate(`/members/${row.original.id}`);
            }}
            variant="filled"
          >
            <p>部員を表示</p>
          </IconButton>
        ),
        size: 80,
      },
    ],
    [sortedBy, sortOrder, handleSort, handleRowSelection, selectedRows, navigate],
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
          {selectedRows.size > 0 && (
            <DialogTrigger>
              <AriaButton
                style={{
                  all: "unset",
                  cursor: "pointer",
                }}
              >
                <IconButton icon={<IconMaterialSymbolsEdit />} variant="danger">
                  <span>削除</span>
                </IconButton>
              </AriaButton>
              <Modal showCloseButton={false}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827" }}>
                    部員を削除
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    選択された
                    {selectedRows.size}
                    件の部員を削除してもよろしいですか?
                    <br />
                    この操作は取り消せません。
                  </p>
                  <ModalFooter>
                    <AriaButton slot="close">
                      <IconButton icon={<IconMaterialSymbolsArrowBack />}>
                        <p>キャンセル</p>
                      </IconButton>
                    </AriaButton>
                    <AriaButton
                      onPress={(): void => {
                        handleDeleteSelected();
                      }}
                      slot="close"
                    >
                      <IconButton icon={<IconMaterialSymbolsDelete />} variant="danger">
                        <p>削除</p>
                      </IconButton>
                    </AriaButton>
                  </ModalFooter>
                </div>
              </Modal>
            </DialogTrigger>
          )}
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

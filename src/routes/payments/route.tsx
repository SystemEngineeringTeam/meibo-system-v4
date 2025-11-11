import type { ColumnDef } from "@tanstack/react-table";
import type { JSX } from "react";
import { useCallback, useMemo, useState } from "react";
import { Button as AriaButton, DialogTrigger } from "react-aria-components";
import { useNavigate } from "react-router";
import IconMaterialSymbolsAdd from "~icons/material-symbols/add";
import IconMaterialSymbolsArrowBack from "~icons/material-symbols/arrow-back";
import IconMaterialSymbolsArrowDropDown from "~icons/material-symbols/arrow-drop-down";
import IconMaterialSymbolsArrowDropUp from "~icons/material-symbols/arrow-drop-up";
import IconMaterialSymbolsArrowForward from "~icons/material-symbols/arrow-forward";
import IconMaterialSymbolsCheck from "~icons/material-symbols/check";
import IconMaterialSymbolsDelete from "~icons/material-symbols/delete";
import IconMaterialSymbolsEdit from "~icons/material-symbols/edit";
import IconMaterialSymbolsSearch from "~icons/material-symbols/search";
import IconButton from "@/components/IconButton";
import { Modal, ModalFooter } from "@/components/modal";
import MemberTable from "@/components/table";

type EventData = {
  id: string;
  name: string;
  startDate: string;
  description: string;
  hasPayment: boolean;
  price?: number;
};

export default function Payments(): JSX.Element {
  const navigate = useNavigate();
  const [sortedBy, setSortedBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(() => new Set());

  const handleSort = useCallback((sortKey: string): void => {
    if (sortedBy === sortKey) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortedBy(sortKey);
      setSortOrder("asc");
    }
  }, [sortedBy]);

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

  const columns = useMemo<Array<ColumnDef<EventData>>>(
    () => [
      {
        id: "checkbox",
        header: (): string => "",
        cell: ({ row }): JSX.Element => (
          <div>
            <input
              onChange={(e): void => {
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
        accessorKey: "name",
        header: (): JSX.Element => (
          <div
            onClick={(): void => {
              handleSort("name");
            }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            タイトル
            {(sortedBy === "" || sortedBy === "name") && (
              sortOrder === "asc"
                ? <IconMaterialSymbolsArrowDropUp />
                : <IconMaterialSymbolsArrowDropDown />
            )}
          </div>
        ),
        cell: ({ getValue }): string => getValue() as string,
        size: 200,
      },
      {
        accessorKey: "price",
        header: (): JSX.Element => (
          <div
            onClick={(): void => {
              handleSort("price");
            }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            金額
            {(sortedBy === "" || sortedBy === "price") && (
              sortOrder === "asc"
                ? <IconMaterialSymbolsArrowDropUp />
                : <IconMaterialSymbolsArrowDropDown />
            )}
          </div>
        ),
        cell: ({ getValue }): string => {
          const price = getValue() as number | undefined;
          return price !== undefined ? `¥${price.toLocaleString()}` : "-";
        },
        size: 100,
      },
      {
        accessorKey: "description",
        header: (): string => "詳細",
        cell: ({ getValue }): string => getValue() as string,
        size: 300,
      },
      {
        id: "action",
        header: (): string => "",
        cell: ({ row }): JSX.Element => (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <IconButton
              icon={<IconMaterialSymbolsArrowForward />}
              onClick={(): void => {
                void navigate(`/events/${row.original.id}`);
              }}
              variant="filled"
            >
              <p>イベントを表示</p>
            </IconButton>
            <IconButton
              icon={<IconMaterialSymbolsArrowForward />}
              onClick={(): void => {
                void navigate(`/payments/${row.original.id}`);
              }}
            >
              <p>名簿を表示</p>
            </IconButton>
          </div>
        ),
        size: 300,
      },
    ],
    [sortedBy, sortOrder, handleSort, handleRowSelection, navigate],
  );

  // テーブルのデータ
  const tableData: EventData[] = [
    { id: "1", name: "新入生歓迎会", startDate: "2025-04-10", description: "新入生を歓迎するためのイベント", hasPayment: true, price: 3000 },
    { id: "2", name: "春のハッカソン", startDate: "2025-05-15", description: "24時間プログラミングコンテスト", hasPayment: true, price: 1500 },
    { id: "3", name: "技術講習会", startDate: "2025-06-20", description: "最新技術のワークショップ", hasPayment: true, price: 0 },
    { id: "4", name: "夏合宿", startDate: "2025-08-05", description: "2泊3日の開発合宿", hasPayment: true, price: 15000 },
    { id: "5", name: "学園祭出展", startDate: "2025-10-15", description: "学園祭での展示・発表", hasPayment: true, price: 0 },
    { id: "6", name: "OB・OG交流会", startDate: "2025-11-20", description: "卒業生との交流イベント", hasPayment: true, price: 5000 },
    { id: "7", name: "Webアプリ開発講座", startDate: "2025-04-25", description: "React入門ワークショップ", hasPayment: true, price: 0 },
    { id: "8", name: "LT大会", startDate: "2025-05-30", description: "ライトニングトーク発表会", hasPayment: true, price: 500 },
    { id: "9", name: "機械学習勉強会", startDate: "2025-06-10", description: "AI・機械学習の基礎講座", hasPayment: true, price: 0 },
    { id: "10", name: "夏のプロジェクト発表", startDate: "2025-09-05", description: "夏休みプロジェクトの成果発表", hasPayment: true, price: 0 },
    { id: "11", name: "セキュリティ講習", startDate: "2025-07-12", description: "サイバーセキュリティ基礎", hasPayment: true, price: 0 },
    { id: "12", name: "チーム開発演習", startDate: "2025-08-20", description: "実践的なチーム開発体験", hasPayment: true, price: 0 },
    { id: "13", name: "アルゴリズム勉強会", startDate: "2025-05-08", description: "競技プログラミング対策", hasPayment: true, price: 0 },
    { id: "14", name: "デザイン講座", startDate: "2025-06-18", description: "UI/UXデザイン入門", hasPayment: true, price: 1000 },
    { id: "15", name: "インフラ勉強会", startDate: "2025-07-22", description: "AWS/GCPハンズオン", hasPayment: true, price: 0 },
    { id: "16", name: "冬のハッカソン", startDate: "2025-12-15", description: "年末の集中開発イベント", hasPayment: true, price: 2000 },
    { id: "17", name: "企業見学ツアー", startDate: "2025-09-28", description: "IT企業訪問イベント", hasPayment: true, price: 8000 },
    { id: "18", name: "モバイルアプリ開発", startDate: "2025-10-05", description: "スマホアプリ開発講座", hasPayment: true, price: 0 },
    { id: "19", name: "技術書輪読会", startDate: "2025-11-12", description: "技術書の読書会", hasPayment: true, price: 0 },
    { id: "20", name: "年末大掃除", startDate: "2025-12-25", description: "部室の大掃除とピザパーティ", hasPayment: true, price: 2500 },
    { id: "21", name: "新年会", startDate: "2026-01-10", description: "新年の集まり", hasPayment: true, price: 4000 },
    { id: "22", name: "卒業制作発表会", startDate: "2026-02-20", description: "卒業生の作品発表", hasPayment: true, price: 0 },
    { id: "23", name: "Git/GitHub講習", startDate: "2025-04-18", description: "バージョン管理入門", hasPayment: true, price: 0 },
    { id: "24", name: "データベース設計講座", startDate: "2025-06-05", description: "SQL・DB設計の基礎", hasPayment: true, price: 0 },
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
          <DialogTrigger>
            <AriaButton
              style={{
                all: "unset",
                cursor: "pointer",
              }}
            >
              <IconButton icon={<IconMaterialSymbolsAdd />} variant="filled">
                <p>登録</p>
              </IconButton>
            </AriaButton>
            <Modal showCloseButton={false}>
              <form
                onSubmit={(e): void => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newEventData: EventData = {
                    id: String(tableData.length + 1),
                    name: formData.get("name") as string,
                    startDate: "",
                    description: formData.get("description") as string,
                    hasPayment: true,
                    price: Number(formData.get("price")) || 0,
                  };
                  void Promise.resolve(newEventData);
                  // ここでデータを保存する処理を追加
                }}
                style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <label
                      htmlFor="event-name"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#111827",
                        minWidth: "90px",
                      }}
                    >
                      タイトル
                    </label>
                    <input
                      id="event-name"
                      name="name"
                      placeholder="例: 新入生歓迎会"
                      required
                      style={{
                        flex: 1,
                        padding: "0.625rem 0.75rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        outline: "none",
                        transition: "border-color 0.15s",
                      }}
                      type="text"
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <label
                      htmlFor="event-price"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#111827",
                        minWidth: "90px",
                      }}
                    >
                      金額
                    </label>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <input
                        id="event-price"
                        min="0"
                        name="price"
                        placeholder="3000"
                        required
                        step="1"
                        style={{
                          flex: 1,
                          padding: "0.625rem 0.75rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          outline: "none",
                          transition: "border-color 0.15s",
                        }}
                        type="number"
                      />
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>円</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
                    <label
                      htmlFor="event-description"
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#111827",
                        minWidth: "90px",
                        paddingTop: "0.625rem",
                      }}
                    >
                      詳細
                    </label>
                    <textarea
                      id="event-description"
                      name="description"
                      placeholder="イベントの詳細を入力してください"
                      required
                      rows={4}
                      style={{
                        flex: 1,
                        padding: "0.625rem 0.75rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        fontSize: "0.875rem",
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.15s",
                        fontFamily: "inherit",
                      }}
                    />
                  </div>
                </div>
                <ModalFooter>
                  <AriaButton slot="close">
                    <IconButton icon={<IconMaterialSymbolsArrowBack />}>
                      <p>戻る</p>
                    </IconButton>
                  </AriaButton>
                  <AriaButton slot="close" type="submit">
                    <IconButton icon={<IconMaterialSymbolsCheck />} variant="filled">
                      <p>登録</p>
                    </IconButton>
                  </AriaButton>
                </ModalFooter>
              </form>
            </Modal>
          </DialogTrigger>
          {!isEditMode && selectedRows.size === 0
            ? (
                <IconButton
                  icon={<IconMaterialSymbolsEdit />}
                  onClick={(): void => {
                    setIsEditMode(true);
                  }}
                >
                  <p>編集</p>
                </IconButton>
              )
            : (
                <DialogTrigger>
                  <AriaButton
                    style={{
                      all: "unset",
                      cursor: "pointer",
                    }}
                  >
                    <IconButton icon={<IconMaterialSymbolsDelete />} variant="danger">
                      <p>削除</p>
                    </IconButton>
                  </AriaButton>
                  <Modal showCloseButton={false}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827" }}>
                        支払い情報を削除
                      </h2>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {selectedRows.size > 0
                          ? `選択された${selectedRows.size}件の支払い情報を削除してもよろしいですか?`
                          : "選択された支払い情報を削除してもよろしいですか?"}
                        <br />
                        この操作は取り消せません。
                      </p>
                      <ModalFooter>
                        <AriaButton
                          onPress={(): void => {
                            setIsEditMode(false);
                            setSelectedRows(new Set());
                          }}
                          slot="close"
                        >
                          <IconButton icon={<IconMaterialSymbolsArrowBack />}>
                            <p>キャンセル</p>
                          </IconButton>
                        </AriaButton>
                        <AriaButton
                          onPress={(): void => {
                            // ここで削除処理を実装
                            // 削除完了後、全てのチェックを外す
                            const checkboxes = document.querySelectorAll<HTMLInputElement>("input[type=\"checkbox\"]");
                            checkboxes.forEach((checkbox) => {
                              checkbox.checked = false;
                            });

                            setIsEditMode(false);
                            setSelectedRows(new Set());
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
            placeholder="イベントを検索..."
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

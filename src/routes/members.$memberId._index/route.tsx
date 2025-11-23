import type { ColumnDef } from "@tanstack/react-table";
import type { JSX } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button as AriaButton, DialogTrigger, SelectionIndicator, Tab, TabList, TabPanel, Tabs } from "react-aria-components";
import { useNavigate, useParams } from "react-router";
import IconMaterialSymbolsArrowBack from "~icons/material-symbols/arrow-back";
import IconMaterialSymbolsArrowDropDown from "~icons/material-symbols/arrow-drop-down";
import IconMaterialSymbolsArrowDropUp from "~icons/material-symbols/arrow-drop-up";
import IconMaterialSymbolsDelete from "~icons/material-symbols/delete";
import IconMaterialSymbolsDeleteForever from "~icons/material-symbols/delete-forever";
import IconMaterialSymbolsEdit from "~icons/material-symbols/edit";
import IconButton from "@/components/IconButton";
import { Modal, ModalFooter } from "@/components/modal";
import MemberTable from "@/components/table";

type EventData = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
};

type PaymentHistoryData = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type MemberData = {
  id: string;
  grade: string;
  icon: string;
  studentId: string;
  name: string;
};

const defaultIcon = "https://nenex.me/assets/ira-D6gCFlkL.png";

const initialEvents: EventData[] = [
  { id: "1", name: "イベント1", startDate: "2024-12-01", endDate: "2024-12-01", location: "場所1" },
  { id: "2", name: "イベント2", startDate: "2026-01-02", endDate: "2026-01-02", location: "場所2" },
  { id: "3", name: "イベント3", startDate: "2025-01-03", endDate: "2025-01-03", location: "場所3" },
  { id: "4", name: "イベント4", startDate: "2025-01-04", endDate: "2025-01-04", location: "場所4" },
  { id: "5", name: "イベント5", startDate: "2025-01-05", endDate: "2025-01-05", location: "場所5" },
];

const initialPaymentHistory: PaymentHistoryData[] = [
  { id: "1", name: "新入生歓迎会", price: 3000, description: "新入生を歓迎するためのイベント" },
  { id: "2", name: "春のハッカソン", price: 1500, description: "24時間プログラミングコンテスト" },
  { id: "3", name: "技術講習会", price: 0, description: "最新技術のワークショップ" },
  { id: "4", name: "夏合宿", price: 15000, description: "2泊3日の開発合宿" },
  { id: "5", name: "学園祭出展", price: 0, description: "学園祭での展示・発表" },
];

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

export default function Member(): JSX.Element {
  const { memberId } = useParams<{ memberId: string }>();
  const navigate = useNavigate();
  const baseMember = initialMembers.find((m) => m.id === memberId);
  const [paymentSortedBy, setPaymentSortedBy] = useState<string>("");
  const [paymentSortOrder, setPaymentSortOrder] = useState<"asc" | "desc">("asc");

  // ローカルストレージから更新された名前を読み込む
  const getMemberNameFromStorage = useCallback((): string | undefined => {
    if (memberId == null) {
      return baseMember?.name;
    }
    const savedName = localStorage.getItem(`member_${memberId}_name`);
    return savedName ?? baseMember?.name;
  }, [memberId, baseMember?.name]);

  const [memberName, setMemberName] = useState<string | undefined>(() => getMemberNameFromStorage());

  // memberIdが変更されたとき、またはページがフォーカスされたときに名前を更新
  useEffect(() => {
    const updateName = (): void => {
      const newName = getMemberNameFromStorage();
      setMemberName((prevName) => {
        if (prevName !== newName) {
          return newName;
        }
        return prevName;
      });
    };

    updateName();

    // ページがフォーカスされたときに更新（編集ページから戻ってきたとき）
    const handleFocus = (): void => {
      updateName();
    };

    window.addEventListener("focus", handleFocus);

    return (): void => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [getMemberNameFromStorage]);

  const member = baseMember ? { ...baseMember, name: memberName ?? baseMember.name } : undefined;

  const handlePaymentSort = useCallback((sortKey: string): void => {
    if (paymentSortedBy === sortKey) {
      setPaymentSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setPaymentSortedBy(sortKey);
      setPaymentSortOrder("asc");
    }
  }, [paymentSortedBy]);

  const getEventStatus = (startDate: string, endDate: string): "開催前" | "開催中" | "開催後" => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventStartDate = new Date(startDate);
    eventStartDate.setHours(0, 0, 0, 0);
    const eventEndDate = new Date(endDate);
    eventEndDate.setHours(0, 0, 0, 0);

    if (eventEndDate < today) {
      return "開催後";
    }
    if (eventStartDate <= today && eventEndDate >= today) {
      return "開催中";
    }
    return "開催前";
  };

  const columns = useMemo<Array<ColumnDef<EventData>>>(
    () => [
      {
        header: "イベント名",
        accessorKey: "name",
        cell: ({ row }): JSX.Element => {
          const status = getEventStatus(row.original.startDate, row.original.endDate);
          const statusColor
            = status === "開催中" ? "#4CAF50" : status === "開催前" ? "#FF9800" : "#9E9E9E";
          return (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>{row.original.name}</span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: "4px",
                  backgroundColor: statusColor,
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {status}
              </span>
            </div>
          );
        },
      },
      {
        header: "日時",
        accessorKey: "startDate",
      },
      {
        header: "開催場所",
        accessorKey: "location",
      },
    ],
    [],
  );

  const paymentColumns = useMemo<Array<ColumnDef<PaymentHistoryData>>>(
    () => [
      {
        accessorKey: "name",
        header: (): JSX.Element => (
          <div
            onClick={(): void => {
              handlePaymentSort("name");
            }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            タイトル
            {(paymentSortedBy === "" || paymentSortedBy === "name") && (
              paymentSortOrder === "asc"
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
              handlePaymentSort("price");
            }}
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            金額
            {(paymentSortedBy === "" || paymentSortedBy === "price") && (
              paymentSortOrder === "asc"
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
    ],
    [paymentSortedBy, paymentSortOrder, handlePaymentSort],
  );

  // 支払い履歴のフィルタリングとソート
  const filteredAndSortedPaymentData = useMemo(() => {
    let data = [...initialPaymentHistory];

    // ソート
    if (paymentSortedBy !== "") {
      data = data.sort((a, b) => {
        const aValue = a[paymentSortedBy as keyof typeof a];
        const bValue = b[paymentSortedBy as keyof typeof b];

        if (typeof aValue === "string" && typeof bValue === "string") {
          const comparison = aValue.localeCompare(bValue);
          return paymentSortOrder === "asc" ? comparison : -comparison;
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          const comparison = aValue - bValue;
          return paymentSortOrder === "asc" ? comparison : -comparison;
        }

        return 0;
      });
    }

    return data;
  }, [paymentSortedBy, paymentSortOrder]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src={defaultIcon}
            style={{ width: "89px", height: "89px", borderRadius: "50%" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span>{member?.name}</span>
            <span>{member?.studentId}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <IconButton
            icon={<IconMaterialSymbolsArrowBack />}
            onClick={() => void navigate("/members")}
            variant="outlined"
          >
            <p>戻る</p>
          </IconButton>
          <IconButton
            icon={<IconMaterialSymbolsEdit />}
            onClick={() => void navigate(`/members/${memberId}/edit`)}
            variant="filled"
          >
            <p>自分の情報の編集</p>
          </IconButton>
          <DialogTrigger>
            <AriaButton
              style={{
                all: "unset",
                cursor: "pointer",
              }}
            >
              <IconButton icon={<IconMaterialSymbolsDeleteForever />} variant="danger">
                <p>部員を削除</p>
              </IconButton>
            </AriaButton>
            <Modal showCloseButton={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827" }}>
                  部員を削除
                </h2>
                <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  {member?.name}
                  を削除してもよろしいですか?
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
                      // ここで削除処理を実装
                      void navigate("/members");
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
        </div>
      </div>

      <Tabs>
        <TabList aria-label="部員の詳細タブ">
          <Tab id="FoR">
            <span>参加イベント</span>
            <SelectionIndicator />
          </Tab>
          <Tab id="MaR">
            <span>支払い履歴</span>
            <SelectionIndicator />
          </Tab>
        </TabList>
        <TabPanel id="FoR">
          <MemberTable columns={columns} data={initialEvents} />
        </TabPanel>
        <TabPanel id="MaR">
          <MemberTable columns={paymentColumns} data={filteredAndSortedPaymentData} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

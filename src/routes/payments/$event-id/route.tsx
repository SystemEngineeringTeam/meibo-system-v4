import type { JSX } from "react";
import { styled as p } from "panda/jsx";
import { useNavigate, useParams } from "react-router";
import IconMaterialSymbolsArrowBack from "~icons/material-symbols/arrow-back";
import IconMaterialSymbolsDelete from "~icons/material-symbols/delete";
import IconMaterialSymbolsEdit from "~icons/material-symbols/edit";
import { Button } from "@/components/recipes/atomic/Button";
import { ContentContainer } from "@/components/recipes/atomic/ContentContainer";

type EventData = {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  description: string;
  hasPayment: boolean;
  price?: number;
  location?: string;
  capacity?: number;
  participants?: number;
};

// ダミーデータ（実際にはAPIから取得）
const mockEventData: Record<string, EventData> = {
  1: { id: "1", name: "新入生歓迎会", startDate: "2025-04-10", description: "新入生を歓迎するためのイベント", hasPayment: true, price: 3000, location: "学生会館", capacity: 50, participants: 32 },
  2: { id: "2", name: "春のハッカソン", startDate: "2025-05-15", endDate: "2025-05-16", description: "24時間プログラミングコンテスト", hasPayment: false, location: "第1実験棟", capacity: 30, participants: 28 },
  3: { id: "3", name: "技術講習会", startDate: "2025-06-20", description: "最新技術のワークショップ", hasPayment: false, location: "情報処理教室", capacity: 40, participants: 25 },
  4: { id: "4", name: "夏合宿", startDate: "2025-08-05", endDate: "2025-08-07", description: "2泊3日の開発合宿", hasPayment: true, price: 15000, location: "研修センター", capacity: 35, participants: 30 },
  5: { id: "5", name: "学園祭出展", startDate: "2025-10-15", endDate: "2025-10-16", description: "学園祭での展示・発表", hasPayment: false, location: "本館1F", capacity: 100, participants: 45 },
  6: { id: "6", name: "OB・OG交流会", startDate: "2025-11-20", description: "卒業生との交流イベント", hasPayment: true, price: 5000, location: "大学会館", capacity: 60, participants: 48 },
  7: { id: "7", name: "Webアプリ開発講座", startDate: "2025-04-25", description: "React入門ワークショップ", hasPayment: false, location: "情報処理教室", capacity: 25, participants: 20 },
  8: { id: "8", name: "LT大会", startDate: "2025-05-30", description: "ライトニングトーク発表会", hasPayment: false, location: "講義室A", capacity: 50, participants: 35 },
  9: { id: "9", name: "機械学習勉強会", startDate: "2025-06-10", description: "AI・機械学習の基礎講座", hasPayment: false, location: "情報処理教室", capacity: 30, participants: 22 },
  10: { id: "10", name: "夏のプロジェクト発表", startDate: "2025-09-05", description: "夏休みプロジェクトの成果発表", hasPayment: false, location: "大講義室", capacity: 80, participants: 55 },
};

export default function EventDetail(): JSX.Element {
  const params = useParams();
  const navigate = useNavigate();
  const eventId = params["eventId"];

  // イベントデータを取得
  const event = eventId != null ? mockEventData[eventId] : undefined;

  // イベントが見つからない場合
  if (event == null) {
    return (
      <ContentContainer widthLimit>
        <p.div
          bg="mv4-errorContainer"
          borderRadius="8px"
          color="mv4-onErrorContainer"
          p="8"
          textAlign="center"
        >
          <p.h2 fontSize="2xl" fontWeight="bold" mb="4">
            イベントが見つかりません
          </p.h2>
          <p.p mb="6">
            指定されたIDのイベントは存在しないか、削除された可能性があります。
          </p.p>
          <Button
            onClick={(): void => {
              void navigate("/events");
            }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            variant="filled"
          >
            <IconMaterialSymbolsArrowBack />
            イベント一覧に戻る
          </Button>
        </p.div>
      </ContentContainer>
    );
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  };

  const participationRate = event.capacity != null && event.participants != null
    ? Math.round((event.participants / event.capacity) * 100)
    : 0;

  return (
    <ContentContainer widthLimit>
      {/* ヘッダーセクション */}
      <p.div mb="6" w="100%">
        <Button
          onClick={(): void => {
            void navigate("/events");
          }}
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}
          variant="text"
        >
          <IconMaterialSymbolsArrowBack />
          イベント一覧に戻る
        </Button>

        <p.div
          alignItems="flex-start"
          display="flex"
          gap="4"
          justifyContent="space-between"
        >
          <p.div flex="1">
            <p.h1 color="mv4-onBackground" fontSize="3xl" fontWeight="bold" mb="2">
              {event.name}
            </p.h1>
            <p.div color="mv4-onSurfaceVariant" display="flex" flexWrap="wrap" gap="4">
              <p.span>
                📅
                {" "}
                {formatDate(event.startDate)}
                {event.endDate != null && ` 〜 ${formatDate(event.endDate)}`}
              </p.span>
              {event.location != null && (
                <p.span>
                  📍
                  {" "}
                  {event.location}
                </p.span>
              )}
            </p.div>
          </p.div>

          <p.div display="flex" gap="2">
            <Button
              onClick={(): void => {
                // 編集処理
                void Promise.resolve();
              }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              variant="outlined"
            >
              <IconMaterialSymbolsEdit />
              編集
            </Button>
            <Button
              onClick={(): void => {
                // 削除処理
                void Promise.resolve();
              }}
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              variant="danger"
            >
              <IconMaterialSymbolsDelete />
              削除
            </Button>
          </p.div>
        </p.div>
      </p.div>

      {/* メインコンテンツ */}
      <p.div
        display="grid"
        gap="6"
        gridTemplateColumns={{ base: "1fr", md: "2fr 1fr" }}
        w="100%"
      >
        {/* 左カラム：詳細情報 */}
        <p.div display="flex" flexDirection="column" gap="6">
          {/* イベント詳細 */}
          <p.div
            bg="mv4-surface"
            border="1px solid"
            borderColor="mv4-outlineVariant"
            borderRadius="12px"
            p="6"
          >
            <p.h2 color="mv4-onBackground" fontSize="xl" fontWeight="bold" mb="4">
              イベント詳細
            </p.h2>
            <p.p color="mv4-onSurfaceVariant" lineHeight="1.8">
              {event.description}
            </p.p>
          </p.div>

          {/* 参加者情報 */}
          {event.capacity != null && event.participants != null && (
            <p.div
              bg="mv4-surface"
              border="1px solid"
              borderColor="mv4-outlineVariant"
              borderRadius="12px"
              p="6"
            >
              <p.h2 color="mv4-onBackground" fontSize="xl" fontWeight="bold" mb="4">
                参加状況
              </p.h2>
              <p.div mb="4">
                <p.div alignItems="baseline" display="flex" gap="2" mb="2">
                  <p.span color="mv4-primary" fontSize="3xl" fontWeight="bold">
                    {event.participants}
                  </p.span>
                  <p.span color="mv4-onSurfaceVariant">
                    /
                    {event.capacity}
                    名
                  </p.span>
                </p.div>
                <p.div
                  bg="mv4-surfaceVariant"
                  borderRadius="full"
                  h="8px"
                  overflow="hidden"
                  w="100%"
                >
                  <p.div
                    bg="mv4-primary"
                    h="100%"
                    style={{ width: `${participationRate}%` }}
                    transition="width 0.3s"
                  />
                </p.div>
                <p.p color="mv4-onSurfaceVariant" fontSize="sm" mt="2">
                  定員の
                  {participationRate}
                  %が参加予定
                </p.p>
              </p.div>
            </p.div>
          )}
        </p.div>

        {/* 右カラム：サイドバー情報 */}
        <p.div display="flex" flexDirection="column" gap="6">
          {/* 支払い情報 */}
          <p.div
            bg="mv4-surface"
            border="1px solid"
            borderColor="mv4-outlineVariant"
            borderRadius="12px"
            p="6"
          >
            <p.h2 color="mv4-onBackground" fontSize="xl" fontWeight="bold" mb="4">
              支払い情報
            </p.h2>
            {event.hasPayment
              ? (
                  <p.div>
                    <p.div alignItems="baseline" display="flex" gap="2" mb="2">
                      <p.span color="mv4-primary" fontSize="2xl" fontWeight="bold">
                        ¥
                        {event.price?.toLocaleString()}
                      </p.span>
                    </p.div>
                    <p.p color="mv4-onSurfaceVariant" fontSize="sm">
                      参加には支払いが必要です
                    </p.p>
                    <Button
                      style={{ width: "100%", marginTop: "1rem" }}
                      variant="filled"
                    >
                      支払い状況を確認
                    </Button>
                  </p.div>
                )
              : (
                  <p.div
                    bg="mv4-primaryContainer"
                    borderRadius="8px"
                    color="mv4-onPrimaryContainer"
                    p="4"
                    textAlign="center"
                  >
                    <p.p fontWeight="medium">無料イベント</p.p>
                  </p.div>
                )}
          </p.div>

          {/* イベント情報サマリー */}
          <p.div
            bg="mv4-surface"
            border="1px solid"
            borderColor="mv4-outlineVariant"
            borderRadius="12px"
            p="6"
          >
            <p.h2 color="mv4-onBackground" fontSize="xl" fontWeight="bold" mb="4">
              基本情報
            </p.h2>
            <p.div display="flex" flexDirection="column" gap="3">
              <p.div>
                <p.p color="mv4-onSurfaceVariant" fontSize="sm" mb="1">
                  イベントID
                </p.p>
                <p.p color="mv4-onBackground" fontWeight="medium">
                  #
                  {event.id}
                </p.p>
              </p.div>
              <p.div>
                <p.p color="mv4-onSurfaceVariant" fontSize="sm" mb="1">
                  開始日
                </p.p>
                <p.p color="mv4-onBackground" fontWeight="medium">
                  {formatDate(event.startDate)}
                </p.p>
              </p.div>
              {event.endDate != null && (
                <p.div>
                  <p.p color="mv4-onSurfaceVariant" fontSize="sm" mb="1">
                    終了日
                  </p.p>
                  <p.p color="mv4-onBackground" fontWeight="medium">
                    {formatDate(event.endDate)}
                  </p.p>
                </p.div>
              )}
              {event.location != null && (
                <p.div>
                  <p.p color="mv4-onSurfaceVariant" fontSize="sm" mb="1">
                    場所
                  </p.p>
                  <p.p color="mv4-onBackground" fontWeight="medium">
                    {event.location}
                  </p.p>
                </p.div>
              )}
            </p.div>
          </p.div>

          {/* アクションボタン */}
          <p.div display="flex" flexDirection="column" gap="3">
            <Button
              onClick={(): void => {
                // 参加申し込み処理
                void Promise.resolve();
              }}
              style={{ width: "100%" }}
              variant="filled"
            >
              参加申し込み
            </Button>
            <Button
              onClick={(): void => {
                // 参加者リスト表示
                void Promise.resolve();
              }}
              style={{ width: "100%" }}
              variant="outlined"
            >
              参加者リストを見る
            </Button>
          </p.div>
        </p.div>
      </p.div>
    </ContentContainer>
  );
}

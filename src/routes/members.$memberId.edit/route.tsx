import type { JSX } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import DatePicker from "@/components/DatePicker";
import IconButton from "@/components/IconButton";
import { Input } from "@/components/recipes/atomic/Input";
import { RadioGroup } from "@/components/recipes/atomic/RadioGroup";
import { DynamicFieldSelect, GradeSelect } from "@/components/recipes/DomainSelects";

export default function MemberEdit(): JSX.Element {
  const navigate = useNavigate();
  const [affiliation, setAffiliation] = useState<string>("");
  const [isLivingWithFamily, setIsLivingWithFamily] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");

  const fields = [
    { id: 1, label: "名前", placeholder: "石丸凛弥" },
    { id: 2, label: "フリガナ", placeholder: "インマルリンヤ" },
    { id: 3, label: "卒業(予定)年度", placeholder: "28卒" },
    { id: 4, label: "学年", placeholder: "B1" },
    { id: 5, label: "所属", type: "select" as const },
    { id: 6, label: "学校名", placeholder: "中央大学" },
    { id: 7, label: "学部名", placeholder: "情報科学科" },
    { id: 8, label: "他の所属団体", placeholder: "Code" },
    { id: 9, label: "誕生日", placeholder: "2005/07/18" },
    { id: 10, label: "性別", placeholder: "男性 / 女性 / その他" },
    { id: 11, label: "電話番号", placeholder: "090-0000-0000" },
    { id: 12, label: "郵便番号", placeholder: "000-0000" },
    { id: 13, label: "現在の住所", placeholder: "名古屋市名東区39" },
    { id: 14, label: "実家暮らしか", type: "radio" as const },
    { id: 15, label: "実家の郵便番号", placeholder: "000-0000" },
    { id: 16, label: "実家の住所", placeholder: "名古屋市名東区39" },
    { id: 17, label: "お金を渡した人", placeholder: "石丸" },
  ];

  // フィールドの表示/非表示を判定
  const shouldHideField = (fieldId: number): boolean => {
    // 内部生の場合、学校名・学部名を非表示
    if (affiliation === "内部" && (fieldId === 6 || fieldId === 7)) {
      return true;
    }
    // 実家暮らしの場合、実家の郵便番号・住所を非表示
    if (isLivingWithFamily === "はい" && (fieldId === 15 || fieldId === 16)) {
      return true;
    }
    return false;
  };

  // 所属フィールドのレンダリング
  const renderAffiliationField = (label: string): JSX.Element => (
    <div style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p style={{ marginBottom: "8px" }}>{label}</p>
        <p style={{ fontSize: "12px", color: "#72787E", marginBottom: "12px" }}>
          *愛工大生は内部生を選択してください
        </p>
      </div>
      <RadioGroup
        name="affiliation"
        onChange={setAffiliation}
        options={[
          { label: "内部", value: "内部" },
          { label: "外部", value: "外部" },
        ]}
        value={affiliation}
      />
    </div>
  );

  // 実家暮らしフィールドのレンダリング
  const renderLivingWithFamilyField = (label: string): JSX.Element => (
    <div style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <p style={{ marginBottom: "8px" }}>{label}</p>
      <RadioGroup
        name="livingWithFamily"
        onChange={setIsLivingWithFamily}
        options={[
          { label: "はい", value: "はい" },
          { label: "いいえ", value: "いいえ" },
        ]}
        value={isLivingWithFamily}
      />
    </div>
  );

  const genderSelection = (label: string): JSX.Element => (
    <div style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <p style={{ marginBottom: "8px" }}>{label}</p>
      <RadioGroup
        name="livingWithFamily"
        onChange={setIsLivingWithFamily}
        options={[
          { label: "男性", value: "男性" },
          { label: "女性", value: "女性" },
          { label: "その他", value: "その他" },
        ]}
        value={isLivingWithFamily}
      />
    </div>
  );

  // 通常の入力フィールドのレンダリング
  const renderInputField = (fieldId: number, label: string, placeholder: string): JSX.Element => (
    <div
      style={{
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "100px",
      }}
    >
      <p>{label}</p>
      {(fieldId === 3 || fieldId === 17)
        ? (
            <DynamicFieldSelect
              id={fieldId as number}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedValue(e.target.value);
              }}
              value={selectedValue}
            />
          )
        : (fieldId === 4)
            ? (
                <GradeSelect />
              )
            : (fieldId === 9)
                ? (
                    <DatePicker
                      onChange={setBirthday}
                      placeholder={placeholder}
                      value={birthday}
                    />
                  )
                : (
                    <Input placeholder={placeholder} />
                  )}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: "600px", margin: "0 auto" }}>
      {fields.map((field) => {
        // 非表示対象のフィールドはスキップ
        if (shouldHideField(field.id)) {
          return null;
        }

        return (
          <div key={field.id}>
            {/* 所属フィールド */}
            {field.id === 5 && renderAffiliationField(field.label)}

            {field.id === 10 && genderSelection(field.label)}

            {/* 実家暮らしフィールド */}
            {field.id === 14 && renderLivingWithFamilyField(field.label)}

            {/* 通常の入力フィールド */}
            {field.id !== 5
              && field.id !== 10
              && field.id !== 14
              && "placeholder" in field
              && field.placeholder
              && renderInputField(field.id, field.label, field.placeholder)}

            {/* 非公開情報の注釈 */}
            {field.id === 8 && (
              <p
                style={{
                  color: "#72787E",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                }}
              >
                <IconMaterialSymbolsLock />
                ここからは公開されない情報です
              </p>
            )}
          </div>
        );
      })}
      <div style={{ marginBlock: "40px", display: "flex", justifyContent: "end" }}>
        <IconButton
          icon={<IconMaterialSymbolsArrowForward />}
          onClick={() => {
            void navigate("/members");
          }}
          variant="filled"
        >
          <p>登録</p>
        </IconButton>
      </div>
    </div>
  );
}

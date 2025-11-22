import type { JSX } from "react";
import type { RegistrationFormData } from "@/schemes/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import DatePicker from "@/components/DatePicker";
import IconButton from "@/components/IconButton";
import { Input } from "@/components/recipes/atomic/Input";
import { RadioGroup } from "@/components/recipes/atomic/RadioGroup";
import { DynamicFieldSelect, GradeSelect } from "@/components/recipes/DomainSelects";
import { registrationSchema } from "@/schemes/registration";

export default function Registration(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema as any),
  });

  const affiliation = watch("affiliation");
  const isLivingWithFamily = watch("isLivingWithFamily");

  const onSubmit = (data: RegistrationFormData): void => {
    // eslint-disable-next-line no-console
    console.log("Form submitted:", data);
    void navigate("/members");
  };

  const fields = [
    { id: 1, label: "名前", placeholder: "石丸凛弥", name: "name" as const },
    { id: 2, label: "フリガナ", placeholder: "インマルリンヤ", name: "furigana" as const },
    { id: 3, label: "卒業(予定)年度", placeholder: "28卒", name: "graduationYear" as const },
    { id: 4, label: "学年", placeholder: "B1", name: "grade" as const },
    { id: 5, label: "所属", type: "select" as const, name: "affiliation" as const },
    { id: 6, label: "学校名", placeholder: "中央大学", name: "schoolName" as const },
    { id: 7, label: "学部名", placeholder: "情報科学科", name: "departmentName" as const },
    { id: 8, label: "他の所属団体", placeholder: "Code", name: "otherAffiliation" as const },
    { id: 9, label: "誕生日", placeholder: "2005/07/18", name: "birthday" as const },
    { id: 10, label: "性別", placeholder: "男性 / 女性 / その他", name: "gender" as const },
    { id: 11, label: "電話番号", placeholder: "090-0000-0000", name: "phoneNumber" as const },
    { id: 12, label: "郵便番号", placeholder: "000-0000", name: "postalCode" as const },
    { id: 13, label: "現在の住所", placeholder: "名古屋市名東区39", name: "currentAddress" as const },
    { id: 14, label: "実家暮らしか", type: "radio" as const, name: "isLivingWithFamily" as const },
    { id: 15, label: "実家の郵便番号", placeholder: "000-0000", name: "familyPostalCode" as const },
    { id: 16, label: "実家の住所", placeholder: "名古屋市名東区39", name: "familyAddress" as const },
    { id: 17, label: "お金を渡した人", placeholder: "石丸", name: "paidPerson" as const },
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
        {errors.affiliation && (
          <p style={{ fontSize: "12px", color: "red" }}>{errors.affiliation.message}</p>
        )}
      </div>
      <RadioGroup
        name="affiliation"
        onChange={(value: string) => {
          setValue("affiliation", value as "内部" | "外部");
        }}
        options={[
          { label: "内部", value: "内部" },
          { label: "外部", value: "外部" },
        ]}
        value={affiliation ?? ""}
      />
    </div>
  );

  // 実家暮らしフィールドのレンダリング
  const renderLivingWithFamilyField = (label: string): JSX.Element => (
    <div style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p style={{ marginBottom: "8px" }}>{label}</p>
        {errors.isLivingWithFamily && (
          <p style={{ fontSize: "12px", color: "red" }}>{errors.isLivingWithFamily.message}</p>
        )}
      </div>
      <RadioGroup
        name="isLivingWithFamily"
        onChange={(value: string) => {
          setValue("isLivingWithFamily", value as "はい" | "いいえ");
        }}
        options={[
          { label: "はい", value: "はい" },
          { label: "いいえ", value: "いいえ" },
        ]}
        value={isLivingWithFamily ?? ""}
      />
    </div>
  );

  const genderSelection = (label: string): JSX.Element => (
    <div style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <p style={{ marginBottom: "8px" }}>{label}</p>
        {errors.gender && (
          <p style={{ fontSize: "12px", color: "red" }}>{errors.gender.message}</p>
        )}
      </div>
      <RadioGroup
        name="gender"
        onChange={(value: string) => {
          setValue("gender", value as "男性" | "女性" | "その他");
        }}
        options={[
          { label: "男性", value: "男性" },
          { label: "女性", value: "女性" },
          { label: "その他", value: "その他" },
        ]}
        value={watch("gender") ?? ""}
      />
    </div>
  );

  // 通常の入力フィールドのレンダリング
  const renderInputField = (field: typeof fields[number]): JSX.Element => {
    if (!("name" in field) || !("placeholder" in field))
      return <></>;

    const fieldName = field.name;
    const error = errors[fieldName];

    return (
      <div
        style={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "100px",
        }}
      >
        <div>
          <p>{field.label}</p>
          {error && (
            <p style={{ fontSize: "12px", color: "red" }}>{error.message as string}</p>
          )}
        </div>
        {(field.id === 3 || field.id === 17)
          ? (
              <DynamicFieldSelect
                {...register(fieldName)}
                id={field.id}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setValue(fieldName, e.target.value);
                }}
                value={watch(fieldName) ?? ""}
              />
            )
          : (field.id === 4)
              ? (
                  <GradeSelect {...register(fieldName)} />
                )
              : (field.id === 9)
                  ? (
                      <DatePicker
                        {...register(fieldName)}
                        onChange={(value: string) => {
                          setValue(fieldName, value);
                        }}
                        placeholder={field.placeholder}
                        value={watch(fieldName) ?? ""}
                      />
                    )
                  : (
                      <Input
                        {...register(fieldName)}
                        placeholder={field.placeholder}
                      />
                    )}
      </div>
    );
  };

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
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
              && renderInputField(field)}

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
          onClick={() => {}}
          type="submit"
          variant="filled"
        >
          <p>登録</p>
        </IconButton>
      </div>
    </form>
  );
}

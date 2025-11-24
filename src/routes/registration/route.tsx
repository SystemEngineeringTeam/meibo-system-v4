import type { JSX } from "react";
import type { RegistrationFormData } from "@/schemes/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toKatakana } from "wanakana";
import DatePicker from "@/components/DatePicker";
import IconButton from "@/components/IconButton";
import { Input } from "@/components/recipes/atomic/Input";
import { RadioGroup } from "@/components/recipes/atomic/RadioGroup";
import { DynamicFieldSelect, GradeSelect } from "@/components/recipes/DomainSelects";
import { registrationSchema } from "@/schemes/registration";

// ※アイコンのimportが抜けている場合は適宜追加してください
// import { IconMaterialSymbolsLock, IconMaterialSymbolsArrowForward } from "@/components/Icons";

type FieldType = "text" | "select" | "radio" | "date" | "grade";

type FormField = {
  id: number;
  label: string;
  name: keyof RegistrationFormData;
  placeholder?: string;
  type?: FieldType;
};

const FORM_FIELDS: FormField[] = [
  { id: 1, label: "名前", name: "name", placeholder: "石丸凛弥" },
  { id: 2, label: "フリガナ", name: "furigana", placeholder: "インマルリンヤ" },
  { id: 3, label: "卒業(予定)年度", name: "graduationYear", placeholder: "28卒", type: "select" },
  { id: 4, label: "学年", name: "grade", type: "grade" },
  { id: 5, label: "所属", name: "affiliation", type: "radio" },
  { id: 6, label: "学籍番号", name: "studentId", placeholder: "k24015" },
  { id: 7, label: "学校名", name: "schoolName", placeholder: "中央大学" },
  { id: 8, label: "学部名", name: "departmentName", placeholder: "情報科学科" },
  { id: 9, label: "他の所属団体", name: "otherAffiliation", placeholder: "Code" },
  { id: 10, label: "誕生日", name: "birthday", placeholder: "2005/07/18", type: "date" },
  { id: 11, label: "性別", name: "gender", type: "radio" },
  { id: 12, label: "電話番号", name: "phoneNumber", placeholder: "090-0000-0000" },
  { id: 13, label: "郵便番号", name: "postalCode", placeholder: "000-0000" },
  { id: 14, label: "現在の住所", name: "currentAddress", placeholder: "名古屋市名東区39" },
  { id: 15, label: "実家暮らしか", name: "isLivingWithFamily", type: "radio" },
  { id: 16, label: "実家の郵便番号", name: "familyPostalCode", placeholder: "000-0000" },
  { id: 17, label: "実家の住所", name: "familyAddress", placeholder: "名古屋市名東区39" },
  { id: 18, label: "お金を渡した人", name: "paidPerson", placeholder: "石丸", type: "select" },
];

const SPECIAL_RENDERING_IDS = {
  AFFILIATION: 5,
  GENDER: 11,
  LIVING_WITH_FAMILY: 15,
  STUDENT_ID: 6,
  OTHER_AFFILIATION: 9,
} as const;

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

  const nameInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isComposing, setIsComposing] = React.useState<boolean>(false);
  const accumulatedFuriganaRef = React.useRef<string>("");

  // IME入力中のひらがなのみをカタカナに変換
  React.useEffect(() => {
    const nameInput = nameInputRef.current;
    if (!nameInput) {
      return;
    }

    const handleCompositionStart = (): void => {
      setIsComposing(true);
    };

    const handleCompositionUpdate = (e: CompositionEvent): void => {
      if (!isComposing) {
        return;
      }
      const inputText = e.data || "";
      // ひらがなのみを抽出（漢字や変換候補を除外）
      const hiraganaOnly = inputText.replace(/[^\u3040-\u309F]/g, "");
      if (hiraganaOnly) {
        const katakanaText = toKatakana(hiraganaOnly);
        const newFurigana = accumulatedFuriganaRef.current + katakanaText;
        setValue("furigana", newFurigana as RegistrationFormData["furigana"]);
      }
    };

    const handleCompositionEnd = (): void => {
      setIsComposing(false);
      // 変換確定時に現在のフリガナを保存
      const currentFurigana = watch("furigana") || "";
      accumulatedFuriganaRef.current = currentFurigana;
    };

    nameInput.addEventListener("compositionstart", handleCompositionStart);
    nameInput.addEventListener("compositionupdate", handleCompositionUpdate as EventListener);
    nameInput.addEventListener("compositionend", handleCompositionEnd);

    return (): void => {
      nameInput.removeEventListener("compositionstart", handleCompositionStart);
      nameInput.removeEventListener("compositionupdate", handleCompositionUpdate as EventListener);
      nameInput.removeEventListener("compositionend", handleCompositionEnd);
    };
  }, [setValue, isComposing, watch]);

  const onSubmit = (_data: RegistrationFormData): void => {
    void navigate("/members");
  };

  // フィールドの表示/非表示を判定
  const shouldHideField = (fieldId: number): boolean => {
    // 内部生の場合、学校名・学部名を非表示
    if (fieldId === 7 || fieldId === 8) {
      return affiliation !== "外部";
    }
    // 学籍番号は内部生の場合のみ表示
    if (fieldId === SPECIAL_RENDERING_IDS.STUDENT_ID) {
      return affiliation !== "内部";
    }
    // 実家暮らしでない場合、実家の郵便番号・住所を非表示
    if (fieldId === 16 || fieldId === 17) {
      return isLivingWithFamily !== "いいえ";
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

  // 性別フィールドのレンダリング
  const renderGenderField = (label: string): JSX.Element => (
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

  // フィールドの特別なレンダリング処理
  const renderSpecialField = (field: FormField): JSX.Element | null => {
    switch (field.id) {
      case SPECIAL_RENDERING_IDS.AFFILIATION:
        return renderAffiliationField(field.label);
      case SPECIAL_RENDERING_IDS.GENDER:
        return renderGenderField(field.label);
      case SPECIAL_RENDERING_IDS.LIVING_WITH_FAMILY:
        return renderLivingWithFamilyField(field.label);
      default:
        return null;
    }
  };

  // フィールドタイプに応じた入力要素のレンダリング
  const renderFieldInput = (field: FormField): JSX.Element => {
    const fieldName = field.name;

    switch (field.id) {
      case 1: {
        // 名前フィールド：hook-formのrefと自前のrefをマージする
        const { ref: hookFormRef, ...rest } = register(fieldName);
        return (
          <Input
            {...rest}
            placeholder={field.placeholder}
            ref={(e) => {
              // hook-formに通知
              hookFormRef(e);
              // 自前のrefに保存 (型アサーションが必要な場合は as HTMLInputElement | null 等を追加)
              nameInputRef.current = e;
            }}
          />
        );
      }
      case 2:
        // フリガナフィールド
        return (
          <Input
            {...register(fieldName)}
            placeholder={field.placeholder}
          />
        );
      case 3:
        return (
          <DynamicFieldSelect
            {...register(fieldName)}
            id={field.id}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setValue(fieldName, e.target.value);
            }}
            value={watch(fieldName) ?? ""}
          />
        );
      case 18:
        return (
          <DynamicFieldSelect
            {...register(fieldName)}
            id={17} // 18のidに対してDynamicFieldSelectのidをどう渡すかは元のロジックに従います
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setValue(fieldName, e.target.value);
            }}
            value={watch(fieldName) ?? ""}
          />
        );
      case 4:
        return <GradeSelect {...register(fieldName)} />;
      case 10:
        return (
          <DatePicker
            {...register(fieldName)}
            onChange={(value: string) => {
              setValue(fieldName, value);
            }}
            placeholder={field.placeholder ?? ""}
            value={watch(fieldName) ?? ""}
          />
        );
      default:
        return (
          <Input
            {...register(fieldName)}
            placeholder={field.placeholder}
          />
        );
    }
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
      {FORM_FIELDS.map((field) => {
        if (shouldHideField(field.id)) {
          return null;
        }

        const specialField = renderSpecialField(field);

        return (
          <div key={field.id}>
            {specialField || (
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
                  {errors[field.name] && (
                    <p style={{ fontSize: "12px", color: "red" }}>{errors[field.name]?.message as string}</p>
                  )}
                </div>
                {renderFieldInput(field)}
              </div>
            )}

            {/* 非公開情報の注釈 */}
            {field.id === SPECIAL_RENDERING_IDS.OTHER_AFFILIATION && (
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
                {/* アイコンコンポーネントがimportされていない場合はコメントアウトしてください */}
                <IconMaterialSymbolsLock />
                ここからは公開されない情報です
              </p>
            )}
          </div>
        );
      })}
      <div style={{ marginBlock: "40px", display: "flex", justifyContent: "end" }}>
        <IconButton
          // アイコンコンポーネントがimportされていない場合はコメントアウトしてください
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

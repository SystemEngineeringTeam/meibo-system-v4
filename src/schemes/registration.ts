import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, { message: "名前を入力してください" }),
  furigana: z.string()
    .min(1, { message: "フリガナを入力してください" })
    .regex(/^[\u30A1-\u30F6ー]+$/, { message: "フリガナはカタカナで入力してください" }),
  graduationYear: z.string().min(1, { message: "卒業年度を選択してください" }),
  grade: z.string().min(1, { message: "学年を選択してください" }),
  affiliation: z.enum(["内部", "外部"], { message: "所属を選択してください" }),
  schoolName: z.string().optional(),
  departmentName: z.string().optional(),
  otherAffiliation: z.string().optional(),
  birthday: z.string().min(1, { message: "誕生日を入力してください" }),
  gender: z.enum(["男性", "女性", "その他"], { message: "性別を選択してください" }),
  phoneNumber: z.string()
    .min(1, { message: "電話番号を入力してください" })
    .regex(/^[\d-]+$/, { message: "半角で入力してください" }),
  postalCode: z.string()
    .min(1, { message: "郵便番号を入力してください" })
    .regex(/^\d{3}-\d{4}$/, { message: "郵便番号は000-0000の形式で入力してください" }),
  currentAddress: z.string().min(1, { message: "現在の住所を入力してください" }),
  isLivingWithFamily: z.enum(["はい", "いいえ"], { message: "実家暮らしかどうかを選択してください" }),
  familyPostalCode: z.string().optional(),
  familyAddress: z.string().optional(),
  paidPerson: z.string().min(1, { message: "お金を渡した人を入力してください" }),
}).refine((data) => {
  // 外部生の場合、学校名と学部名は必須
  if (data.affiliation === "外部") {
    return (data.schoolName?.length ?? 0) > 0
      && (data.departmentName?.length ?? 0) > 0;
  }
  return true;
}, {
  message: "外部生の場合、学校名と学部名を入力してください",
  path: ["schoolName"],
}).refine((data) => {
  // 実家暮らしでない場合、実家の郵便番号と住所は必須
  if (data.isLivingWithFamily === "いいえ") {
    return (data.familyPostalCode?.length ?? 0) > 0
      && (data.familyAddress?.length ?? 0) > 0;
  }
  return true;
}, {
  message: "実家暮らしでない場合、実家の郵便番号と住所を入力してください",
  path: ["familyPostalCode"],
}).refine((data) => {
  // 実家暮らしでない場合、実家の郵便番号の形式チェック
  if (data.isLivingWithFamily === "いいえ" && data.familyPostalCode !== undefined) {
    return /^\d{3}-\d{4}$/.test(data.familyPostalCode);
  }
  return true;
}, {
  message: "実家の郵便番号は000-0000の形式で入力してください",
  path: ["familyPostalCode"],
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

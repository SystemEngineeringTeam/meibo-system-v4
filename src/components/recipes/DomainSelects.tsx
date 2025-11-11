import type { ComponentProps, ReactElement } from "react";
import type { OmitStrict } from "@/types/utils";
import { HStack } from "panda/jsx";
import { match } from "ts-pattern";
import { useControlledSelect } from "@/lib/hooks/useControlledSelect";
import { Select } from "./atomic/Input";

// 卒業年度のロジック
export function getGraduationYears(): string[] {
  const currentYear = new Date().getFullYear();
  const startYear = 2026; // 26卒の年
  const graduationYears: string[] = [];

  // 26卒から現在の年+4年まで、1年ごとに生成
  for (let year = startYear; year <= currentYear + 4; year += 1) {
    const yearStr = year.toString().slice(-2); // 下2桁を取得
    graduationYears.push(`${yearStr}卒`);
  }

  return graduationYears;
}

export function getInitialGraduationYear(): string {
  const graduationYears = getGraduationYears();
  // 最新の卒業年を初期値として返す
  return graduationYears[graduationYears.length - 1] ?? "26卒";
}

// 学年のロジック
export function getGradeOptions(): string[] {
  return ["B1", "B2", "B3", "B4", "M1", "M2"];
}

export function getOfficer(): string[] {
  return ["石丸", "加藤", "町田", "真弓"];
}

export function getInitialGrade(): string {
  return "B1";
}

// 卒業年度Selectコンポーネント
export function GraduationYearSelect(
  props: ComponentProps<typeof Select>,
): ReactElement {
  const graduationYears = getGraduationYears();

  return (
    <Select {...props}>
      {graduationYears.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </Select>
  );
}

type IconGraduationYearSelectProps = {
  icon: ReactElement;
  iconPosition?: "left" | "right";
  value: string | undefined;
  onChange: ((e: React.ChangeEvent<HTMLSelectElement>) => void) | undefined;
} & OmitStrict<ComponentProps<typeof GraduationYearSelect>, "value" | "onChange">;

export function IconGraduationYearSelect(
  {
    icon,
    iconPosition = "left",
    value,
    onChange,
    ...rest
  }: IconGraduationYearSelectProps,
): ReactElement {
  const { value: currentValue, onChange: handleChange } = useControlledSelect({
    value,
    onChange,
    initialValue: getInitialGraduationYear(),
  });

  return (
    <HStack
      alignItems="center"
      gap="5px"
      style={{
        flexDirection: match(iconPosition)
          .with("left", () => "row" as const)
          .with("right", () => "row-reverse" as const)
          .exhaustive(),
      }}
    >
      <GraduationYearSelect
        {...rest}
        onChange={handleChange}
        value={currentValue}
      />
    </HStack>
  );
}

// 学年Selectコンポーネント
export function GradeSelect(
  props: ComponentProps<typeof Select>,
): ReactElement {
  const gradeOptions = getGradeOptions();

  return (
    <Select {...props}>
      {gradeOptions.map((grade) => (
        <option key={grade} value={grade}>
          {grade}
        </option>
      ))}
    </Select>
  );
}

type IconGradeSelectProps = {
  icon: ReactElement;
  iconPosition?: "left" | "right";
  value: string | undefined;
  onChange: ((e: React.ChangeEvent<HTMLSelectElement>) => void) | undefined;
} & OmitStrict<ComponentProps<typeof GradeSelect>, "value" | "onChange">;

export function IconGradeSelect(
  {
    icon,
    iconPosition = "left",
    value,
    onChange,
    ...rest
  }: IconGradeSelectProps,
): ReactElement {
  const { value: currentValue, onChange: handleChange } = useControlledSelect({
    value,
    onChange,
    initialValue: getInitialGrade(),
  });

  return (
    <HStack
      alignItems="center"
      gap="5px"
      style={{
        flexDirection: match(iconPosition)
          .with("left", () => "row" as const)
          .with("right", () => "row-reverse" as const)
          .exhaustive(),
      }}
    >
      {icon}
      <GradeSelect
        {...rest}
        onChange={handleChange}
        value={currentValue}
      />
    </HStack>
  );
}

// 役員Selectコンポーネント
export function OfficerSelect(
  props: ComponentProps<typeof Select>,
): ReactElement {
  const officerOptions = getOfficer();

  return (
    <Select {...props}>
      {officerOptions.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </Select>
  );
}

// IDに応じて表示するSelectコンポーネント
type DynamicFieldSelectProps = {
  id: number;
  value: string | undefined;
  onChange: ((e: React.ChangeEvent<HTMLSelectElement>) => void) | undefined;
} & OmitStrict<ComponentProps<typeof Select>, "id" | "value" | "onChange">;

export function DynamicFieldSelect(
  { id, value, onChange, ...rest }: DynamicFieldSelectProps,
): ReactElement {
  const { value: graduationValue, onChange: graduationHandleChange } = useControlledSelect({
    value: id === 3 ? value : undefined,
    onChange: id === 3 ? onChange : undefined,
    initialValue: getInitialGraduationYear(),
  });

  // id=3の場合は卒業年度
  if (id === 3) {
    return (
      <GraduationYearSelect
        {...rest}
        onChange={graduationHandleChange}
        value={graduationValue}
      />
    );
  }

  // id=17の場合は役員リスト
  if (id === 17) {
    return <OfficerSelect {...rest} onChange={onChange} value={value} />;
  }

  // その他のidの場合は通常のSelect
  return <Select {...rest} onChange={onChange} value={value} />;
}

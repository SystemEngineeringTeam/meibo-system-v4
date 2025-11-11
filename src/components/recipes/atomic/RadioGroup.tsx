import type { JSX } from "react";

type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  gap?: string;
};

export function RadioGroup({ name, options, value, onChange, gap = "20px" }: RadioGroupProps): JSX.Element {
  return (
    <div style={{ display: "flex", gap }}>
      {options.map((option) => (
        <label key={option.value} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            checked={value === option.value}
            name={name}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            type="radio"
            value={option.value}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

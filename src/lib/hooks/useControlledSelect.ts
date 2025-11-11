import type { ChangeEvent } from "react";
import { useState } from "react";

type UseControlledSelectProps<T> = {
  value: T | undefined;
  onChange: ((e: ChangeEvent<HTMLSelectElement>) => void) | undefined;
  initialValue: T;
};

export function useControlledSelect<T extends string>(
  { value, onChange, initialValue }: UseControlledSelectProps<T>,
): {
  value: T;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
} {
  const [internalValue, setInternalValue] = useState<T>(initialValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (!isControlled) {
      setInternalValue(e.target.value as T);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return {
    value: currentValue,
    onChange: handleChange,
  };
}

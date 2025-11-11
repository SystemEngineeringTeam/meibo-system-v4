import type { ReactElement } from "react";
import type { DateValue } from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { useRef, useState } from "react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DialogTrigger,
  Heading,
  Popover,
} from "react-aria-components";
import IconInput from "./IconInput";

type DatePickerProps = {
  placeholder?: string;
  value?: string;
  onChange?: (date: string) => void;
};

export default function DatePicker({
  placeholder = "日付を選択",
  value,
  onChange,
}: DatePickerProps): ReactElement {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(() => {
    if (value === null || value === undefined || value.trim() === "") {
      return null;
    }
    return parseDate(value);
  });
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleDateChange = (date: DateValue): void => {
    setSelectedDate(date);
    const formattedDate = `${date.year}/${String(date.month).padStart(2, "0")}/${String(date.day).padStart(2, "0")}`;
    onChange?.(formattedDate);
  };

  const displayValue = selectedDate
    ? `${selectedDate.year}/${String(selectedDate.month).padStart(2, "0")}/${String(selectedDate.day).padStart(2, "0")}`
    : "";

  return (
    <DialogTrigger>
      <Button
        ref={triggerRef}
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
        }}
      >
        <IconInput
          endAdornment={<IconMaterialSymbolsCalendarMonth />}
          placeholder={placeholder}
          readOnly
          value={displayValue}
        />
      </Button>
      <Popover placement="bottom">
        <div
          style={{
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "8px",
            padding: "16px",
            zIndex: 1000,
          }}
        >
          <Calendar
            aria-label="日付を選択"
            onChange={handleDateChange}
            value={selectedDate}
          >
            <header
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Button
                slot="previous"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <IconMaterialSymbolsChevronLeft />
              </Button>
              <Heading style={{ fontSize: "16px", fontWeight: "bold" }} />
              <Button
                slot="next"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <IconMaterialSymbolsChevronRight />
              </Button>
            </header>
            <CalendarGrid
              style={{
                borderCollapse: "collapse",
                width: "100%",
              }}
            >
              {(date) => (
                <CalendarCell
                  date={date}
                  style={{
                    border: "1px solid #e0e0e0",
                    cursor: "pointer",
                    padding: "8px",
                    textAlign: "center",
                  }}
                />
              )}
            </CalendarGrid>
          </Calendar>
        </div>
      </Popover>
    </DialogTrigger>
  );
}

import * as React from "react";
import { DateRange, DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

import "react-day-picker/dist/style.css";

interface CalendarProps {
  mode: "range";
  selected: DateRange;
  onSelect?: (date: DateRange) => void;
  numberOfMonths?: number;
  initialFocus?: boolean;
  defaultMonth?: Date;
}

export function Calendar({
  mode = "range",
  selected,
  onSelect,
  numberOfMonths = 1,
  initialFocus = false,
  defaultMonth,
}: CalendarProps) {
  return (
    <DayPicker
      mode={mode}
      selected={selected}
      onSelect={onSelect}
      numberOfMonths={numberOfMonths}
      defaultMonth={defaultMonth}
      showOutsideDays
      className={cn("p-3")}
      required={true}
      classNames={{
        month:
          "text-center text-gray-blue text-[12px] font-bold leading-[15px]",
        weekday:
          "text-center text-gray-blue text-[15px] leading-[20px] font-black",
        day: "text-center text-gray-blue text-[15px] font-normal leading-[20px] p-",
        selected: "text-[15px] font-semibold leading-[20px]",
        range_start: "bg-primary rounded-[3px] text-white text-[15px]",
        range_middle: "text-[15px] text-gray-blue font-semibold bg-outline",
        range_end: "bg-primary rounded-[3px] text-white text-[15px]",
        today: "text-black font-black text-[15px]",
        chevron: "fill-black",
      }}
    />
  );
}

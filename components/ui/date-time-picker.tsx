"use client";

import { useEffect, useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { enUS, vi as viLocale } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, RotateCcw, X } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { OverflowTooltip } from "@/components/design-system/overflow-tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";

  return {
    value: `${hour}:${minute}`,
    label: `${hour}:${minute}`,
  };
});

function toCalendarValue(value?: string) {
  if (!value) return { date: undefined, time: "" };

  const parsedDate = parse(value, "yyyy-MM-dd'T'HH:mm", new Date());
  if (Number.isNaN(parsedDate.getTime())) {
    return { date: undefined, time: "" };
  }

  return {
    date: parsedDate,
    time: format(parsedDate, "HH:mm"),
  };
}

function weekdayLabels(localeCode: string) {
  const locale = localeCode === "vi" ? viLocale : enUS;
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  return eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart, { weekStartsOn: 1 }),
  }).map((date) => format(date, "EEEEE", { locale }));
}

export function DateTimePicker({
  value,
  onChange,
  placeholder,
  dateLabel,
  timeLabel,
  clearLabel,
  todayLabel,
  noValueLabel,
  disabled,
}: {
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  dateLabel: string;
  timeLabel: string;
  clearLabel: string;
  todayLabel: string;
  noValueLabel: string;
  disabled?: boolean;
}) {
  const localeCode = useLocale();
  const locale = localeCode === "vi" ? viLocale : enUS;
  const initial = useMemo(() => toCalendarValue(value), [value]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initial.date);
  const [selectedTime, setSelectedTime] = useState(initial.time);
  const [visibleMonth, setVisibleMonth] = useState(
    initial.date ?? new Date(),
  );

  useEffect(() => {
    setSelectedDate(initial.date);
    setSelectedTime(initial.time);
    if (initial.date) {
      setVisibleMonth(initial.date);
    }
  }, [initial.date, initial.time]);

  const days = useMemo(() => {
    const monthStart = startOfMonth(visibleMonth);
    const monthEnd = endOfMonth(visibleMonth);

    return eachDayOfInterval({
      start: startOfWeek(monthStart, { weekStartsOn: 1 }),
      end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
    });
  }, [visibleMonth]);

  const labels = useMemo(() => weekdayLabels(localeCode), [localeCode]);

  const displayValue =
    selectedDate && selectedTime
      ? `${format(selectedDate, "PPP", { locale })} · ${selectedTime}`
      : selectedDate
        ? format(selectedDate, "PPP", { locale })
        : noValueLabel;

  const commitValue = (date: Date | undefined, time: string) => {
    if (!date) {
      onChange("");
      return;
    }

    if (!time) {
      onChange("");
      return;
    }

    onChange(`${format(date, "yyyy-MM-dd")}T${time}`);
  };

  const handleDateSelect = (date: Date) => {
    const nextTime = selectedTime || "09:00";
    setSelectedDate(date);
    setSelectedTime(nextTime);
    commitValue(date, nextTime);
  };

  const handleTimeChange = (nextTime: string) => {
    setSelectedTime(nextTime);
    commitValue(selectedDate, nextTime);
  };

  const handleClear = () => {
    setSelectedDate(undefined);
    setSelectedTime("");
    onChange("");
    setOpen(false);
  };

  const handleToday = () => {
    const today = new Date();
    const nextTime = selectedTime || "09:00";
    setVisibleMonth(today);
    setSelectedDate(today);
    setSelectedTime(nextTime);
    commitValue(today, nextTime);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-11 w-full justify-between rounded-xl border-border/70 px-3.5 text-left font-medium text-slate-700 shadow-sm hover:bg-white",
            !selectedDate && "text-slate-400",
          )}
          disabled={disabled}
        >
          <span className="flex min-w-0 items-center gap-2 overflow-hidden">
            <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
            <OverflowTooltip
              content={selectedDate || selectedTime ? displayValue : placeholder}
              className="min-w-0 flex-1"
              contentClassName="max-w-[min(24rem,calc(100vw-2rem))]"
            >
              <span className="truncate">{selectedDate || selectedTime ? displayValue : placeholder}</span>
            </OverflowTooltip>
          </span>
          {(selectedDate || selectedTime) && !disabled ? (
            <span
              className="rounded-md p-1 text-slate-400 transition hover:bg-[var(--secondary)] hover:text-slate-700"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleClear();
              }}
            >
              <X className="h-4 w-4" />
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[min(22rem,calc(100vw-2rem))] space-y-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">{dateLabel}</p>
            <p className="text-xs text-slate-500">{timeLabel}</p>
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 px-0"
              onClick={() => setVisibleMonth((current) => subMonths(current, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 px-0"
              onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-[var(--secondary)]/35 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">
              {format(visibleMonth, "MMMM yyyy", { locale })}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-xs font-semibold"
              onClick={handleToday}
            >
              {todayLabel}
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
            {labels.map((label, index) => (
              <span key={`${label}-${index}`} className="py-1">
                {label}
              </span>
            ))}
          </div>

          <div className="mt-2 grid grid-cols-7 gap-1">
            {days.map((day) => {
              const isCurrentMonth = isSameMonth(day, visibleMonth);
              const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  className={cn(
                    "flex h-10 items-center justify-center rounded-xl text-sm font-medium transition",
                    isSelected
                      ? "bg-[var(--primary)] text-white shadow-[0_10px_20px_-16px_rgba(15,95,115,0.7)]"
                      : isCurrentMonth
                        ? "text-slate-700 hover:bg-white"
                        : "text-slate-300 hover:bg-white/70",
                  )}
                  onClick={() => handleDateSelect(day)}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            <Clock3 className="h-3.5 w-3.5 text-[var(--primary)]" />
            {timeLabel}
          </div>
          <Select value={selectedTime} onValueChange={handleTimeChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {TIME_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="justify-start text-slate-500"
            onClick={handleClear}
          >
            <RotateCcw className="h-4 w-4" />
            {clearLabel}
          </Button>
          <div className="rounded-xl bg-[var(--secondary)]/55 px-3 py-2 text-xs leading-5 text-slate-500">
            {selectedDate && selectedTime ? displayValue : noValueLabel}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

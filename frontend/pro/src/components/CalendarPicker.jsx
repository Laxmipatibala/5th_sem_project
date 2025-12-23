import { useState, useMemo } from "react";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function isSameDay(a, b) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarPicker({
  label,
  value,
  onChange,
  minDate,
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const min = minDate ? startOfDay(minDate) : today;

  const initialMonth = value ? new Date(value) : min;
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1)
  );

  const days = useMemo(() => {
    const start = new Date(currentMonth);
    const firstDayWeekIndex = start.getDay(); // 0-6
    const result = [];

    // Fill leading empty slots
    for (let i = 0; i < firstDayWeekIndex; i++) {
      result.push(null);
    }

    // Fill days of month
    const month = currentMonth.getMonth();
    while (start.getMonth() === month) {
      result.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }

    return result;
  }, [currentMonth]);

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const handleSelect = (day) => {
    if (!day) return;
    const normalized = startOfDay(day);
    if (normalized < min) return;
    onChange(normalized);
  };

  const selectedDate = value ? new Date(value) : null;

  return (
    <div className="bg-black/70 border border-white/10 rounded-2xl p-4 text-white w-full">
      {label && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm md:text-base text-gray-200">{label}</span>
          {selectedDate && (
            <span className="text-xs md:text-sm text-gray-400">
              {selectedDate.toDateString()}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-2 text-xs md:text-sm text-gray-300">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="px-2 py-1 rounded hover:bg-white/10"
        >
          ‹
        </button>
        <span className="font-semibold">
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="px-2 py-1 rounded hover:bg-white/10"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-[11px] md:text-xs text-gray-400 mb-1">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm md:text-base">
        {days.map((day, idx) => {
          if (!day) {
            return <div key={idx} />;
          }

          const normalized = startOfDay(day);
          const isDisabled = normalized < min;
          const isSelected = isSameDay(normalized, selectedDate);

          return (
            <button
              type="button"
              key={idx}
              onClick={() => handleSelect(day)}
              disabled={isDisabled}
              className={`h-8 md:h-9 w-8 md:w-9 rounded-full flex items-center justify-center text-xs md:text-sm
                ${
                  isSelected
                    ? "bg-red-600 text-white"
                    : isDisabled
                    ? "text-gray-600 cursor-not-allowed"
                    : "text-gray-100 hover:bg-white/10"
                }`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}





import { DayPicker } from 'react-day-picker';
import { parseISO } from 'date-fns';
import 'react-day-picker/dist/style.css';

export default function DateRangePicker({ bookedRanges, value, onChange }) {
  const disabled = [
    { before: new Date() },
    ...bookedRanges.map((r) => ({ from: parseISO(r.checkIn), to: parseISO(r.checkOut) })),
  ];

  return (
    <DayPicker
      mode="range"
      selected={value}
      onSelect={onChange}
      disabled={disabled}
      excludeDisabled
      numberOfMonths={1}
      min={1}
    />
  );
}

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function DateRangePicker({ bookedRanges, value, onChange }) {
  const disabled = [
    { before: new Date() },
    ...bookedRanges.map((r) => ({ from: new Date(r.checkIn), to: new Date(r.checkOut) })),
  ];

  return (
    <DayPicker
      mode="range"
      selected={value}
      onSelect={onChange}
      disabled={disabled}
      numberOfMonths={1}
      min={1}
    />
  );
}

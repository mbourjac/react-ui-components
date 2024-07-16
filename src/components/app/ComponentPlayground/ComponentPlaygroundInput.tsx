import type { ChangeEvent } from 'react';

type ComponentPlaygroundTextProps = {
  label: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ComponentPlaygroundInput = ({
  label,
  value,
  onChange,
}: ComponentPlaygroundTextProps) => {
  return (
    <label className="flex w-full justify-between gap-4 border-b border-primary/50">
      <span>{label}</span>
      <input
        type="text"
        name={label}
        value={value.toString()}
        onChange={onChange}
        className="w-full bg-off-black text-right"
      />
    </label>
  );
};

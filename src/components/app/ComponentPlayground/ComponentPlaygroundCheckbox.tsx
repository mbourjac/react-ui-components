import type { ChangeEvent } from 'react';

type ComponentPlaygroundCheckboxProps = {
  label: string;
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const ComponentPlaygroundCheckbox = ({
  label,
  isChecked,
  onChange,
}: ComponentPlaygroundCheckboxProps) => {
  return (
    <div>
      <input
        type="checkbox"
        name={label}
        id={label}
        checked={isChecked}
        className="peer size-0 opacity-0 focus:outline-none"
        onChange={onChange}
      />
      <label
        htmlFor={label}
        className="inline-block cursor-pointer rounded-full border border-primary/50 bg-off-black px-3 py-1 text-sm text-primary peer-checked:bg-primary peer-checked:text-off-black peer-focus-visible:ring peer-focus-visible:ring-orange-700 peer-focus-visible:ring-offset-2"
      >
        <span>{label}</span>
      </label>
    </div>
  );
};

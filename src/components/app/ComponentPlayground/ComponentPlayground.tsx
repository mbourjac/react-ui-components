import {
  type ChangeEvent,
  cloneElement,
  isValidElement,
  type ReactNode,
  useState,
} from 'react';
import { ComponentPlaygroundCheckbox } from './ComponentPlaygroundCheckbox';
import { ComponentPlaygroundInput } from './ComponentPlaygroundInput';

export type ComponentPlaygroundProps = {
  children: ReactNode;
};

export const ComponentPlayground = <T extends Record<string, unknown>>({
  children,
}: ComponentPlaygroundProps) => {
  const [componentKey, setComponentKey] = useState(0);
  const [componentProps, setComponentProps] = useState<T>(children.props);

  const componentPropsEntries = Object.entries(componentProps);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setComponentProps((prevComponentProps) => ({
      ...prevComponentProps,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setComponentKey((prevComponentKey) => prevComponentKey + 1);
  };

  return (
    <div className="text-pretty rounded-2xl bg-off-black">
      <h2 className="border-b border-primary px-4 py-2">Playground</h2>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col rounded-b-2xl bg-off-black">
          {isValidElement<T>(children) &&
            cloneElement(children, { ...componentProps, key: componentKey })}
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {componentPropsEntries.map(([key, value]) => {
              if (
                (typeof value !== 'string' && typeof value !== 'number') ||
                key === 'className'
              )
                return null;

              return (
                <ComponentPlaygroundInput
                  key={key}
                  label={key}
                  value={value}
                  onChange={handleInputChange}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {componentPropsEntries.map(([key, value]) => {
              if (typeof value !== 'boolean') return null;

              return (
                <ComponentPlaygroundCheckbox
                  key={key}
                  label={key}
                  isChecked={value}
                  onChange={handleInputChange}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

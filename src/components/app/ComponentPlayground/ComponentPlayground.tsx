import { type ChangeEvent, useMemo, useState } from 'react';
import type { PlaygroundProps } from '../../../App.types';
import { ComponentPlaygroundCheckbox } from './ComponentPlaygroundCheckbox';
import { ComponentPlaygroundInput } from './ComponentPlaygroundInput';

export type ComponentPlaygroundProps<T extends Record<string, unknown>> = {
  component: (props: T) => JSX.Element;
  playgroundProps: PlaygroundProps<T>;
};

export const ComponentPlayground = <T extends Record<string, unknown>>({
  component: Component,
  playgroundProps,
}: ComponentPlaygroundProps<T>) => {
  const initialControlledPropsEntries = useMemo(
    () =>
      playgroundProps.controlledPropsKeys.map(
        (key) => [key, playgroundProps.props[key]] as const,
      ),
    [playgroundProps],
  );

  const initialControlledProps = useMemo(
    () => Object.fromEntries(initialControlledPropsEntries) as Partial<T>,
    [initialControlledPropsEntries],
  );

  const [componentKey, setComponentKey] = useState(0);
  const [controlledProps, setControlledProps] = useState(
    initialControlledProps,
  );

  const controlledPropsEntries = useMemo(
    () => Object.entries(controlledProps),
    [controlledProps],
  );

  const componentProps = useMemo(
    () => ({
      ...playgroundProps.props,
      ...controlledProps,
    }),
    [controlledProps, playgroundProps],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    setControlledProps((prevControlledProps) => ({
      ...prevControlledProps,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setComponentKey((prevComponentKey) => prevComponentKey + 1);
  };

  return (
    <div className="text-pretty rounded-2xl bg-off-black">
      <h2 className="border-b border-primary px-4 py-2">Playground</h2>
      <div className="flex flex-col">
        <div className="flex min-h-96 flex-col items-center justify-center rounded-b-2xl bg-off-black">
          <Component key={componentKey} {...componentProps} />
        </div>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-3">
            {controlledPropsEntries.map(([key, value]) => {
              if (typeof value !== 'string' && typeof value !== 'number')
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
            {controlledPropsEntries.map(([key, value]) => {
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

import type { ReactNode } from 'react';
import type { ComponentData } from '../../App.types';
import { ComponentPlayground } from './ComponentPlayground/ComponentPlayground';
import { ComponentPreview } from './ComponentPreview';
import { ComponentProps } from './ComponentProps';

type ComponentPageProps<T extends Record<string, unknown>> = {
  componentData: ComponentData<T>;
  children: ReactNode;
};

export const ComponentPage = <T extends Record<string, unknown>>({
  componentData,
  children,
}: ComponentPageProps<T>) => {
  const { name, description, code, propsData, component, playgroundProps } =
    componentData;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h1 className="rounded-2xl bg-off-black p-4 text-lg uppercase">
          {name}
        </h1>
        <p className="text-pretty rounded-2xl bg-off-black p-4">
          {description}
        </p>
      </div>
      <ComponentPreview code={code}>{children}</ComponentPreview>
      <ComponentProps propsData={propsData} />
      {component && playgroundProps && (
        <ComponentPlayground
          component={component}
          playgroundProps={playgroundProps}
        />
      )}
    </>
  );
};

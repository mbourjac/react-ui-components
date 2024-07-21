import { ReactNode } from '@tanstack/react-router';
import type { ComponentData } from '../../App.types';
import { ComponentPlayground } from './ComponentPlayground/ComponentPlayground';
import { ComponentPreview } from './ComponentPreview';
import { ComponentProps } from './ComponentProps';

type ComponentPageProps = {
  componentData: ComponentData;
  children: ReactNode;
};

export const ComponentPage = ({
  componentData,
  children,
}: ComponentPageProps) => {
  const { name, description, code, propsData } = componentData;

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
      <ComponentPlayground>{children}</ComponentPlayground>
    </>
  );
};

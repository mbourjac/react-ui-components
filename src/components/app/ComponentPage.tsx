import type { ComponentData, PlaygroundProps } from '../../App.types';
import { ComponentPlayground } from './ComponentPlayground/ComponentPlayground';
import { ComponentPreview } from './ComponentPreview';
import { ComponentProps } from './ComponentProps';

type ComponentPageProps<T extends Record<string, unknown>> = {
  componentData: ComponentData<T>;
  component: (props: T) => JSX.Element;
  previewProps: T;
  playgroundProps?: PlaygroundProps<T>;
};

export const ComponentPage = <T extends Record<string, unknown>>({
  componentData,
  component,
  previewProps,
  playgroundProps,
}: ComponentPageProps<T>) => {
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
      <ComponentPreview
        component={component}
        previewProps={previewProps}
        code={code}
      />
      <ComponentProps propsData={propsData} />
      {playgroundProps && (
        <ComponentPlayground
          component={component}
          playgroundProps={playgroundProps}
        />
      )}
    </>
  );
};

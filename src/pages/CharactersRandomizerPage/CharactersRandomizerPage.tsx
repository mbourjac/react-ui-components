import { ComponentPreview } from '../../components/app/ComponentPreview';
import { ComponentProps } from '../../components/app/ComponentProps';
import { useComponent } from '../../hooks/use-component';

export const CharactersRandomizerPage = () => {
  const { name, description, componentPreview, code, props } = useComponent();

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
      <ComponentPreview component={componentPreview} code={code} />
      <ComponentProps props={props} />
    </>
  );
};

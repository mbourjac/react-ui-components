import { ComponentContainer } from '../../components/app/ComponentContainer';
import { useComponent } from '../../hooks/use-component';
import { CharactersRandomizer } from './CharactersRandomizer';

export const CharactersRandomizerPage = () => {
  const { name, description } = useComponent();

  return (
    <div className="flex w-full flex-col gap-8 text-primary">
      <div className="flex flex-col gap-2">
        <h1 className="rounded-2xl bg-off-black p-4 text-lg uppercase">
          {name}
        </h1>
        <p className="text-pretty rounded-2xl bg-off-black p-4">
          {description}
        </p>
      </div>
      <ComponentContainer
        code="Lorem ipsum"
        previewPanelClassName="text-4xl font-semibold uppercase"
      >
        <>
          <CharactersRandomizer
            className="break-words"
            referenceString="Lorem ipsum dolor sit amet."
            isConcurrent
          />
        </>
      </ComponentContainer>
    </div>
  );
};

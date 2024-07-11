import { useComponent } from '../../hooks/use-component';

export const CharactersRandomizerPage = () => {
  const { name } = useComponent();

  return (
    <div className="flex w-full flex-col text-primary">
      <h1 className="rounded-2xl bg-off-black p-4 text-lg uppercase">{name}</h1>
    </div>
  );
};

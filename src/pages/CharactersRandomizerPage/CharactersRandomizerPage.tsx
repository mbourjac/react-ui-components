import { useComponent } from '../../hooks/use-component';

export const CharactersRandomizerPage = () => {
  const { name, description } = useComponent();

  return (
    <div className="flex w-full flex-col gap-4 text-primary">
      <h1 className="rounded-2xl bg-off-black p-4 text-lg uppercase">{name}</h1>
      <p className="rounded-2xl bg-off-black p-4">{description}</p>
    </div>
  );
};

import { ComponentPage } from '../../components/app/ComponentPage';
import { CharactersRandomizer } from './CharactersRandomizer';
import { CHARACTERS_RANDOMIZER_DATA } from './CharactersRandomizerPage.constants';

export const CharactersRandomizerPage = () => {
  return (
    <ComponentPage componentData={CHARACTERS_RANDOMIZER_DATA}>
      <CharactersRandomizer
        referenceString="Lorem ipsum dolor sit amet."
        isConcurrent
        keepSpaces
        className="mx-auto text-balance break-words py-16 text-4xl font-semibold uppercase"
      />
    </ComponentPage>
  );
};

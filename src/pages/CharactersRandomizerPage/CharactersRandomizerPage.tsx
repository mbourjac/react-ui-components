import { useMemo } from 'react';
import { ComponentPage } from '../../components/app/ComponentPage';
import { CharactersRandomizer } from './CharactersRandomizer';
import { CHARACTERS_RANDOMIZER_DATA } from './CharactersRandomizerPage.constants';

export const CharactersRandomizerPage = () => {
  // Display preview component
  const previewProps = useMemo(
    () => ({
      referenceString: 'Lorem ipsum dolor sit amet.',
      isConcurrent: true,
      keepSpaces: true,
      className:
        'text-balance break-words px-6 py-16 text-[calc(2vw+0.5rem)] font-bold uppercase leading-none tracking-wider text-white md:px-24',
    }),
    [],
  );

  // Display playground component
  // Props with default values need to be defined so that they can be used as playground controls
  const playgroundProps = useMemo(
    () => ({
      props: {
        ...previewProps,
        delay: 65,
      },
      controlledPropsKeys: [
        'referenceString' as const,
        'delay' as const,
        'isConcurrent' as const,
      ],
    }),
    [previewProps],
  );

  return (
    <ComponentPage
      componentData={CHARACTERS_RANDOMIZER_DATA}
      component={CharactersRandomizer}
      previewProps={previewProps}
      playgroundProps={playgroundProps}
    />
  );
};

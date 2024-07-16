import type { UiComponent } from './App.types';
import { CharactersRandomizer } from './pages/CharactersRandomizerPage/CharactersRandomizer';

export const UI_COMPONENTS: UiComponent[] = [
  {
    pathname: '/characters-randomizer',
    name: 'Characters Randomizer',
    tags: ['text', 'animation', 'random'],
    description:
      'Generates and displays a sequence of randomized characters, gradually transforming into a target string over time.',
    componentPreview: (
      <CharactersRandomizer
        className="mx-auto text-balance break-words py-16 text-4xl font-semibold uppercase"
        referenceString="Lorem ipsum dolor sit amet."
        isConcurrent
      />
    ),
    code: `
import { useCallback, useEffect, useState } from 'react';
import { shuffleArray } from '@/helpers/arrays';
import { cn } from '@/lib/tailwind';

type CharactersRandomizerBaseProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  referenceString: string;
  delay?: number;
  charactersCount?: number;
  isConcurrent?: boolean;
};

type EligibleCharactersProps = {
  eligibleCharacters: string | string[];
  useDefaultCharacters?: boolean;
};

type IsReverseProps = {
  isReverse: boolean;
  reversedString: string;
};

type CharactersRandomizerProps = CharactersRandomizerBaseProps &
  Partial<EligibleCharactersProps> &
  Partial<IsReverseProps>;

export const CharactersRandomizer: {
  (props: CharactersRandomizerBaseProps): JSX.Element;
  (props: CharactersRandomizerBaseProps & EligibleCharactersProps): JSX.Element;
  (
    props: CharactersRandomizerBaseProps &
      Partial<EligibleCharactersProps> &
      IsReverseProps,
  ): JSX.Element;
} = ({
  as: Element = 'p',
  className,
  referenceString,
  delay = 65,
  eligibleCharacters,
  useDefaultCharacters,
  charactersCount = 3,
  isConcurrent,
  isReverse,
  reversedString,
}: CharactersRandomizerProps) => {
  const getRandomCharacters = useCallback(
    ({
      requiredCharacters,
      eligibleCharacters,
      charactersCount,
    }: {
      requiredCharacters?: string | string[];
      eligibleCharacters?: string | string[];
      charactersCount?: number;
    }) => {
      const defaultCharactersSet = new Set(
        'aAzZeErRtTyYuUiIoOpPqQsSdDfFgGhHjJkKlLmMwWxXcCvVbBnN*!?;,. ',
      );
      const eligibleCharactersSet = new Set(eligibleCharacters);
      const baseCharactersSet = new Set(
        eligibleCharacters && useDefaultCharacters ?
          [...defaultCharactersSet, ...eligibleCharactersSet]
        : eligibleCharacters ? [...eligibleCharactersSet]
        : [...defaultCharactersSet],
      );

      const shuffledBaseCharacters = shuffleArray(
        Array.from(baseCharactersSet),
      );
      const preparedCharactersSet = new Set(
        shuffledBaseCharacters.slice(0, charactersCount),
      );

      const requiredCharactersSet = new Set(requiredCharacters);
      const resultCharactersSet = new Set([
        ...preparedCharactersSet,
        ...requiredCharactersSet,
      ]);

      return shuffleArray(Array.from(resultCharactersSet));
    },
    [useDefaultCharacters],
  );

  const referenceCharacters = referenceString.split('');

  const getInitialDisplayedCharacters = useCallback(
    () =>
      isConcurrent ?
        referenceCharacters.map(
          () =>
            getRandomCharacters({ eligibleCharacters, charactersCount })[0]!,
        )
      : [],
    [
      referenceCharacters,
      isConcurrent,
      getRandomCharacters,
      eligibleCharacters,
      charactersCount,
    ],
  );

  const [displayedCharactersRecord, setDisplayedCharactersRecord] = useState<
    string[][]
  >([getInitialDisplayedCharacters()]);

  const lastDisplayedCharacters =
    displayedCharactersRecord[displayedCharactersRecord.length - 1];

  const displayedString =
    lastDisplayedCharacters ? lastDisplayedCharacters.join('') : reversedString;

  useEffect(() => {
    if (isReverse) {
      if (displayedString === reversedString) return;

      const updateDisplayedCharacters = setTimeout(() => {
        setDisplayedCharactersRecord((prevDisplayedCharactersRecord) =>
          prevDisplayedCharactersRecord.slice(0, -1),
        );
      }, delay);

      return () => {
        clearTimeout(updateDisplayedCharacters);
      };
    }

    if (!lastDisplayedCharacters) {
      setDisplayedCharactersRecord([getInitialDisplayedCharacters()]);
      return;
    }

    if (displayedString === referenceString) return;

    const updateDisplayedCharacters = setTimeout(() => {
      const updatedDisplayedCharacters = lastDisplayedCharacters.map(
        (displayedCharacter, index) => {
          const referenceCharacter = referenceCharacters[index]!;

          const randomCharacters = getRandomCharacters({
            requiredCharacters: referenceCharacter,
            eligibleCharacters,
            charactersCount,
          });

          const displayedCharacterIndex = randomCharacters.findIndex(
            (character) => character === lastDisplayedCharacters[index],
          );

          return (
              randomCharacters[displayedCharacterIndex] === referenceCharacter
            ) ?
              displayedCharacter
            : randomCharacters[displayedCharacterIndex + 1]!;
        },
      );

      // If the current array is shorter than the reference array, add a space at the end
      if (lastDisplayedCharacters.length < referenceCharacters.length) {
        updatedDisplayedCharacters[lastDisplayedCharacters.length] = ' ';
      }

      setDisplayedCharactersRecord((prevDisplayedCharactersRecord) => [
        ...prevDisplayedCharactersRecord,
        updatedDisplayedCharacters,
      ]);
    }, delay);

    return () => {
      clearTimeout(updateDisplayedCharacters);
    };
  }, [
    getInitialDisplayedCharacters,
    isReverse,
    reversedString,
    referenceString,
    referenceCharacters,
    lastDisplayedCharacters,
    displayedString,
    getRandomCharacters,
    delay,
    charactersCount,
    eligibleCharacters,
  ]);

  return (
    <Element className={cn('w-fit', className)}>{displayedString}</Element>
  );
};
    `,
    props: [
      {
        name: 'as',
        type: 'keyof JSX.IntrinsicElements',
        description: 'Specifies the HTML element to render.',
        required: false,
        defaultValue: "'p'",
      },
      {
        name: 'className',
        type: 'string',
        description: 'Applies additional CSS classes.',
        required: false,
      },
      {
        name: 'referenceString',
        type: 'string',
        description:
          'The target string that the displayed characters will eventually match.',
        required: true,
      },
      {
        name: 'delay',
        type: 'number',
        description: 'The delay in milliseconds between updates.',
        required: false,
        defaultValue: '65',
      },
      {
        name: 'charactersCount',
        type: 'number',
        description:
          'The number of random characters to select from the eligible set.',
        required: false,
        defaultValue: '3',
      },
      {
        name: 'isConcurrent',
        type: 'boolean',
        description:
          'Determines whether the randomization happens concurrently for all characters.',
        required: false,
      },
      {
        name: 'eligibleCharacters',
        type: 'string | string[]',
        description: 'A list of characters to use for randomization.',
        required: false,
      },
      {
        name: 'useDefaultCharacters',
        type: 'boolean',
        description:
          'Indicates whether to include the default set of characters in the eligible set.',
        required: false,
        conditionallyRequiredBy: 'eligibleCharacters',
      },
      {
        name: 'isReverse',
        type: 'boolean',
        description: 'Indicates whether the randomization should reverse.',
        required: false,
      },
      {
        name: 'reversedString',
        type: 'string',
        description: 'The string to display when reversing.',
        required: false,
        conditionallyRequiredBy: 'isReverse',
      },
    ],
  },
];

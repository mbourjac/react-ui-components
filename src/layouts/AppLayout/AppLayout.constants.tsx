import type { UiComponent } from './AppLayout.types';

export const UI_COMPONENTS = [
  {
    pathname: '/characters-randomizer',
    name: 'Characters Randomizer',
    tags: ['text', 'animation', 'random'],
    description:
      'Generates and displays a sequence of randomized characters, gradually transforming into a target string over time.',
  },
] satisfies UiComponent[];

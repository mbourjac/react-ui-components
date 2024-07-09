import { createFileRoute } from '@tanstack/react-router';
import { CharactersRandomizerPage } from '../../pages/CharactersRandomizerPage/CharactersRandomizerPage';

export const Route = createFileRoute('/_layout/characters-randomizer')({
  component: CharactersRandomizerPage,
});

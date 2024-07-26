import { createFileRoute } from '@tanstack/react-router';
import { searchComponentsSchema } from '../App.schemas';
import { AppLayout } from '../layouts/AppLayout/AppLayout';

export const Route = createFileRoute('/_layout')({
  validateSearch: searchComponentsSchema,
  component: AppLayout,
});

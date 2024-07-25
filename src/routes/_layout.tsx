import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { AppLayout } from '../layouts/AppLayout/AppLayout';

const componentSearchSchema = z.object({
  filter: z.string().optional(),
});

export const Route = createFileRoute('/_layout')({
  validateSearch: componentSearchSchema,
  component: AppLayout,
});

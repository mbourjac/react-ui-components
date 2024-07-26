import { z } from 'zod';

export const searchComponentsSchema = z.object({
  filter: z.string().optional(),
  search: z.string().optional(),
});

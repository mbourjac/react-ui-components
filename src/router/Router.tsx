import { RouterProvider } from '@tanstack/react-router';
import { router } from './router.instance';

export const Router = () => {
  return <RouterProvider router={router} />;
};

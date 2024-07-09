import type { AllRoutes } from '../../router/router.types';

export type UiComponent = {
  pathname: AllRoutes;
  name: string;
  tags?: string[];
};

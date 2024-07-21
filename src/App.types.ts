import type { AllRoutes } from './router/router.types';

export type ComponentData = {
  pathname: AllRoutes;
  name: string;
  tags?: string[];
  description: string;
  code: string;
  propsData: PropData[];
};

export type PropData = {
  name: string;
  type: string;
  description: string;
  required: boolean;
  conditionallyRequiredBy?: string;
  defaultValue?: string;
};

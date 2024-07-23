import type { AllRoutes } from './router/router.types';

export type ComponentData<T extends Record<string, unknown>> = {
  pathname: AllRoutes;
  name: string;
  tags?: string[];
  description: string;
  code: string;
  propsData: PropData<T>[];
};

export type PropData<T extends Record<string, unknown>> = {
  name: keyof T;
  type: string;
  description: string;
  required: boolean;
  conditionallyRequiredBy?: string;
  defaultValue?: string;
};

export type PlaygroundProps<T extends Record<string, unknown>> = {
  props: T;
  controlledPropsKeys: (keyof T)[];
};

import type { AllRoutes } from './router/router.types';

export type ComponentData<T> = {
  pathname: AllRoutes;
  name: string;
  tags?: string[];
  description: string;
  component: (props: T) => JSX.Element;
  code: string;
  previewProps: T;
  initialPlaygroundProps: T;
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

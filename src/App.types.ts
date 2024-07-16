import type { AllRoutes } from './router/router.types';

export type UiComponent<T> = {
  pathname: AllRoutes;
  name: string;
  tags?: string[];
  description: string;
  component: (props: T) => JSX.Element;
  code: string;
  previewProps: T;
  initialPlaygroundProps: T;
  props: UiComponentProp[];
};

export type UiComponentProp = {
  name: string;
  type: string;
  description: string;
  required: boolean;
  conditionallyRequiredBy?: string;
  defaultValue?: string;
};

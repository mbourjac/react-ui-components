import type { AllRoutes } from './router/router.types';

export type UiComponent = {
  pathname: AllRoutes;
  name: string;
  tags?: string[];
  description: string;
  componentPreview: JSX.Element;
  code: string;
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

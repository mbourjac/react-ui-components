import { useLocation } from '@tanstack/react-router';
import { UI_COMPONENTS } from '../layouts/AppLayout/AppLayout.constants';

export const useComponent = () => {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  return UI_COMPONENTS.find((components) => components.pathname === pathname)!;
};

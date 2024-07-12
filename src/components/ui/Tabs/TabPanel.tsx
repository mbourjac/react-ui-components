import type { ReactNode } from 'react';
import { cn } from '../../../lib/tailwind';

type TabPanelProps = {
  id: string;
  ariaLabelledby: string;
  isActive: boolean;
  children: ReactNode;
  className?: string;
};

export const TabPanel = ({
  id,
  ariaLabelledby,
  isActive,
  children,
  className,
}: TabPanelProps) => {
  return (
    <div
      id={id}
      role="tabpanel"
      tabIndex={isActive ? 0 : -1}
      aria-labelledby={ariaLabelledby}
      className={cn(className)}
      hidden={!isActive}
    >
      {children}
    </div>
  );
};

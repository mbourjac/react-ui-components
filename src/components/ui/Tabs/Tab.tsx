import type { ArrayElement } from '../../../helpers/types';
import { cn } from '../../../lib/tailwind';
import type { TabsProps } from './Tabs';

export type TabProps = Omit<ArrayElement<TabsProps['tabs']>, 'content'> & {
  isActive: boolean;
  className?: string;
  index: number;
  setActiveTabIndex: (index: number) => void;
};

export const Tab = ({
  label,
  id,
  isActive,
  controls,
  className,
  index,
  setActiveTabIndex,
}: TabProps) => {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive ? 'true' : 'false'}
      data-active={isActive ? 'true' : 'false'}
      aria-controls={controls}
      id={id}
      tabIndex={isActive ? 0 : -1}
      onClick={() => setActiveTabIndex(index)}
      className={cn(className)}
    >
      {label}
    </button>
  );
};

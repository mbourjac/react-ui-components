import { useLocation } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/tailwind';
import type { ArrayElement } from '../../../utils/types';
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
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

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
      className={cn('relative', className)}
    >
      <span>{label}</span>
      {isActive ?
        <motion.span
          className="absolute bottom-[-1px] left-0 right-0 z-10 inline-block h-[1px] bg-primary"
          layoutId={`${pathname}-underline`}
        />
      : null}
    </button>
  );
};

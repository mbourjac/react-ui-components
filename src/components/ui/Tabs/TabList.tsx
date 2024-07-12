import {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
  type AriaAttributes,
} from 'react';
import type { ReactNode } from '@tanstack/react-router';
import { cn } from '../../../lib/tailwind';

type TabListProps = {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  className?: string;
  ariaOrientation?: AriaAttributes['aria-orientation'];
  children: ReactNode;
};

export const TabList = ({
  activeTabIndex,
  setActiveTabIndex,
  className,
  ariaOrientation = 'horizontal',
  children,
}: TabListProps) => {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [tabFocus, setTabFocus] = useState(activeTabIndex);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!tabsListRef.current) {
        console.error('TabsList reference is not assigned');
        return;
      }

      const tabs =
        tabsListRef.current.querySelectorAll<HTMLElement>('[role="tab"]');
      let newFocus = tabFocus;

      switch (event.key) {
        case 'ArrowRight':
          newFocus = (tabFocus + 1) % tabs.length;
          break;
        case 'ArrowLeft':
          newFocus = (tabFocus - 1 + tabs.length) % tabs.length;
          break;
        default:
          return;
      }

      setTabFocus(newFocus);
      setActiveTabIndex(newFocus);
      tabs[newFocus]!.focus();
    },
    [tabFocus, setActiveTabIndex],
  );

  useEffect(() => {
    if (!tabsListRef.current) {
      console.error('TabsList reference is not assigned');
      return;
    }

    const tabs =
      tabsListRef.current.querySelectorAll<HTMLElement>('[role="tab"]');

    tabs.forEach((tab, index) => {
      tab.setAttribute('tabindex', index === activeTabIndex ? '0' : '-1');
    });

    // Cleanup function in case the component unmounts
    return () => {
      tabs.forEach((tab) => {
        tab.removeAttribute('tabindex');
      });
    };
  }, [activeTabIndex]);

  return (
    <div
      ref={tabsListRef}
      role="tablist"
      tabIndex={0}
      aria-orientation={ariaOrientation}
      onKeyDown={handleKeyDown}
      className={cn('outline-none', className)}
    >
      {children}
    </div>
  );
};

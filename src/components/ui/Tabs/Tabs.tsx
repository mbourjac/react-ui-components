import { useState } from 'react';
import type { ReactNode } from '@tanstack/react-router';
import { cn } from '../../../lib/tailwind';
import { Tab } from './Tab';
import { TabList } from './TabList';
import { TabPanel } from './TabPanel';

export type TabsProps = {
  tabs: {
    label: string;
    id: string;
    controls: string;
    content: ReactNode;
    className?: string;
  }[];
  tabListClassName?: string;
  tabClassName?: string;
  tabPanelClassName?: string;
};

export const Tabs = ({
  tabs,
  tabListClassName,
  tabClassName,
  tabPanelClassName,
}: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <TabList
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        className={tabListClassName}
      >
        {tabs.map((tab, index) => {
          const { className, ...restProps } = tab;
          return (
            <Tab
              key={tab.id}
              {...restProps}
              isActive={index === activeTabIndex}
              className={cn(tabClassName, className)}
              index={index}
              setActiveTabIndex={setActiveTabIndex}
            />
          );
        })}
      </TabList>
      {tabs.map(({ id, controls, content }, index) => (
        <TabPanel
          key={controls}
          id={controls}
          ariaLabelledby={id}
          isActive={index === activeTabIndex}
          className={tabPanelClassName}
        >
          {content}
        </TabPanel>
      ))}
    </div>
  );
};

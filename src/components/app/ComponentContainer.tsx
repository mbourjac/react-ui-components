import type { ReactNode } from 'react';
import { cn } from '../../lib/tailwind';
import { Tabs } from '../ui/Tabs/Tabs';

type ComponentContainerProps = {
  children: ReactNode;
  code: ReactNode;
  previewPanelClassName?: string;
  codePanelClassName?: string;
};

export const ComponentContainer = ({
  children,
  code,
  previewPanelClassName,
  codePanelClassName,
}: ComponentContainerProps) => {
  const tabs = [
    {
      label: 'Preview',
      id: 'preview-tab',
      controls: 'preview-panel',
      className: 'rounded-tl-2xl',
      content: (
        <div
          className={cn(
            'rounded-b-2xl bg-off-black px-4 py-8',
            previewPanelClassName,
          )}
        >
          {children}
        </div>
      ),
    },
    {
      label: 'Code',
      id: 'code-tab',
      controls: 'code-panel',
      className: 'rounded-tr-2xl',
      content: (
        <div
          className={cn(
            'rounded-b-2xl bg-off-black px-4 py-8',
            codePanelClassName,
          )}
        >
          {code}
        </div>
      ),
    },
  ];

  return (
    <Tabs
      tabListClassName="flex"
      tabClassName="w-1/2 bg-off-black px-4 py-2 text-left"
      tabs={tabs}
    />
  );
};

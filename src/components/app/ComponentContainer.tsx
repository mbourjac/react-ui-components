import type { ReactNode } from 'react';
import { cn } from '../../lib/tailwind';
import { HighlightedCode } from '../ui/HighlightedCode';
import { Tabs } from '../ui/Tabs/Tabs';

type ComponentContainerProps = {
  children: ReactNode;
  code: string;
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
        <div className={cn('rounded-b-2xl bg-off-black', codePanelClassName)}>
          <HighlightedCode
            code={code}
            codeClassName="h-[40vh] rounded-b-2xl bg-off-black !p-4 !pt-0"
          />
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

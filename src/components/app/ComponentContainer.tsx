import { HighlightedCode } from '../ui/HighlightedCode';
import { Tabs } from '../ui/Tabs/Tabs';

type ComponentContainerProps = {
  component: JSX.Element;
  code: string;
};

export const ComponentContainer = ({
  component,
  code,
}: ComponentContainerProps) => {
  const TABS = [
    {
      label: 'Preview',
      id: 'preview-tab',
      controls: 'preview-panel',
      content: (
        <div className="rounded-b-2xl bg-off-black p-4">{component}</div>
      ),
    },
    {
      label: 'Code',
      id: 'code-tab',
      controls: 'code-panel',
      content: (
        <div className="rounded-b-2xl bg-off-black">
          <HighlightedCode
            code={code}
            codeClassName="h-[40vh] rounded-b-2xl bg-off-black !p-4"
          />
        </div>
      ),
    },
  ];

  return (
    <Tabs
      tabListClassName="flex"
      tabClassName="w-1/2 bg-off-black px-4 py-2 text-left first:rounded-tl-2xl last:rounded-tr-2xl"
      tabs={TABS}
    />
  );
};

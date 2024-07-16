import { useEffect, useState } from 'react';
import { HighlightedCode } from '../ui/HighlightedCode';
import { IconButton } from '../ui/Icon/IconButton';
import { Tabs } from '../ui/Tabs/Tabs';

type ComponentPreviewProps<T> = {
  component: (props: T) => JSX.Element;
  previewProps: T;
  code: string;
};

export const ComponentPreview = <T,>({
  component: Component,
  previewProps,
  code,
}: ComponentPreviewProps<T>) => {
  const [componentKey, setComponentKey] = useState(0);
  const [codeHasBeenCopied, setCodeHasBeenCopied] = useState(false);

  const handleReloadComponent = () => {
    setComponentKey((prevComponentKey) => prevComponentKey + 1);
  };

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCodeHasBeenCopied(true);
  };

  useEffect(() => {
    if (codeHasBeenCopied) {
      const codeCopiedTimeout = setTimeout(
        () => setCodeHasBeenCopied(false),
        2000,
      );
      return () => clearTimeout(codeCopiedTimeout);
    }
  }, [codeHasBeenCopied]);

  const TABS = [
    {
      label: 'Preview',
      id: 'preview-tab',
      controls: 'preview-panel',
      content: (
        <div className="relative rounded-b-2xl bg-off-black p-4">
          <div className="absolute right-4 top-2">
            <IconButton
              kind="reload"
              screenReaderLabel="Reload component"
              handleClick={handleReloadComponent}
            />
          </div>
          <Component key={componentKey} {...previewProps} />
        </div>
      ),
    },
    {
      label: 'Code',
      id: 'code-tab',
      controls: 'code-panel',
      content: (
        <div className="relative rounded-b-2xl bg-off-black">
          <IconButton
            kind={codeHasBeenCopied ? 'check' : 'clipboard'}
            screenReaderLabel="Copy to clipboard"
            handleClick={() => void handleCopyToClipboard()}
            className="absolute right-4 top-2"
          />
          <HighlightedCode
            code={code}
            codeClassName="h-[40vh] rounded-b-2xl bg-off-black !p-4 !pt-8"
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

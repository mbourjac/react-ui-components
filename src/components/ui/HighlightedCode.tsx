import { useRef, useEffect } from 'react';
import hljs from 'highlight.js';
import { cn } from '../../lib/tailwind';

type HighlightedCodeProps = {
  code: string;
  codeClassName?: string;
};

export const HighlightedCode = ({
  code,
  codeClassName,
}: HighlightedCodeProps) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const code = codeRef.current;

    if (code && !code.dataset.highlighted) {
      hljs.highlightElement(code);
    }
  }, [code]);

  return (
    <pre>
      <code ref={codeRef} className={cn('typescript', codeClassName)}>
        {code}
      </code>
    </pre>
  );
};

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
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
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

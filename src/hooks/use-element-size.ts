import { type RefObject, useLayoutEffect, useState } from 'react';

export const useElementSize = <T extends HTMLElement>(
  elementRef?: RefObject<T>,
) => {
  const [elementSize, setElementSize] = useState<{
    elementWidth: number;
    elementHeight: number;
  }>({
    elementWidth: 0,
    elementHeight: 0,
  });

  useLayoutEffect(() => {
    const element = elementRef?.current;

    if (!element) return;

    const updateElementSize = () => {
      setElementSize({
        elementWidth: element.offsetWidth,
        elementHeight: element.offsetHeight,
      });
    };

    updateElementSize();
    window.addEventListener('resize', updateElementSize);

    return () => {
      window.removeEventListener('resize', updateElementSize);
    };
  }, [elementRef]);

  return elementSize;
};

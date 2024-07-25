import { forwardRef, type SVGAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/tailwind';

type IconBaseProps = (Omit<
  SVGAttributes<SVGSVGElement>,
  | 'xmlns'
  | 'viewBox'
  | 'className'
  | 'fill'
  | 'strokeWidth'
  | 'stroke'
  | 'aria-hidden'
> & {
  kind: keyof typeof iconsMapping;
  className?: string;
}) &
  (
    | {
        'aria-hidden'?: SVGAttributes<SVGSVGElement>['aria-hidden'];
        screenReaderLabel?: never;
      }
    | {
        'aria-hidden'?: never;
        screenReaderLabel?: string;
      }
  );

const iconsMapping = {
  reload: (
    <path
      fillRule="evenodd"
      d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
      clipRule="evenodd"
    />
  ),
  clipboard: (
    <path
      fillRule="evenodd"
      d="M10.5 3A1.501 1.501 0 0 0 9 4.5h6A1.5 1.5 0 0 0 13.5 3h-3Zm-2.693.178A3 3 0 0 1 10.5 1.5h3a3 3 0 0 1 2.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 0 1-3 3H6.75a3 3 0 0 1-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15Z"
      clipRule="evenodd"
    />
  ),
  check: (
    <path
      fillRule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      clipRule="evenodd"
    />
  ),
  search: (
    <path
      fillRule="evenodd"
      d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
      clipRule="evenodd"
    />
  ),
  'x-mark': (
    <path
      fillRule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
      clipRule="evenodd"
    />
  ),
};

export const IconBase = forwardRef<SVGSVGElement, IconBaseProps>(
  ({ kind, className, screenReaderLabel, ...attributes }, ref) => {
    return (
      <>
        <svg
          ref={ref}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn('size-5', className)}
          aria-hidden={
            screenReaderLabel ? !!screenReaderLabel : attributes['aria-hidden']
          }
          {...attributes}
        >
          {iconsMapping[kind]}
        </svg>
        {screenReaderLabel && (
          <span className="sr-only">{screenReaderLabel}</span>
        )}
      </>
    );
  },
);

IconBase.displayName = 'IconBase';

export const Icon = motion(IconBase);

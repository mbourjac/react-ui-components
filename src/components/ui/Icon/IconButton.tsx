import { forwardRef, type ComponentProps } from 'react';
import { cn } from '../../../lib/tailwind';
import { Icon } from './Icon';

type IconButtonProps = ComponentProps<typeof Icon> & {
  handleClick: () => void;
  className?: string;
  iconClassName?: string;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ handleClick, className, iconClassName, ...iconProps }, ref) => (
    <button
      ref={ref}
      onClick={handleClick}
      className={cn('rounded-lg p-1.5 hover:bg-primary/25', className)}
    >
      <Icon {...iconProps} className={iconClassName} />
    </button>
  ),
);

IconButton.displayName = 'IconButton';

import { cn } from '../../../lib/tailwind';
import { type IconProps, Icon } from './Icon';

type IconButtonProps = IconProps & {
  handleClick: () => void;
  className?: string;
  iconClassName?: string;
};

export const IconButton = ({
  handleClick,
  className,
  iconClassName,
  ...iconProps
}: IconButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={cn('rounded-lg p-1.5 hover:bg-primary/25', className)}
    >
      <Icon {...iconProps} className={iconClassName} />
    </button>
  );
};

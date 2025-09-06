import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

type LoaderProps = React.ComponentProps<'svg'>;

const Loader = ({ className, ...props }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2Icon className={cn('animate-spin', className)} {...props} />
    </div>
  );
};

export default Loader;

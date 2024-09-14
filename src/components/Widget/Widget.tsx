import { cn } from '../../lib/utils';

interface WidgetProps {
  children: React.ReactNode;
  className?: string;
}
export default function Widget({ children, className }: WidgetProps) {
  return (
    <article
      className={cn(
        'relative bg-primary w-full p-3 pt-6 text-white rounded-2xl mb-1',
        className
      )}
    >
      {children}
    </article>
  );
}

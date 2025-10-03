import React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * VisuallyHidden component hides content visually but keeps it accessible to screen readers.
 * This is useful for providing additional context or instructions that are only needed
 * for assistive technologies.
 */
export function VisuallyHidden({ 
  children, 
  className, 
  as: Component = 'span' 
}: VisuallyHiddenProps) {
  return (
    <Component
      className={cn(
        // Hide visually but keep accessible to screen readers
        'absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden',
        'clip-path-[inset(50%)] border-0',
        // Alternative for older browsers that don't support clip-path
        'clip-[rect(0,0,0,0)]',
        className
      )}
    >
      {children}
    </Component>
  );
}

export default VisuallyHidden;
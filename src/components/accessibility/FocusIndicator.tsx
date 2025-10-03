'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FocusIndicatorProps {
  children: React.ReactNode;
  className?: string;
  showOnMouseFocus?: boolean;
}

/**
 * FocusIndicator component provides enhanced focus indicators that are only shown
 * when navigating with keyboard, not when clicking with mouse (unless specified).
 */
export function FocusIndicator({ 
  children, 
  className,
  showOnMouseFocus = false 
}: FocusIndicatorProps) {
  const [isKeyboardFocus, setIsKeyboardFocus] = useState(false);
  const [lastInteractionWasKeyboard, setLastInteractionWasKeyboard] = useState(false);

  const handleFocus = () => {
    setIsKeyboardFocus(lastInteractionWasKeyboard || showOnMouseFocus);
  };

  const handleBlur = () => {
    setIsKeyboardFocus(false);
  };

  useEffect(() => {
    const handleKeyDown = () => {
      setLastInteractionWasKeyboard(true);
    };

    const handleMouseDown = () => {
      setLastInteractionWasKeyboard(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div
      className={cn(
        'relative',
        // Enhanced focus indicator
        isKeyboardFocus && [
          'after:absolute after:inset-0 after:rounded-md',
          'after:ring-2 after:ring-primary after:ring-offset-2',
          'after:ring-offset-background after:pointer-events-none',
          'after:transition-all after:duration-200'
        ],
        className
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      {children}
    </div>
  );
}

export default FocusIndicator;
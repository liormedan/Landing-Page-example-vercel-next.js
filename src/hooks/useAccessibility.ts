import { useEffect, useRef, useState } from 'react';
import { LiveAnnouncer, FocusManager, reducedMotion, aria } from '@/lib/accessibility';

// Hook for managing focus trap in modals/dialogs
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    FocusManager.saveFocus();
    const cleanup = FocusManager.trapFocus(containerRef.current);

    return () => {
      cleanup();
      FocusManager.restoreFocus();
    };
  }, [isActive]);

  return containerRef;
}

// Hook for announcing content changes to screen readers
export function useAnnouncer() {
  const announcer = LiveAnnouncer.getInstance();

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    announcer.announce(message, priority);
  };

  return { announce };
}

// Hook for managing ARIA live regions
export function useLiveRegion(initialMessage = '') {
  const [message, setMessage] = useState(initialMessage);
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite');

  const announce = (newMessage: string, newPriority: 'polite' | 'assertive' = 'polite') => {
    setMessage(newMessage);
    setPriority(newPriority);
  };

  return {
    message,
    priority,
    announce,
    liveRegionProps: {
      'aria-live': priority,
      'aria-atomic': true,
      role: 'status'
    }
  };
}

// Hook for keyboard navigation in lists
export function useKeyboardNavigation<T extends HTMLElement>(items: T[]) {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setCurrentIndex(prev => prev < items.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setCurrentIndex(prev => prev > 0 ? prev - 1 : items.length - 1);
        break;
      case 'Home':
        event.preventDefault();
        setCurrentIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setCurrentIndex(items.length - 1);
        break;
      case 'Enter':
      case ' ':
        if (currentIndex >= 0 && items[currentIndex]) {
          event.preventDefault();
          items[currentIndex].click();
        }
        break;
    }
  };

  useEffect(() => {
    if (currentIndex >= 0 && items[currentIndex]) {
      items[currentIndex].focus();
    }
  }, [currentIndex, items]);

  return {
    currentIndex,
    setCurrentIndex,
    handleKeyDown
  };
}

// Hook for managing reduced motion preferences
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const getAnimationDuration = (normalDuration: number) => {
    return prefersReducedMotion ? 0 : normalDuration;
  };

  return {
    prefersReducedMotion,
    getAnimationDuration
  };
}

// Hook for managing ARIA describedby relationships
export function useAriaDescribedBy(elementRef: React.RefObject<HTMLElement>) {
  const [descriptionIds, setDescriptionIds] = useState<string[]>([]);

  const addDescription = (id: string) => {
    setDescriptionIds(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeDescription = (id: string) => {
    setDescriptionIds(prev => prev.filter(existingId => existingId !== id));
  };

  useEffect(() => {
    if (elementRef.current && descriptionIds.length > 0) {
      elementRef.current.setAttribute('aria-describedby', descriptionIds.join(' '));
    } else if (elementRef.current) {
      elementRef.current.removeAttribute('aria-describedby');
    }
  }, [elementRef, descriptionIds]);

  return {
    addDescription,
    removeDescription,
    descriptionIds
  };
}

// Hook for skip links functionality
export function useSkipLinks() {
  const skipToContent = () => {
    const mainContent = document.querySelector('main') || document.querySelector('#main-content');
    if (mainContent) {
      (mainContent as HTMLElement).focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skipToNavigation = () => {
    const navigation = document.querySelector('nav') || document.querySelector('[role="navigation"]');
    if (navigation) {
      (navigation as HTMLElement).focus();
      navigation.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    skipToContent,
    skipToNavigation
  };
}

// Hook for managing form accessibility
export function useFormAccessibility() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { announce } = useAnnouncer();

  const announceError = (fieldName: string, errorMessage: string) => {
    setErrors(prev => ({ ...prev, [fieldName]: errorMessage }));
    announce(`Error in ${fieldName}: ${errorMessage}`, 'assertive');
  };

  const clearError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  const announceSuccess = (message: string) => {
    announce(message, 'polite');
  };

  return {
    errors,
    announceError,
    clearError,
    announceSuccess
  };
}

// Hook for managing high contrast mode
export function useHighContrast() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsHighContrast(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
}
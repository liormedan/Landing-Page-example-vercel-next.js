import { render, RenderOptions } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ReactElement } from 'react';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Custom render function that includes accessibility testing
export const renderWithA11y = async (
  ui: ReactElement,
  options?: RenderOptions
) => {
  const renderResult = render(ui, options);
  
  // Run axe accessibility tests
  const results = await axe(renderResult.container);
  expect(results).toHaveNoViolations();
  
  return renderResult;
};

// Test color contrast ratios
export const testColorContrast = (
  foregroundColor: [number, number, number],
  backgroundColor: [number, number, number],
  isLargeText = false
) => {
  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (color1: [number, number, number], color2: [number, number, number]): number => {
    const lum1 = getLuminance(...color1);
    const lum2 = getLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  const ratio = getContrastRatio(foregroundColor, backgroundColor);
  const minRatio = isLargeText ? 3 : 4.5;
  
  return {
    ratio,
    passes: ratio >= minRatio,
    minRatio
  };
};

// Test keyboard navigation
export const testKeyboardNavigation = async (
  element: HTMLElement,
  expectedFocusableElements: number
) => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  const focusableElements = element.querySelectorAll(focusableSelectors);
  
  expect(focusableElements).toHaveLength(expectedFocusableElements);
  
  // Test that all focusable elements can receive focus
  focusableElements.forEach((el, index) => {
    (el as HTMLElement).focus();
    expect(document.activeElement).toBe(el);
  });
};

// Test ARIA attributes
export const testAriaAttributes = (element: HTMLElement, expectedAttributes: Record<string, string>) => {
  Object.entries(expectedAttributes).forEach(([attribute, expectedValue]) => {
    const actualValue = element.getAttribute(attribute);
    expect(actualValue).toBe(expectedValue);
  });
};

// Test semantic HTML structure
export const testSemanticStructure = (container: HTMLElement) => {
  // Check for proper heading hierarchy
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
  
  // Ensure headings start with h1 and don't skip levels
  if (headingLevels.length > 0) {
    expect(headingLevels[0]).toBe(1); // Should start with h1
    
    for (let i = 1; i < headingLevels.length; i++) {
      const currentLevel = headingLevels[i];
      const previousLevel = headingLevels[i - 1];
      
      // Should not skip more than one level
      expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
    }
  }
  
  // Check for proper landmark usage
  const main = container.querySelector('main');
  if (main) {
    expect(main).toBeInTheDocument();
  }
  
  const nav = container.querySelector('nav');
  if (nav) {
    expect(nav).toHaveAttribute('role', 'navigation');
  }
};

// Test form accessibility
export const testFormAccessibility = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    const inputElement = input as HTMLInputElement;
    
    // Check for labels
    const label = form.querySelector(`label[for="${inputElement.id}"]`);
    if (!label) {
      // Check for aria-label or aria-labelledby
      expect(
        inputElement.hasAttribute('aria-label') || 
        inputElement.hasAttribute('aria-labelledby')
      ).toBe(true);
    }
    
    // Check for error handling
    if (inputElement.hasAttribute('aria-invalid')) {
      const isInvalid = inputElement.getAttribute('aria-invalid') === 'true';
      if (isInvalid) {
        expect(
          inputElement.hasAttribute('aria-describedby')
        ).toBe(true);
      }
    }
  });
};

// Test screen reader announcements
export const testScreenReaderAnnouncements = (container: HTMLElement) => {
  const liveRegions = container.querySelectorAll('[aria-live]');
  const alerts = container.querySelectorAll('[role="alert"]');
  const status = container.querySelectorAll('[role="status"]');
  
  // Ensure live regions have appropriate attributes
  liveRegions.forEach(region => {
    const ariaLive = region.getAttribute('aria-live');
    expect(['polite', 'assertive', 'off']).toContain(ariaLive);
  });
  
  return {
    liveRegions: liveRegions.length,
    alerts: alerts.length,
    status: status.length
  };
};

// Test focus management
export const testFocusManagement = async (
  triggerElement: HTMLElement,
  expectedFocusTarget: HTMLElement
) => {
  // Simulate user interaction
  triggerElement.click();
  
  // Wait for focus to be set
  await new Promise(resolve => setTimeout(resolve, 100));
  
  expect(document.activeElement).toBe(expectedFocusTarget);
};

// Test reduced motion preferences
export const testReducedMotion = () => {
  // Mock reduced motion preference
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
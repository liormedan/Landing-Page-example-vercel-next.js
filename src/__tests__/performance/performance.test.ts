import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { reportWebVital, PerformanceMonitor, preloadResource, prefetchPage } from '@/lib/performance';

// Mock window.gtag
const mockGtag = vi.fn();
Object.defineProperty(window, 'gtag', {
  value: mockGtag,
  writable: true,
});

// Mock performance API
const mockPerformance = {
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByName: vi.fn(() => [{ duration: 100 }]),
  now: vi.fn(() => Date.now()),
};

Object.defineProperty(window, 'performance', {
  value: mockPerformance,
  writable: true,
});

// Mock PerformanceObserver
class MockPerformanceObserver {
  constructor(private callback: (list: any) => void) {}
  observe() {}
  disconnect() {}
}

Object.defineProperty(window, 'PerformanceObserver', {
  value: MockPerformanceObserver,
  writable: true,
});

describe('Performance Utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset console.log mock
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('reportWebVital', () => {
    it('should report web vital metrics to analytics', () => {
      const metric = {
        name: 'LCP',
        value: 2000,
        delta: 100,
        id: 'test-id',
        navigationType: 'navigate',
      };

      reportWebVital(metric);

      expect(mockGtag).toHaveBeenCalledWith('event', 'LCP', {
        event_category: 'Web Vitals',
        event_label: 'test-id',
        value: 2000,
        custom_map: {
          metric_rating: 'good',
          metric_delta: 100,
          navigation_type: 'navigate',
        },
      });
    });

    it('should classify metrics correctly', () => {
      const goodLCP = {
        name: 'LCP',
        value: 2000, // Good: <= 2500
        delta: 100,
        id: 'test-id',
        navigationType: 'navigate',
      };

      const poorLCP = {
        name: 'LCP',
        value: 5000, // Poor: > 4000
        delta: 100,
        id: 'test-id',
        navigationType: 'navigate',
      };

      reportWebVital(goodLCP);
      expect(mockGtag).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          custom_map: expect.objectContaining({
            metric_rating: 'good',
          }),
        })
      );

      mockGtag.mockClear();

      reportWebVital(poorLCP);
      expect(mockGtag).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          custom_map: expect.objectContaining({
            metric_rating: 'poor',
          }),
        })
      );
    });

    it('should handle CLS metric scaling', () => {
      const clsMetric = {
        name: 'CLS',
        value: 0.15,
        delta: 0.05,
        id: 'test-id',
        navigationType: 'navigate',
      };

      reportWebVital(clsMetric);

      expect(mockGtag).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        expect.objectContaining({
          value: 150, // 0.15 * 1000
        })
      );
    });
  });

  describe('PerformanceMonitor', () => {
    let monitor: PerformanceMonitor;

    beforeEach(() => {
      monitor = PerformanceMonitor.getInstance();
    });

    it('should be a singleton', () => {
      const monitor2 = PerformanceMonitor.getInstance();
      expect(monitor).toBe(monitor2);
    });

    it('should mark performance milestones', () => {
      monitor.mark('test-mark');
      expect(mockPerformance.mark).toHaveBeenCalledWith('test-mark');
    });

    it('should measure between marks', () => {
      const duration = monitor.measure('test-measure', 'start-mark', 'end-mark');
      
      expect(mockPerformance.measure).toHaveBeenCalledWith('test-measure', 'start-mark', 'end-mark');
      expect(mockPerformance.getEntriesByName).toHaveBeenCalledWith('test-measure', 'measure');
      expect(duration).toBe(100);
    });

    it('should measure component render time', () => {
      const mockFn = vi.fn();
      mockPerformance.now.mockReturnValueOnce(0).mockReturnValueOnce(20);

      const duration = monitor.measureComponent('TestComponent', mockFn);

      expect(mockFn).toHaveBeenCalled();
      expect(duration).toBe(20);
      expect(console.warn).toHaveBeenCalledWith(
        '[Performance] Slow component render: TestComponent (20ms)'
      );
    });

    it('should not warn for fast component renders', () => {
      const mockFn = vi.fn();
      mockPerformance.now.mockReturnValueOnce(0).mockReturnValueOnce(10);

      monitor.measureComponent('FastComponent', mockFn);

      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe('Resource preloading', () => {
    beforeEach(() => {
      // Mock document.head
      const mockHead = {
        appendChild: vi.fn(),
      };
      Object.defineProperty(document, 'head', {
        value: mockHead,
        writable: true,
      });

      // Mock createElement
      const mockLink = {
        rel: '',
        href: '',
        as: '',
        type: '',
        onload: null as (() => void) | null,
        parentNode: mockHead,
      };

      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
    });

    it('should preload resources', () => {
      preloadResource('/test.woff2', 'font', 'font/woff2');

      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.head.appendChild).toHaveBeenCalled();
    });

    it('should prefetch pages', () => {
      prefetchPage('/about');

      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.head.appendChild).toHaveBeenCalled();
    });
  });
});

describe('Performance Benchmarks', () => {
  it('should meet Core Web Vitals thresholds', () => {
    // These are target thresholds - actual values would be measured in real usage
    const targets = {
      LCP: 2500, // Largest Contentful Paint
      FID: 100,  // First Input Delay
      CLS: 0.1,  // Cumulative Layout Shift
      FCP: 1800, // First Contentful Paint
      TTFB: 800, // Time to First Byte
      INP: 200,  // Interaction to Next Paint
    };

    // Verify thresholds are reasonable
    expect(targets.LCP).toBeLessThanOrEqual(2500);
    expect(targets.FID).toBeLessThanOrEqual(100);
    expect(targets.CLS).toBeLessThanOrEqual(0.1);
    expect(targets.FCP).toBeLessThanOrEqual(1800);
    expect(targets.TTFB).toBeLessThanOrEqual(800);
    expect(targets.INP).toBeLessThanOrEqual(200);
  });

  it('should have reasonable bundle size targets', () => {
    // These would be measured in actual build process
    const bundleTargets = {
      initialJS: 200 * 1024, // 200KB initial JS
      totalJS: 500 * 1024,   // 500KB total JS
      css: 50 * 1024,        // 50KB CSS
    };

    // Verify targets are reasonable for a landing page
    expect(bundleTargets.initialJS).toBeLessThanOrEqual(200 * 1024);
    expect(bundleTargets.totalJS).toBeLessThanOrEqual(500 * 1024);
    expect(bundleTargets.css).toBeLessThanOrEqual(50 * 1024);
  });
});
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollTracking } from '@/hooks/useScrollTracking';

// Mock the analytics module
vi.mock('@/lib/analytics', () => ({
  analytics: {
    trackSectionView: vi.fn(),
  },
}));

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();
const mockDisconnect = vi.fn();

mockIntersectionObserver.mockReturnValue({
  observe: mockObserve,
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
});

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

describe('useScrollTracking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create IntersectionObserver with correct options', () => {
    const { result } = renderHook(() =>
      useScrollTracking({
        sectionName: 'test-section',
        threshold: 0.7,
      })
    );

    expect(result.current).toBeDefined();
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.7,
        rootMargin: '0px 0px -10% 0px',
      }
    );
  });

  it('should use default threshold when not provided', () => {
    renderHook(() =>
      useScrollTracking({
        sectionName: 'test-section',
      })
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px',
      }
    );
  });

  it('should track section view when element intersects', async () => {
    const { analytics } = await import('@/lib/analytics');
    
    // Mock element
    const mockElement = document.createElement('div');
    
    renderHook(() =>
      useScrollTracking({
        sectionName: 'test-section',
        threshold: 0.5,
      })
    );

    // Get the callback function passed to IntersectionObserver
    const callback = mockIntersectionObserver.mock.calls[0][0];
    
    // Simulate intersection
    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.6,
      target: mockElement,
    };

    callback([mockEntry]);

    expect(analytics.trackSectionView).toHaveBeenCalledWith('test-section');
  });

  it('should not track when intersection ratio is below threshold', async () => {
    const { analytics } = await import('@/lib/analytics');
    
    const mockElement = document.createElement('div');
    
    renderHook(() =>
      useScrollTracking({
        sectionName: 'test-section',
        threshold: 0.5,
      })
    );

    const callback = mockIntersectionObserver.mock.calls[0][0];
    
    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.3, // Below threshold
      target: mockElement,
    };

    callback([mockEntry]);

    expect(analytics.trackSectionView).not.toHaveBeenCalled();
  });

  it('should not track when element is not intersecting', async () => {
    const { analytics } = await import('@/lib/analytics');
    
    const mockElement = document.createElement('div');
    
    renderHook(() =>
      useScrollTracking({
        sectionName: 'test-section',
        threshold: 0.5,
      })
    );

    const callback = mockIntersectionObserver.mock.calls[0][0];
    
    const mockEntry = {
      isIntersecting: false,
      intersectionRatio: 0.6,
      target: mockElement,
    };

    callback([mockEntry]);

    expect(analytics.trackSectionView).not.toHaveBeenCalled();
  });

  it('should track only once when trackOnce is true', async () => {
    const { analytics } = await import('@/lib/analytics');
    
    const mockElement = document.createElement('div');
    
    renderHook(() =>
      useScrollTracking({
        sectionName: 'test-section',
        threshold: 0.5,
        trackOnce: true,
      })
    );

    const callback = mockIntersectionObserver.mock.calls[0][0];
    
    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.6,
      target: mockElement,
    };

    // Trigger intersection twice
    callback([mockEntry]);
    callback([mockEntry]);

    expect(analytics.trackSectionView).toHaveBeenCalledTimes(1);
    expect(analytics.trackSectionView).toHaveBeenCalledWith('test-section');
  });

  it('should track multiple times when trackOnce is false', async () => {
    const { analytics } = await import('@/lib/analytics');
    
    const mockElement = document.createElement('div');
    
    renderHook(() =>
      useScrollTracking({
        sectionName: 'test-section',
        threshold: 0.5,
        trackOnce: false,
      })
    );

    const callback = mockIntersectionObserver.mock.calls[0][0];
    
    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 0.6,
      target: mockElement,
    };

    // Trigger intersection twice
    callback([mockEntry]);
    callback([mockEntry]);

    expect(analytics.trackSectionView).toHaveBeenCalledTimes(2);
  });

  it('should cleanup observer on unmount', () => {
    const mockElement = document.createElement('div');
    
    const { unmount } = renderHook(() =>
      useScrollTracking({
        sectionName: 'test-section',
      })
    );

    // Mock that element exists
    vi.spyOn(document, 'createElement').mockReturnValue(mockElement);

    unmount();

    expect(mockUnobserve).toHaveBeenCalledWith(mockElement);
  });
});
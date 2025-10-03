import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock console.log to avoid noise in tests
vi.spyOn(console, 'log').mockImplementation(() => {});
vi.spyOn(console, 'error').mockImplementation(() => {});

// Mock Resend
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ id: 'mock-email-id' }),
    },
  })),
}));

// Import the route handlers
import { POST, GET } from '../route';

// We need to access the rate limit store to clear it between tests
// Since it's not exported, we'll work around this by using different IPs

describe('/api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET', () => {
    it('returns working status', async () => {
      const response = await GET();
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.message).toBe('Contact API endpoint is working');
    });
  });

  describe('POST', () => {
    const validFormData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+972501234567',
      projectPurpose: 'I need a landing page for my business that converts well',
      additionalInfo: 'Some additional details about the project',
      preferredPackage: 'recommended',
      budget: '2000-5000',
      timeline: '2-weeks',
    };

    let testCounter = 0;
    const createMockRequest = (body: any, ip?: string) => {
      testCounter++;
      const testIp = ip || `192.168.1.${testCounter}`;
      return new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-forwarded-for': testIp,
        },
        body: JSON.stringify(body),
      });
    };

    it('accepts valid form submission', async () => {
      const request = createMockRequest(validFormData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.message).toBe('Form submitted successfully');
      expect(data.id).toMatch(/^contact_\d+$/);
    });

    it('validates required fields', async () => {
      const invalidData = {
        fullName: '',
        email: 'invalid-email',
        projectPurpose: 'short',
      };
      
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();
      
      // Debug: log the actual response
      console.log('Response status:', response.status);
      console.log('Response data:', JSON.stringify(data, null, 2));
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details).toBeInstanceOf(Array);
      expect(data.details.length).toBeGreaterThan(0);
      
      // Check that we have validation errors for the expected fields
      const fieldErrors = data.details.map((d: any) => d.field);
      expect(fieldErrors).toContain('fullName');
      expect(fieldErrors).toContain('email');
      expect(fieldErrors).toContain('projectPurpose');
    });

    it('validates email format', async () => {
      const invalidData = {
        ...validFormData,
        email: 'invalid-email',
      };
      
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details.some((detail: any) => 
        detail.field === 'email' && detail.message.toLowerCase().includes('email')
      )).toBe(true);
    });

    it('validates phone number format when provided', async () => {
      const invalidData = {
        ...validFormData,
        phone: 'invalid-phone',
      };
      
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details.some((detail: any) => 
        detail.field === 'phone' && detail.message.toLowerCase().includes('phone')
      )).toBe(true);
    });

    it('validates project purpose minimum length', async () => {
      const invalidData = {
        ...validFormData,
        projectPurpose: 'short',
      };
      
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details.some((detail: any) => 
        detail.field === 'projectPurpose' && detail.message.includes('10 characters')
      )).toBe(true);
    });

    it('validates name format (letters and spaces only)', async () => {
      const invalidData = {
        ...validFormData,
        fullName: 'John123',
      };
      
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details.some((detail: any) => 
        detail.field === 'fullName' && (detail.message.includes('letters') || detail.message.includes('spaces'))
      )).toBe(true);
    });

    it('accepts Hebrew characters in name', async () => {
      const hebrewData = {
        ...validFormData,
        fullName: 'יוחנן דוד',
      };
      
      const request = createMockRequest(hebrewData);
      const response = await POST(request);
      
      expect(response.status).toBe(200);
    });

    it('validates character limits', async () => {
      const longData = {
        ...validFormData,
        fullName: 'a'.repeat(101), // Over 100 characters
        projectPurpose: 'a'.repeat(1001), // Over 1000 characters
        additionalInfo: 'a'.repeat(2001), // Over 2000 characters
      };
      
      const request = createMockRequest(longData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details.length).toBeGreaterThan(0);
      
      // Check that we have validation errors for the expected fields
      const fieldErrors = data.details.map((d: any) => d.field);
      expect(fieldErrors.some((field: string) => ['fullName', 'projectPurpose', 'additionalInfo'].includes(field))).toBe(true);
    });

    it('accepts optional fields as empty', async () => {
      const minimalData = {
        fullName: 'John Doe',
        email: 'john@example.com',
        projectPurpose: 'I need a landing page for my business',
      };
      
      const request = createMockRequest(minimalData);
      const response = await POST(request);
      
      expect(response.status).toBe(200);
    });

    it('validates preferred package enum', async () => {
      const invalidData = {
        ...validFormData,
        preferredPackage: 'invalid-package',
      };
      
      const request = createMockRequest(invalidData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
    });

    it('implements rate limiting', async () => {
      const ip = '10.0.0.100'; // Use a unique IP for this test
      
      // Make 5 requests (should all succeed)
      for (let i = 0; i < 5; i++) {
        const request = createMockRequest(validFormData, ip);
        const response = await POST(request);
        expect(response.status).toBe(200);
      }
      
      // 6th request should be rate limited
      const request = createMockRequest(validFormData, ip);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(429);
      expect(data.error).toBe('Too many requests. Please try again later.');
    }, 10000); // 10 second timeout

    it('detects spam content', async () => {
      const spamData = {
        ...validFormData,
        projectPurpose: 'I need help with my casino website and bitcoin trading',
      };
      
      const request = createMockRequest(spamData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Message flagged as spam.');
    });

    it('detects excessive links as spam', async () => {
      const spamData = {
        ...validFormData,
        projectPurpose: 'Check out https://example1.com and https://example2.com and https://example3.com',
      };
      
      const request = createMockRequest(spamData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Message flagged as spam.');
    });

    it('detects excessive caps as spam', async () => {
      const spamData = {
        ...validFormData,
        projectPurpose: 'I NEED A WEBSITE THAT WILL MAKE ME RICH QUICKLY!!!',
      };
      
      const request = createMockRequest(spamData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Message flagged as spam.');
    });

    it('detects repeated characters as spam', async () => {
      const spamData = {
        ...validFormData,
        projectPurpose: 'I need a websiteeeeeee for my business',
      };
      
      const request = createMockRequest(spamData);
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Message flagged as spam.');
    });

    it('handles malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'invalid json',
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid JSON format');
    });

    it('logs submission details', async () => {
      // Temporarily restore console.log for this test
      const originalLog = console.log;
      const logSpy = vi.fn();
      console.log = logSpy;
      
      const request = createMockRequest(validFormData);
      await POST(request);
      
      expect(logSpy).toHaveBeenCalledWith(
        'Contact form submission:',
        expect.objectContaining({
          timestamp: expect.any(String),
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+972501234567',
          package: 'recommended',
          budget: '2000-5000',
          timeline: '2-weeks',
          projectPurpose: expect.stringContaining('I need a landing page'),
        })
      );
      
      // Restore original console.log
      console.log = originalLog;
    });

    it('handles different IP sources for rate limiting', async () => {
      // Test with x-forwarded-for header
      const request1 = createMockRequest(validFormData, '10.0.0.200,10.0.0.1');
      const response1 = await POST(request1);
      expect(response1.status).toBe(200);
      
      // Test without x-forwarded-for header
      const request2 = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validFormData),
      });
      
      const response2 = await POST(request2);
      expect(response2.status).toBe(200);
    });

    it('handles email sending errors gracefully', async () => {
      // Mock environment variables
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        RESEND_API_KEY: 'test-key',
        BUSINESS_EMAIL: 'test@example.com',
        FROM_EMAIL: 'noreply@example.com',
      };

      // Mock Resend to throw an error
      const { Resend } = await import('resend');
      const mockResend = new Resend();
      vi.mocked(mockResend.emails.send).mockRejectedValueOnce(new Error('Email service error'));

      const request = createMockRequest(validFormData);
      const response = await POST(request);
      
      // Should still return success even if email fails
      expect(response.status).toBe(200);
      
      // Restore environment
      process.env = originalEnv;
    });

    it('skips email sending when Resend is not configured', async () => {
      // Mock environment without RESEND_API_KEY
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        RESEND_API_KEY: undefined,
      };

      const request = createMockRequest(validFormData);
      const response = await POST(request);
      
      expect(response.status).toBe(200);
      
      // Restore environment
      process.env = originalEnv;
    });

    it('validates environment variables for email configuration', async () => {
      // This test ensures the code handles missing environment variables gracefully
      const originalEnv = process.env;
      process.env = {
        ...originalEnv,
        RESEND_API_KEY: 'test-key',
        BUSINESS_EMAIL: undefined,
        FROM_EMAIL: undefined,
      };

      const request = createMockRequest(validFormData);
      const response = await POST(request);
      
      // Should still work with default values
      expect(response.status).toBe(200);
      
      // Restore environment
      process.env = originalEnv;
    });
  });
});
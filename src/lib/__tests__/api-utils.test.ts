import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';
import { ApiErrors, ApiSuccess, validateRequestBody, safeJsonParse, logApiRequest, logApiResponse } from '../api-utils';

// Mock console.log to avoid noise in tests
vi.spyOn(console, 'log').mockImplementation(() => {});

describe('API Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ApiErrors', () => {
    it('creates validation failed response', async () => {
      const details = [
        { field: 'email', message: 'Invalid email' },
        { field: 'name', message: 'Name required' }
      ];
      
      const response = ApiErrors.ValidationFailed(details);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.details).toEqual(details);
    });

    it('creates rate limited response', async () => {
      const response = ApiErrors.RateLimited();
      const data = await response.json();
      
      expect(response.status).toBe(429);
      expect(data.error).toBe('Too many requests. Please try again later.');
    });

    it('creates spam detected response', async () => {
      const response = ApiErrors.SpamDetected();
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe('Message flagged as spam.');
    });

    it('creates internal error response', async () => {
      const response = ApiErrors.InternalError();
      const data = await response.json();
      
      expect(response.status).toBe(500);
      expect(data.error).toBe('Internal server error');
    });

    it('creates bad request response', async () => {
      const message = 'Custom error message';
      const response = ApiErrors.BadRequest(message);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data.error).toBe(message);
    });
  });

  describe('ApiSuccess', () => {
    it('creates form submitted response', async () => {
      const id = 'contact_123';
      const response = ApiSuccess.FormSubmitted(id);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.message).toBe('Form submitted successfully');
      expect(data.id).toBe(id);
    });

    it('creates health check response', async () => {
      const message = 'API is working';
      const response = ApiSuccess.HealthCheck(message);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.message).toBe(message);
    });
  });

  describe('validateRequestBody', () => {
    const testSchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      age: z.number().optional(),
    });

    it('validates valid data successfully', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
      };

      const result = validateRequestBody(validData, testSchema);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('returns validation error for invalid data', async () => {
      const invalidData = {
        name: '',
        email: 'invalid-email',
      };

      const result = validateRequestBody(invalidData, testSchema);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const data = await result.error.json();
        expect(data.error).toBe('Validation failed');
        expect(data.details).toBeInstanceOf(Array);
        expect(data.details.length).toBeGreaterThan(0);
      }
    });

    it('handles non-Zod errors', async () => {
      // Create a schema that throws a non-Zod error
      const faultySchema = {
        parse: () => {
          throw new Error('Non-Zod error');
        }
      } as z.ZodSchema<any>;

      const result = validateRequestBody({}, faultySchema);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const data = await result.error.json();
        expect(data.error).toBe('Internal server error');
      }
    });
  });

  describe('safeJsonParse', () => {
    it('parses valid JSON successfully', async () => {
      const validJson = { name: 'John', email: 'john@example.com' };
      const request = new Request('http://example.com', {
        method: 'POST',
        body: JSON.stringify(validJson),
      });

      const result = await safeJsonParse(request);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validJson);
      }
    });

    it('handles invalid JSON gracefully', async () => {
      const request = new Request('http://example.com', {
        method: 'POST',
        body: 'invalid json',
      });

      const result = await safeJsonParse(request);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        const data = await result.error.json();
        expect(data.error).toBe('Invalid JSON format');
      }
    });
  });

  describe('logApiRequest', () => {
    it('logs request information', () => {
      const logSpy = vi.spyOn(console, 'log');
      
      logApiRequest('POST', '/api/test', '192.168.1.1', 'Mozilla/5.0', { userId: 123 });
      
      expect(logSpy).toHaveBeenCalledWith(
        'API Request:',
        expect.objectContaining({
          timestamp: expect.any(String),
          method: 'POST',
          path: '/api/test',
          ip: '192.168.1.1',
          userAgent: 'Mozilla/5.0',
          userId: 123,
        })
      );
    });

    it('logs request without optional parameters', () => {
      const logSpy = vi.spyOn(console, 'log');
      
      logApiRequest('GET', '/api/health', '10.0.0.1');
      
      expect(logSpy).toHaveBeenCalledWith(
        'API Request:',
        expect.objectContaining({
          timestamp: expect.any(String),
          method: 'GET',
          path: '/api/health',
          ip: '10.0.0.1',
          userAgent: undefined,
        })
      );
    });
  });

  describe('logApiResponse', () => {
    it('logs response information', () => {
      const logSpy = vi.spyOn(console, 'log');
      
      logApiResponse('POST', '/api/test', 200, 150, { responseSize: '1KB' });
      
      expect(logSpy).toHaveBeenCalledWith(
        'API Response:',
        expect.objectContaining({
          timestamp: expect.any(String),
          method: 'POST',
          path: '/api/test',
          status: 200,
          duration: '150ms',
          responseSize: '1KB',
        })
      );
    });

    it('logs response without optional parameters', () => {
      const logSpy = vi.spyOn(console, 'log');
      
      logApiResponse('GET', '/api/health', 200, 50);
      
      expect(logSpy).toHaveBeenCalledWith(
        'API Response:',
        expect.objectContaining({
          timestamp: expect.any(String),
          method: 'GET',
          path: '/api/health',
          status: 200,
          duration: '50ms',
        })
      );
    });
  });
});
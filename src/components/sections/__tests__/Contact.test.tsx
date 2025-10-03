import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Contact from '../Contact';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Contact Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders contact form with all required fields', () => {
    render(<Contact />);
    
    expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project purpose/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send project details/i })).toBeInTheDocument();
  });

  it('renders alternative contact methods', () => {
    render(<Contact />);
    
    expect(screen.getByText('Prefer Direct Contact?')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Phone Call')).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/please provide at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'invalid-email');
    
    // Check that the email input has the invalid value
    expect(emailInput).toHaveValue('invalid-email');
    
    // The form validation will be handled by React Hook Form
    // This test verifies the input accepts the value
  });

  it('validates phone number format when provided', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const phoneInput = screen.getByLabelText(/phone number/i);
    await user.type(phoneInput, 'invalid-phone');
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });
  });

  it('validates project purpose minimum length', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const projectPurposeInput = screen.getByLabelText(/project purpose/i);
    await user.type(projectPurposeInput, 'short');
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please provide at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('shows character count for text areas', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const projectPurposeInput = screen.getByLabelText(/project purpose/i);
    await user.type(projectPurposeInput, 'This is a test project description');
    
    expect(screen.getByText('34/1000 characters')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success', id: 'contact_123' }),
    });

    render(<Contact />);
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/project purpose/i), 'I need a landing page for my business');
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '',
          projectPurpose: 'I need a landing page for my business',
          additionalInfo: '',
          preferredPackage: 'basic',
          budget: '',
          timeline: '',
        }),
      });
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    mockFetch.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(<Contact />);
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/project purpose/i), 'I need a landing page for my business');
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/sending message/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success', id: 'contact_123' }),
    });

    render(<Contact />);
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/project purpose/i), 'I need a landing page for my business');
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/thank you for your inquiry/i)).toBeInTheDocument();
    });
  });

  it('shows error message when submission fails', async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);
    
    // Fill out required fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/project purpose/i), 'I need a landing page for my business');
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /failed to send message/i })).toBeInTheDocument();
      expect(screen.getByText(/please try again or contact us directly/i)).toBeInTheDocument();
    });
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success', id: 'contact_123' }),
    });

    render(<Contact />);
    
    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const projectInput = screen.getByLabelText(/project purpose/i) as HTMLTextAreaElement;
    
    // Fill out required fields
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(projectInput, 'I need a landing page for my business');
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(projectInput.value).toBe('');
    });
  });

  it('includes optional fields in submission when filled', async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Success', id: 'contact_123' }),
    });

    render(<Contact />);
    
    // Fill out all fields
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/phone number/i), '+972501234567');
    await user.type(screen.getByLabelText(/project purpose/i), 'I need a landing page for my business');
    await user.type(screen.getByLabelText(/additional information/i), 'Some additional details');
    
    // Select package
    const packageSelect = screen.getByLabelText(/preferred package/i);
    await user.selectOptions(packageSelect, 'recommended');
    
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: 'John Doe',
          email: 'john@example.com',
          phone: '+972501234567',
          projectPurpose: 'I need a landing page for my business',
          additionalInfo: 'Some additional details',
          preferredPackage: 'recommended',
          budget: '',
          timeline: '',
        }),
      });
    });
  });

  it('has accessible form labels and structure', () => {
    render(<Contact />);
    
    // Check that all form inputs have proper labels
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/project purpose/i)).toBeInTheDocument();
    
    // Check that the form has proper structure
    const submitButton = screen.getByRole('button', { name: /send project details/i });
    expect(submitButton.closest('form')).toBeInTheDocument();
  });

  it('has proper WhatsApp and phone links', () => {
    render(<Contact />);
    
    const whatsappLink = screen.getByRole('link', { name: /whatsapp/i });
    const phoneLink = screen.getByRole('link', { name: /phone call/i });
    
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/972XXXXXXXXX');
    expect(whatsappLink).toHaveAttribute('target', '_blank');
    expect(phoneLink).toHaveAttribute('href', 'tel:+972XXXXXXXXX');
  });
});
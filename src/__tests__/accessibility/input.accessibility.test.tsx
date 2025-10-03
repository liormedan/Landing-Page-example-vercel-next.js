import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input } from '@/components/ui/Input';

expect.extend(toHaveNoViolations);

describe('Input Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Input label="Email" type="email" placeholder="Enter your email" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper label association', () => {
    render(<Input label="Email" type="email" />);
    
    const input = screen.getByRole('textbox', { name: 'Email' });
    const label = screen.getByText('Email');
    
    expect(input).toHaveAttribute('id');
    expect(label).toHaveAttribute('for', input.getAttribute('id'));
  });

  it('should show required indicator in label', () => {
    render(<Input label="Email" type="email" required />);
    
    const label = screen.getByText('Email');
    expect(label).toHaveClass('after:content-[\'*\']');
  });

  it('should have proper ARIA attributes for validation', () => {
    render(<Input label="Email" type="email" error="Invalid email" />);
    
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
    
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Invalid email');
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
  });

  it('should associate helper text with input', () => {
    render(<Input label="Password" type="password" helperText="Must be at least 8 characters" />);
    
    const input = screen.getByRole('textbox', { name: 'Password' });
    const helperText = screen.getByText('Must be at least 8 characters');
    
    expect(input).toHaveAttribute('aria-describedby');
    expect(helperText).toHaveAttribute('id');
    
    const describedBy = input.getAttribute('aria-describedby');
    const helperTextId = helperText.getAttribute('id');
    expect(describedBy).toContain(helperTextId);
  });

  it('should be focusable with keyboard', async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);
    
    const input = screen.getByRole('textbox', { name: 'Name' });
    
    await user.tab();
    expect(input).toHaveFocus();
  });

  it('should support keyboard input', async () => {
    const user = userEvent.setup();
    render(<Input label="Name" />);
    
    const input = screen.getByRole('textbox', { name: 'Name' });
    
    await user.click(input);
    await user.type(input, 'John Doe');
    
    expect(input).toHaveValue('John Doe');
  });

  it('should have proper required attribute', () => {
    render(<Input label="Email" type="email" required />);
    
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-required', 'true');
  });

  it('should handle disabled state properly', () => {
    render(<Input label="Disabled" disabled />);
    
    const input = screen.getByRole('textbox', { name: 'Disabled' });
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-50');
  });

  it('should work without label when aria-label is provided', async () => {
    const { container } = render(<Input aria-label="Search" type="search" />);
    
    const input = screen.getByRole('searchbox', { name: 'Search' });
    expect(input).toBeInTheDocument();
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should prioritize error over helper text in aria-describedby', () => {
    render(
      <Input 
        label="Email" 
        type="email" 
        error="Invalid email" 
        helperText="Enter a valid email address"
      />
    );
    
    const input = screen.getByRole('textbox', { name: 'Email' });
    const errorMessage = screen.getByRole('alert');
    
    expect(input).toHaveAttribute('aria-describedby');
    expect(errorMessage).toBeInTheDocument();
    
    // Helper text should not be visible when there's an error
    expect(screen.queryByText('Enter a valid email address')).not.toBeInTheDocument();
  });
});
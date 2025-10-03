import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Textarea from '../Textarea';

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter description" />);
    const textarea = screen.getByPlaceholderText('Enter description');
    expect(textarea).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Textarea error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toHaveClass('text-red-600');
  });

  it('displays helper text when no error', () => {
    render(<Textarea helperText="Enter a detailed description" />);
    expect(screen.getByText('Enter a detailed description')).toBeInTheDocument();
    expect(screen.getByText('Enter a detailed description')).toHaveClass('text-gray-500');
  });

  it('shows character count when enabled', () => {
    render(
      <Textarea 
        value="Hello world" 
        maxLength={100} 
        showCharCount 
        onChange={() => {}} 
      />
    );
    expect(screen.getByText('11/100')).toBeInTheDocument();
  });

  it('applies error styling to textarea', () => {
    render(<Textarea error="Error message" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-red-500', 'focus:ring-red-500');
  });

  it('handles value changes', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    
    fireEvent.change(textarea, { target: { value: 'test content' } });
    expect(textarea).toHaveValue('test content');
  });

  it('can be disabled', () => {
    render(<Textarea disabled />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
  });

  it('applies fullWidth class', () => {
    render(<Textarea fullWidth />);
    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveClass('w-full');
  });

  it('respects maxLength', () => {
    render(<Textarea maxLength={50} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '50');
  });

  it('applies custom className', () => {
    render(<Textarea className="custom-textarea" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-textarea');
  });

  it('has default styling', () => {
    render(<Textarea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('rounded-lg', 'border', 'border-gray-300', 'bg-white', 'resize-vertical');
  });
});
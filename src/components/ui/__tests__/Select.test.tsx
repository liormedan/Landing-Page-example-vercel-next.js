import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Select from '../Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

describe('Select', () => {
  it('renders with options', () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    // Check if options are rendered
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select label="Choose option" options={mockOptions} />);
    expect(screen.getByText('Choose option')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders with placeholder', () => {
    render(<Select placeholder="Select an option" options={mockOptions} />);
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Select error="Please select an option" options={mockOptions} />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
    expect(screen.getByText('Please select an option')).toHaveClass('text-red-600');
  });

  it('displays helper text when no error', () => {
    render(<Select helperText="Choose your preferred option" options={mockOptions} />);
    expect(screen.getByText('Choose your preferred option')).toBeInTheDocument();
    expect(screen.getByText('Choose your preferred option')).toHaveClass('text-gray-500');
  });

  it('applies error styling to select', () => {
    render(<Select error="Error message" options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-500', 'focus:ring-red-500');
  });

  it('handles value changes', () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(select).toHaveValue('option2');
  });

  it('can be disabled', () => {
    render(<Select disabled options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('applies fullWidth class', () => {
    render(<Select fullWidth options={mockOptions} />);
    const container = screen.getByRole('combobox').parentElement?.parentElement;
    expect(container).toHaveClass('w-full');
  });

  it('handles disabled options', () => {
    render(<Select options={mockOptions} />);
    const disabledOption = screen.getByRole('option', { name: 'Option 3' });
    expect(disabledOption).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Select className="custom-select" options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-select');
  });

  it('has default styling', () => {
    render(<Select options={mockOptions} />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('rounded-lg', 'border', 'border-gray-300', 'bg-white');
  });
});
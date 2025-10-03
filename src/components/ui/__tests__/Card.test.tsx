import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../Card';

describe('Card', () => {
  it('renders with children', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Card title="Card Title">
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Title')).toHaveClass('text-lg', 'font-semibold');
  });

  it('applies hover effects when hover prop is true', () => {
    render(
      <Card hover>
        <p>Hoverable card</p>
      </Card>
    );
    const card = screen.getByText('Hoverable card').parentElement;
    expect(card).toHaveClass('hover:shadow-md', 'hover:border-gray-300', 'hover:-translate-y-1');
  });

  it('applies different padding sizes', () => {
    const { rerender } = render(
      <Card padding="sm">
        <p>Small padding</p>
      </Card>
    );
    let card = screen.getByText('Small padding').parentElement;
    expect(card).toHaveClass('p-4');

    rerender(
      <Card padding="md">
        <p>Medium padding</p>
      </Card>
    );
    card = screen.getByText('Medium padding').parentElement;
    expect(card).toHaveClass('p-6');

    rerender(
      <Card padding="lg">
        <p>Large padding</p>
      </Card>
    );
    card = screen.getByText('Large padding').parentElement;
    expect(card).toHaveClass('p-8');
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-card">
        <p>Custom card</p>
      </Card>
    );
    const card = screen.getByText('Custom card').parentElement;
    expect(card).toHaveClass('custom-card');
  });

  it('has default styling', () => {
    render(
      <Card>
        <p>Default card</p>
      </Card>
    );
    const card = screen.getByText('Default card').parentElement;
    expect(card).toHaveClass('bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow-sm');
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Digit from './Digit';

beforeEach(() => {
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe('<Digit>', () => {
  it('renders digits', () => {
    render(<Digit value={5} />);

    expect(screen.getByTestId('segment-a')).not.toHaveAttribute('disabled');
    expect(screen.getByTestId('segment-b')).toHaveAttribute('disabled');
    expect(screen.getByTestId('segment-c')).not.toHaveAttribute('disabled');
    expect(screen.getByTestId('segment-d')).not.toHaveAttribute('disabled');
    expect(screen.getByTestId('segment-e')).toHaveAttribute('disabled');
    expect(screen.getByTestId('segment-f')).not.toHaveAttribute('disabled');
    expect(screen.getByTestId('segment-g')).not.toHaveAttribute('disabled');
  });

  it("doesn't accept negative numbers", () => {
    expect(() => {
      render(<Digit value={-1} />);
    }).toThrow(TypeError);
  });

  it("doesn't accept numbers with multiple digits", () => {
    expect(() => {
      render(<Digit value={10} />);
    }).toThrow(TypeError);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlobalStateProvider } from '../hooks/useGlobalState';
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
    render(
      <GlobalStateProvider>
        <Digit value={5} />
      </GlobalStateProvider>
    );

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
      render(
        <GlobalStateProvider>
          <Digit value={-1} />
        </GlobalStateProvider>
      );
    }).toThrow(TypeError);
  });

  it("doesn't accept numbers with multiple digits", () => {
    expect(() => {
      render(
        <GlobalStateProvider>
          <Digit value={10} />
        </GlobalStateProvider>
      );
    }).toThrow(TypeError);
  });
});

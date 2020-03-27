import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlobalStateProvider } from '../hooks/useGlobalState';
import Number from './Number';

beforeEach(() => {
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

describe('<Number>', () => {
  it('renders one digit by default', () => {
    render(
      <GlobalStateProvider>
        <Number value={5} />
      </GlobalStateProvider>
    );
    const digitEls = screen.getAllByTestId('segmented-digit');

    expect(digitEls).toHaveLength(1);
  });

  it('renders multiple digits', () => {
    render(
      <GlobalStateProvider>
        <Number size={3} value={5} />
      </GlobalStateProvider>
    );
    const digitEls = screen.getAllByTestId('segmented-digit');

    expect(digitEls).toHaveLength(3);
  })
});

import React from 'react';
import { render } from '@testing-library/react';
import { GlobalStateProvider } from '../hooks/useGlobalState';
import Digit from './Digit';

beforeEach(() => {
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

const setup = digits => {
  const utils = render(
    <GlobalStateProvider>
      <Digit value={digits} />
    </GlobalStateProvider>
  );

  return utils;
};

describe('<Digit>', () => {
  it('renders digits', () => {
    const { getByTestId } = setup(5);

    expect(getByTestId('segment-a')).not.toHaveAttribute('disabled');
    expect(getByTestId('segment-b')).toHaveAttribute('disabled');
    expect(getByTestId('segment-c')).not.toHaveAttribute('disabled');
    expect(getByTestId('segment-d')).not.toHaveAttribute('disabled');
    expect(getByTestId('segment-e')).toHaveAttribute('disabled');
    expect(getByTestId('segment-f')).not.toHaveAttribute('disabled');
    expect(getByTestId('segment-g')).not.toHaveAttribute('disabled');
  });

  it("doesn't accept negative numbers", () => {
    expect(() => setup(-1)).toThrow(TypeError);
  });

  it("doesn't accept numbers with multiple digits", () => {
    expect(() => setup(10)).toThrow(TypeError);
  });
});

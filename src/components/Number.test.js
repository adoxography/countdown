import React from 'react';
import { render } from '@testing-library/react';
import { GlobalStateProvider } from '../hooks/useGlobalState';
import Number from './Number';

beforeEach(() => {
  jest.spyOn(console, 'error');
  console.error.mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

const setup = ({ value, size = undefined }) => {
  const utils = render(
    <GlobalStateProvider>
      <Number value={value} size={size} />
    </GlobalStateProvider>
  );

  const digitEls = utils.getAllByTestId('segmented-digit');

  return {
    digitEls,
    ...utils
  };
};

describe('<Number>', () => {
  it('renders one digit by default', () => {
    const { digitEls } = setup({ value: 5 });
    expect(digitEls).toHaveLength(1);
  });

  it('renders multiple digits', () => {
    const { digitEls } = setup({ value: 5, size: 3});
    expect(digitEls).toHaveLength(3);
  })
});

import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import App from './App';

const setup = () => {
  const utils = render(<App />);
  const colourButton = utils.getByLabelText('colour select');
  const digits = utils.getAllByTestId('segmented-digit');

  return {
    colourButton,
    digits,
    ...utils
  };
};

describe('<App>', () => {
  it('changes colour', async () => {
    const { colourButton, digits } = setup();
    fireEvent.change(colourButton, { target: { value: '#00ff00' } });
    wait(() => expect(digits[0]).toHaveStyle({ fill: '#00ff00' }));
  });
});

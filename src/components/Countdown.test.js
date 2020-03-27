import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { GlobalStateProvider } from '../hooks/useGlobalState';
import Countdown from './Countdown';

const setup = () => {
  const utils = render(
    <GlobalStateProvider>
      <Countdown />
    </GlobalStateProvider>
  );
  const seconds = utils.getByLabelText('seconds');
  const minutes = utils.getByLabelText('minutes');
  const hours = utils.getByLabelText('hours');
  const remainingSeconds = utils.getByLabelText('remaining seconds');
  const startButton = utils.getByLabelText('start');

  return {
    seconds,
    minutes,
    hours,
    remainingSeconds,
    startButton,
    ...utils
  };
};

describe('<Countdown>', () => {
  it('adjusts the time with the up arrow key', () => {
    const { seconds, remainingSeconds } = setup();
    fireEvent.keyDown(seconds, { keyCode: 38 });
    expect(remainingSeconds).toHaveValue('1');
  });

  it('adjusts the time with the k key', () => {
    const { minutes, remainingSeconds } = setup();
    fireEvent.keyDown(minutes, { key: 'k', keyCode: 75 });
    expect(remainingSeconds).toHaveValue('60');
  });

  it('adjusts the time with the wheel moving up', () => {
    const { hours, remainingSeconds } = setup();
    fireEvent.wheel(hours, { deltaY: 1 });
    expect(remainingSeconds).toHaveValue('3600');
  });

  it('adjusts the time with the down arrow key', () => {
    const { hours, remainingSeconds } = setup();
    fireEvent.keyDown(hours, { keyCode: 40 });
    expect(remainingSeconds).toHaveValue('82800');
  });

  it('adjusts the time with the j key', () => {
    const { seconds, remainingSeconds } = setup();
    fireEvent.keyDown(seconds, { key: 'j', keyCode: 74 });
    expect(remainingSeconds).toHaveValue('86399');
  });

  it('adjusts the time with the wheel moving down', () => {
    const { minutes, remainingSeconds } = setup();
    fireEvent.wheel(minutes, { deltaY: -1 });
    expect(remainingSeconds).toHaveValue('86340');
  });

  it('adjust time with the number keys', () => {
    const { hours, remainingSeconds } = setup();
    fireEvent.change(hours, { target: { value: '13' } });
    expect(remainingSeconds).toHaveValue('46800');
  });

  it('shifts focus to the next number', () => {
    const { hours, minutes } = setup();
    fireEvent.change(hours, { target: { value: '13' } });
    expect(minutes).toHaveFocus();
  });

  it('starts when the start button is pressed', async () => {
    const { seconds, startButton, remainingSeconds } = setup();
    fireEvent.change(seconds, { target: { value: '30' } });
    fireEvent.click(startButton);
    wait(() => expect(remainingSeconds).toHaveValue('29'));
  });
});

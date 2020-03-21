import React from 'react';
import PropTypes from 'prop-types';
import Number from './Number';
import { units } from '../util';
import './Clock.css';

const { SECOND, MINUTE, HOUR } = units;

/**
 * Splits a time in seconds into its hours, minutes, and remaining seconds.
 *
 * @param totalSeconds  The seconds to partition
 * @return  An object with `hours`, `minutes`, and `seconds` keys
 */
const splitSeconds = totalSeconds => {
  const seconds = totalSeconds % 60;
  totalSeconds = Math.floor(totalSeconds / 60);
  const minutes = totalSeconds % 60;
  totalSeconds = Math.floor(totalSeconds / 60);
  const hours = totalSeconds % 24;

  return { hours, minutes, seconds };
};

/**
 * Displays a clock, and emits events from its member components.
 *
 * @param time       The time to display, in seconds
 * @param disabled   True if the component should listen for events; false
 *                   otherwise
 * @param onWheel    Handler for wheel events
 * @param onKeyDown  Handler for keyDown events
 */
const Clock = ({ time, disabled, onWheel, onKeyDown, onChange }) => {
  const { hours, minutes, seconds } = splitSeconds(time);
  const refs = [React.useRef(null), React.useRef(null), React.useRef(null)];

  /**
   * Intercepts keyDown events to check for left or right arrow presses, which
   * shift focus to the number to the left or right of the currently focused
   * one
   */
  const handleKeyDown = (e, data) => {
    const { index } = data;

    switch(e.keyCode) {
      case 37:  // Left arrow
      case 72:  // h key
        e.preventDefault();
        refs[(index-1+3) % 3].current.focus();
        break;
      case 39:  // Right arrow
      case 76:  // l key
        e.preventDefault();
        refs[(index+1) % 3].current.focus();
        break
      case 38:  // Up arrow
      case 40:  // Down arrow
      case 74:  // j key
      case 75:  // k key
        e.preventDefault();
        e.target.select();
        break;
      default:
        break;
    }

    onKeyDown(e, data);
  }

  /**
   * Intercepts change events to check if the number is full; if it is, shifts
   * focus to the next number
  */
  const handleChange = (e, data) => {
    const { index } = data;

    if (e.target.value.length === e.target.maxLength) {
      e.preventDefault();
      if (index < 2) {
        refs[index+1].current.focus();
      } else {
        e.target.blur();
      }
    }

    onChange(e, data);
  };

  const handleWheel = (e, data) => disabled || onWheel(e, data);

  return (
    <div className="clock">
      <Number
        ref={refs[0]}
        disabled={disabled}
        value={hours}
        size={2}
        onWheel={e => handleWheel(e, { amount: HOUR })}
        onKeyDown={e => handleKeyDown(e, { index: 0, amount: HOUR })}
        onChange={(e, data) => handleChange(e, { ...data, index: 0, amount: HOUR })}
      />
      <Number
        ref={refs[1]}
        disabled={disabled}
        value={minutes}
        size={2}
        onWheel={e => handleWheel(e, { amount: MINUTE })}
        onKeyDown={e => handleKeyDown(e, { index: 1, amount: MINUTE })}
        onChange={(e, data) => handleChange(e, { ...data, index: 1, amount: MINUTE })}
      />
      <Number
        ref={refs[2]}
        disabled={disabled}
        value={seconds}
        size={2}
        onWheel={e => handleWheel(e, { amount: SECOND })}
        onKeyDown={e => handleKeyDown(e, { index: 2, amount: SECOND })}
        onChange={(e, data) => handleChange(e, { ...data, index: 2, amount: SECOND })}
      />
    </div>
  );
};

Clock.defaultProps = {
  onWheel: () => {},
  onKeyDown: () => {},
  onChange: () => {},
  disabled: false
};

Clock.propTypes = {
  time: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onWheel: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func
};

export default Clock;

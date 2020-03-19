import React from 'react';
import PropTypes from 'prop-types';
import Number from './Number';
import { units } from '../util';

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
const Clock = ({ time, disabled, onWheel, onKeyDown }) => {
  const { hours, minutes, seconds } = splitSeconds(time);
  const refs = [React.useRef(null), React.useRef(null), React.useRef(null)];

  /**
   * Intercepts keyDown events to check for left or right arrow presses, which
   * shift focus to the number to the left or right of the currently focused
   * one
   */
  const handleKeyDown = (e, index, unit) => {
    switch(e.keyCode) {
      case 37:  // Left arrow
      case 72:  // h key
        refs[(index-1+3) % 3].current.focus();
        break;
      case 39:  // Right arrow
      case 76:  // l key
        refs[(index+1) % 3].current.focus();
        break
      default:
        break;
    }

    onKeyDown(e, unit);
  }

  return (
    <div className="clock">
      <Number
        ref={refs[0]}
        disabled={disabled}
        value={hours}
        size={2}
        onWheel={e => disabled || onWheel(e, HOUR)}
        onKeyDown={e => handleKeyDown(e, 0, HOUR)}
      />
      <Number
        ref={refs[1]}
        disabled={disabled}
        value={minutes}
        size={2}
        onWheel={e => disabled || onWheel(e, MINUTE)}
        onKeyDown={e => handleKeyDown(e, 1, MINUTE)}
      />
      <Number
        ref={refs[2]}
        disabled={disabled}
        value={seconds}
        size={2}
        onWheel={e => disabled || onWheel(e, SECOND)}
        onKeyDown={e => handleKeyDown(e, 2, SECOND)}
      />
    </div>
  );
};

Clock.defaultProps = {
  onWheel: () => {},
  onKeyDown: () => {},
  disabled: false
};

Clock.propTypes = {
  time: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onWheel: PropTypes.func,
  onKeyDown: PropTypes.func
};

export default Clock;

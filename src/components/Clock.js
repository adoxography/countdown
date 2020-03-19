import React from 'react';
import PropTypes from 'prop-types';
import Number from './Number';

const splitSeconds = totalSeconds => {
  const seconds = totalSeconds % 60;
  totalSeconds = Math.floor(totalSeconds / 60);
  const minutes = totalSeconds % 60;
  totalSeconds = Math.floor(totalSeconds / 60);
  const hours = totalSeconds % 24;

  return { hours, minutes, seconds };
};

const Clock = ({ time, disabled, onWheel, onKeyDown }) => {
  const { hours, minutes, seconds } = splitSeconds(time);
  const refs = [React.useRef(null), React.useRef(null), React.useRef(null)];

  /**
   * Intercepts keyDown events to check for left or right arrow presses, which
   * shift focus to the number to the left or right of the currently focused
   * one
   */
  const handleKeyDown = (e, index, unit) => {
    if (e.keyCode === 37) {
      // Left arrow
      refs[(index-1+3) % 3].current.focus();
    } else if (e.keyCode === 39) {
      // Right arrow
      refs[(index+1) % 3].current.focus();
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
        onWheel={e => disabled || onWheel(e, 'hour')}
        onKeyDown={e => handleKeyDown(e, 0, 'hour')}
      />
      <Number
        ref={refs[1]}
        disabled={disabled}
        value={minutes}
        size={2}
        onWheel={e => disabled || onWheel(e, 'minute')}
        onKeyDown={e => handleKeyDown(e, 1, 'minute')}
      />
      <Number
        ref={refs[2]}
        disabled={disabled}
        value={seconds}
        size={2}
        onWheel={e => disabled || onWheel(e, 'second')}
        onKeyDown={e => handleKeyDown(e, 2, 'second')}
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

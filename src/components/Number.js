import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Digit from './Digit';
import './Number.css';

/**
 * Displays a multi-digit segmented number
 * 
 * @param size       The number of digits to display
 * @param value      The number to display as highlighted segments
 * @param disabled   True if the component should listen for events; false otherwise
 * @param onWheel    Event handler for wheel events
 * @param onKeyDown  Event handler for keyDown events
 */
const Number = React.forwardRef(({ size, value, disabled, onWheel, onKeyDown, onChange }, ref) => {
  
  /**
   * Packages packages up the value information and sends it along with the
   * event on a change
   */
  const handleChange = e => {
    const newValue = parseInt(e.target.value) || 0;
    const delta = newValue - value;

    onChange(e, {
      oldValue: value,
      newValue,
      delta
    });
  };

  const width = `${.615 * size}em`;

  return (
    <div className="segmented-number" onWheel={onWheel} style={{ width  }}>

      <div className="segmented-display">
        {_.rangeRight(size).map(n => <Digit key={n} value={Math.floor(value / 10**n) % 10} />)}
      </div>

      <input
        type="input"
        ref={ref}
        className="segmented-input"
        style={{ maxWidth: width }}
        disabled={disabled}
        onFocus={e => e.target.select()}
        defaultValue="00"
        size={size}
        maxLength={size}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        onBlur={e => e.target.value = '00'}
      />
    </div>
  );
});

Number.defaultProps = {
  size: 1,
  disabled: false,
  onWheel: () => {},
  onKeyDown: () => {},
  onChange: () => {}
};

Number.propTypes = {
  size: PropTypes.number,
  disabled: PropTypes.bool,
  value: PropTypes.number.isRequired,
  onWheel: PropTypes.func,
  onKeyDown: PropTypes.func,
  onChange: PropTypes.func
};

export default Number;

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
const Number = React.forwardRef(({ size, value, disabled, onWheel, onKeyDown }, ref) => (
  <div
    ref={ref}
    disabled={disabled}
    tabIndex={disabled ? '' : '0'}
    className="segmented-number"
    onWheel={onWheel}
    onKeyDown={onKeyDown}
  >
    {_.rangeRight(size).map(n => <Digit key={n} value={Math.floor(value / 10**n) % 10} />)}
  </div>
));

Number.defaultProps = {
  size: 1,
  disabled: false,
  onWheel: () => {},
  onKeyDown: () => {}
};

Number.propTypes = {
  size: PropTypes.number,
  disabled: PropTypes.bool,
  value: PropTypes.number.isRequired,
  onWheel: PropTypes.func,
  onKeyDown: PropTypes.func
};

export default Number;

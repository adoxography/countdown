import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Digit from './Digit';
import './Number.css';

const Number = React.forwardRef(({ size, value, onWheel, onKeyDown, disabled }, ref) => (
  <div ref={ref} disabled={disabled} tabIndex={disabled ? '' : '0'} className="segmented-number" onWheel={onWheel} onKeyDown={onKeyDown}>
    {_.rangeRight(size).map(n => (
      <Digit key={n} value={Math.floor(value / 10**n) % 10}></Digit>
    ))}
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

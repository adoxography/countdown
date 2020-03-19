import React from 'react';
import './Digit.css';

/**
 * The segments settings for each base-10 digit. Starts at the top segment,
 * goes around clockwise, and ends with the centre segment
 */
const segmentSettings = [
  [true,  true,  true,  true,  true,  true,  false], // 0
  [false, true,  true,  false, false, false, false], // 1
  [true,  true,  false, true,  true,  false, true],  // 2
  [true,  true,  true,  true,  false, false, true],  // 3
  [false, true,  true,  false, false, true,  true],  // 4
  [true,  false, true,  true,  false, true,  true],  // 5
  [true,  false, true,  true,  true,  true,  true],  // 6
  [true,  true,  true,  false, false, false, false], // 7
  [true,  true,  true,  true,  true,  true,  true],  // 8
  [true,  true,  true,  true,  false, true,  true]   // 9
];

/**
 * A seven-segment digit
 *
 * @param value  The digit to display. Must be between 0 and 9, inclusive
 */
const Digit = ({ value }) => {
  const settings = segmentSettings[value];

  return (
    <div className="segmented-digit">
      <svg width="0" height="0" viewBox="0 0 0 0">
        <defs>
          <g id="unit-h">
            <path d="M0 20 L20 40 L180 40 L200 20 L180 0 L20 0 Z"></path>
          </g>
          <g id="unit-v">
            <path d="M20 0 L0 20 L0 180 L20 200 L40 180 L40 20 Z"></path>
          </g>
        </defs>
      </svg>

      <svg data-testid="segmented-digit" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink" width="65" height="120" viewBox="0 0 260 480">
        <use className="segment" data-testid="segment-a" disabled={!settings[0]} xlinkHref="#unit-h" x="30" y="0"></use>
        <use className="segment" data-testid="segment-b" disabled={!settings[1]} xlinkHref="#unit-v" x="220" y="30"></use>
        <use className="segment" data-testid="segment-c" disabled={!settings[2]} xlinkHref="#unit-v" x="220" y="250"></use>
        <use className="segment" data-testid="segment-d" disabled={!settings[3]} xlinkHref="#unit-h" x="30" y="440"></use>
        <use className="segment" data-testid="segment-e" disabled={!settings[4]} xlinkHref="#unit-v" x="0" y="250"></use>
        <use className="segment" data-testid="segment-f" disabled={!settings[5]} xlinkHref="#unit-v" x="0" y="30"></use>
        <use className="segment" data-testid="segment-g" disabled={!settings[6]} xlinkHref="#unit-h" x="30" y="220"></use>
      </svg>
    </div>
  );
};

Digit.propTypes = {
  value: function (props, propName) {
    const prop = props[propName];
    if (isNaN(prop) || prop < 0 || prop > 9) {
      return new Error(`Invalid value '${prop}' supplied to Digit`);
    }
  }
};

export default Digit;

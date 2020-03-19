import React from 'react';
import './Digit.css';

const segmentSettings = [
  [true,  true,  true,  true,  true,  true,  false],
  [false, true,  true,  false, false, false, false],
  [true,  true,  false, true,  true,  false, true],
  [true,  true,  true,  true,  false, false, true],
  [false, true,  true,  false, false, true,  true],
  [true,  false, true,  true,  false, true,  true],
  [true,  false, true,  true,  true,  true,  true],
  [true,  true,  true,  false, false, false, false],
  [true,  true,  true,  true,  true,  true,  true],
  [true,  true,  true,  true,  false, true,  true]
];

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

      <svg xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink" width="65" height="120" viewBox="0 0 260 480">
        <use className="segment" disabled={!settings[0]} xlinkHref="#unit-h" x="30" y="0"></use>
        <use className="segment" disabled={!settings[1]} xlinkHref="#unit-v" x="220" y="30"></use>
        <use className="segment" disabled={!settings[2]} xlinkHref="#unit-v" x="220" y="250"></use>
        <use className="segment" disabled={!settings[3]} xlinkHref="#unit-h" x="30" y="440"></use>
        <use className="segment" disabled={!settings[4]} xlinkHref="#unit-v" x="0" y="250"></use>
        <use className="segment" disabled={!settings[5]} xlinkHref="#unit-v" x="0" y="30"></use>
        <use className="segment" disabled={!settings[6]} xlinkHref="#unit-h" x="30" y="220"></use>
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

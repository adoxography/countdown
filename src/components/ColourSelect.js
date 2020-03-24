import React from 'react';
import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';
import './ColourSelect.css';

const ColourSelect = ({ className, colour, onChange }) => {
  const inputEl = React.useRef(null);

  /**
   * Passes click events through to the input eleent
   */
  const handleClick = () => inputEl.current.click();

  return (
    <div className="colour-select-container" >
      <input
        type="color"
        aria-label="colour select"
        ref={inputEl}
        defaultValue={colour}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleClick}>
        <MaterialIcon icon="palette" />
      </button>
    </div>
  )
};

ColourSelect.defaultProps = {
  className: '',
  onClick: () => {}
};

ColourSelect.propTypes = {
  colour: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default ColourSelect;

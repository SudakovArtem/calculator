import React from 'react';
import PropTypes from 'prop-types';

const CalculatorKey = ({handleClick, className, value}) => {
  return (
    <div onClick={handleClick} className={className}>
      {value}
    </div>
  );
};

CalculatorKey.propTypes = {
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default CalculatorKey;

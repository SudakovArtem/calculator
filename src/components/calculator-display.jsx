import React from 'react';
import PropTypes from 'prop-types';

const CalculatorDisplay = ({displayValue}) => {
  return <div className="input">{displayValue}</div>;
};

CalculatorDisplay.propTypes = {
  displayValue: PropTypes.string.isRequired
};

export default CalculatorDisplay;

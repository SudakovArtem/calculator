import React, {useEffect, useState} from 'react';
import CalculatorDisplay from './components/calculator-display';
import CalculatorKey from './components/calculator-key';
import store from './store';

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [value, setValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const {numbers, operators, calculatorOperations} = store;

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(
        displayValue === '0' ? String(digit) : displayValue + digit
      );
    }
  };

  const inputDot = () => {
    if (!/\./.test(displayValue)) {
      setDisplayValue(displayValue + '.');
      setWaitingForOperand(false);
    }
  };

  const clearLastChar = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0');
  };

  const clearAll = () => {
    setValue(null);
    setDisplayValue('0');
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = calculatorOperations[operator](currentValue, inputValue);

      setValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleKeyDown = (event) => {
    let {key} = event;

    if (key === 'Enter') {
      key = '=';
    }

    if (+key) {
      event.preventDefault();
      inputDigit(key);
    } else if (key in calculatorOperations) {
      event.preventDefault();
      performOperation(key);
    } else if (key === '.') {
      event.preventDefault();
      inputDot();
    } else if (key === 'Backspace') {
      event.preventDefault();
      clearLastChar();
    } else if (key === 'Clear') {
      event.preventDefault();
      clearAll();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="calculator">
      <CalculatorDisplay displayValue={displayValue} />
      <div className="buttons">
        <div className="operators">
          {operators.map((operator) => (
            <CalculatorKey
              key={operator}
              value={operator}
              handleClick={performOperation.bind(null, operator)}
            />
          ))}
        </div>
        <div className="leftPanel">
          {numbers.map((arr, idx) => (
            <div key={idx} className="numbers">
              {arr.map((item) => (
                <CalculatorKey
                  key={item}
                  value={item}
                  handleClick={inputDigit.bind(null, item)}
                />
              ))}
            </div>
          ))}
          <div className="numbers">
            <CalculatorKey value={'0'} handleClick={inputDigit.bind(null, '0')}/>
            <CalculatorKey value={'.'} handleClick={inputDot} />
            <CalculatorKey value={'AC'} handleClick={clearAll} />
          </div>
        </div>
        <CalculatorKey
          className="equal"
          value="="
          handleClick={performOperation.bind(null, '=')}
        />
      </div>
    </div>
  );
};

export default Calculator;

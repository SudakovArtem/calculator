const store = {
  numbers: [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3']
  ],
  operators: ['+', '-', '*', '/'],
  calculatorOperations: {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
  }
};

export default store;

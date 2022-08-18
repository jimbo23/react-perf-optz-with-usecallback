import * as React from 'react';

const Button = ({ count, ...rest }) => {
  console.log('Button rerenders!');
  return <button {...rest}>{count}</button>;
};

export default React.memo(Button);

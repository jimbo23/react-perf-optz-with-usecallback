import * as React from 'react';

const Input = ({ onChangeText, ...rest }) => {
  console.log('Input rerenders');
  return <input onChange={onChangeText} {...rest} />;
};

export default React.memo(Input);

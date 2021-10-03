import * as React from 'react';
import ReactDOM from 'react-dom';
import Button from '@mui/material/Button';

export function Test() {
  return <Button variant="contained">Hello World</Button>;
}

ReactDOM.render(<Test />, document.querySelector('#app'));
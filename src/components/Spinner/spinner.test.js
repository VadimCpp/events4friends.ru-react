/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Spinner message="waiting" />, div);

  ReactDOM.unmountComponentAtNode(div);
});

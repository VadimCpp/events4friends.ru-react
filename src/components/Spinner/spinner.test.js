/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './index';

describe('Spinner component', () => {
  it('Has correct structure', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Spinner message="N/A" />, div);
    expect(div.hasChildNodes()).toBeTruthy();
    expect(div.childNodes.length).toBe(1);

    const spinnerContainer = div.childNodes[0];
    const svg = spinnerContainer.childNodes[0];
    const title = spinnerContainer.childNodes[1];

    expect(spinnerContainer.classList.contains('spinner')).toBeTruthy();
    expect(spinnerContainer.childNodes.length).toBe(2);
    expect(svg.classList.contains('spinner__svg')).toBeTruthy();
    expect(title.classList.contains('spinner__message')).toBeTruthy();

    ReactDOM.unmountComponentAtNode(div);
  });

  it('Display correct text', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Spinner message="loading" />, div);
    expect(div.innerHTML.includes('loading')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);

    ReactDOM.render(<Spinner message="few words status" />, div);
    expect(div.innerHTML.includes('few words status')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });
});

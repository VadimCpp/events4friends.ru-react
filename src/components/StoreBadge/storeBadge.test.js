/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import StoreBadge from './index';

describe('StoreBadge component', () => {
  it('Has correct structure', () => {
    const div = document.createElement('div');

    ReactDOM.render(<StoreBadge platform="ios" />, div);
    expect(div.hasChildNodes()).toBeTruthy();
    expect(div.childNodes.length).toBe(1);

    const storeBadgeContainer = div.childNodes[0];
    expect(storeBadgeContainer.tagName).toBe('A');
    expect(storeBadgeContainer.childNodes.length).toBe(1);
    expect(storeBadgeContainer.childNodes[0].tagName).toBe('IMG');

    ReactDOM.unmountComponentAtNode(div);
  });
});

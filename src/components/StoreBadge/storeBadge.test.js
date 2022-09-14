/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import StoreBadge from './index';

describe('StoreBadge component', () => {
  it('Has correct structure', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StoreBadge platform="ios" width="35" />, div);
    expect(div.hasChildNodes()).toBeTruthy();
    expect(div.childNodes.length).toBe(1);
    const storeBadgeContainer = div.childNodes[0];
    expect(storeBadgeContainer.tagName).toBe('A');
    expect(storeBadgeContainer.childNodes.length).toBe(1);
    expect(storeBadgeContainer.childNodes[0].tagName).toBe('IMG');
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Url is set correctly', () => {
    const div = document.createElement('div');
    const href =
      'https://apps.apple.com/us/app/events4friends-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE/id1509893426';
    ReactDOM.render(<StoreBadge platform="ios" width="35" />, div);
    const storeBadgeContainer = div.childNodes[0];
    expect(storeBadgeContainer.href).toBe(href);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Styles for img are set correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StoreBadge platform="ios" width="35" />, div);
    const storeBadgeContainer = div.childNodes[0];
    expect(storeBadgeContainer.childNodes[0].style.length).toBe(2);
    expect(storeBadgeContainer.childNodes[0].style[0]).toBe('width');
    expect(storeBadgeContainer.childNodes[0].style[1]).toBe('height');
    ReactDOM.unmountComponentAtNode(div);
  });
});

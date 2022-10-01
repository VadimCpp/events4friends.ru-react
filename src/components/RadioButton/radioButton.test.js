/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import RadioButton from './index';

describe('RadioButton component', () => {
  it('Has correct structure', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <RadioButton type="service" onClick={() => {}} active={false}>
        Test radio button
      </RadioButton>,
      div,
    );
    expect(div.hasChildNodes()).toBeTruthy();
    expect(div.childNodes.length).toBe(1);

    const buttonContainer = div.childNodes[0];

    expect(buttonContainer.classList.contains('radio-button')).toBeTruthy();
    expect(
      buttonContainer.classList.contains('radio-button--service'),
    ).toBeTruthy();
    expect(buttonContainer.childNodes.length).toBe(2);

    ReactDOM.unmountComponentAtNode(div);
  });

  it('Display correct text', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <RadioButton type="service" onClick={() => {}} active={false}>
        Correct text here
      </RadioButton>,
      div,
    );
    expect(div.innerHTML.includes('Correct text here')).toBeTruthy();
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Add correct default class events', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <RadioButton onClick={() => {}} active={false}>
        Default are events
      </RadioButton>,
      div,
    );
    expect(div.hasChildNodes()).toBeTruthy();
    expect(div.childNodes.length).toBe(1);

    const buttonContainer = div.childNodes[0];

    expect(buttonContainer.classList.contains('radio-button')).toBeTruthy();
    expect(
      buttonContainer.classList.contains('radio-button--events'),
    ).toBeTruthy();
    expect(buttonContainer.childNodes.length).toBe(2);

    ReactDOM.unmountComponentAtNode(div);
  });

  it('Add correct active class', () => {
    const div = document.createElement('div');

    ReactDOM.render(
      <RadioButton onClick={() => {}} active>
        Default are events
      </RadioButton>,
      div,
    );
    expect(div.hasChildNodes()).toBeTruthy();
    expect(div.childNodes.length).toBe(1);

    const btn = div.childNodes[0];
    const circle = btn.childNodes[0];

    expect(btn.classList.contains('radio-button')).toBeTruthy();
    expect(btn.classList.contains('radio-button--events')).toBeTruthy();
    expect(
      circle.classList.contains('radio-button__circle--active'),
    ).toBeTruthy();
    expect(btn.childNodes.length).toBe(2);

    ReactDOM.unmountComponentAtNode(div);
  });
});

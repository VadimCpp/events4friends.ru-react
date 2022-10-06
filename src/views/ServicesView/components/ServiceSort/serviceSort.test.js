/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import ServiceSort from './index';
import { ServiceSortingType } from '../../../../enums';

describe('ServiceSort component', () => {
  it('Has correct structure', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ServiceSort
        onSortTypeChange={() => {}}
        sortType={ServiceSortingType.SortByName}
        sortByName={ServiceSortingType.SortByName}
        sortByService={ServiceSortingType.SortByService}
        sortByPrice={ServiceSortingType.SortByPrice}
      />,
      div,
    );
    expect(div.hasChildNodes()).toBeTruthy();
    expect(div.childNodes.length).toBe(1);
    const serviceSortContainer = div.childNodes[0];
    expect(serviceSortContainer.tagName).toBe('DIV');
    expect(
      serviceSortContainer.classList.contains('service-sort'),
    ).toBeTruthy();
    expect(serviceSortContainer.childNodes.length).toBe(4);

    const label = serviceSortContainer.childNodes[0];
    expect(label.classList.contains('service-sort__label')).toBeTruthy();
    expect(label.innerHTML).toBe('Сортировка:');

    expect(
      serviceSortContainer.querySelectorAll('.radio-button--service').length,
    ).toBe(3);
    expect(
      serviceSortContainer.querySelectorAll('.radio-button--service-active')
        .length,
    ).toBe(1);
    ReactDOM.unmountComponentAtNode(div);
  });
});

/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import EventsFilter from './index';
import {EventsFilterType} from "../../../../enums";

const filterType = 'UPCOMING_EVENTS';

describe('EventsFilter component', () => {
  it('Has correct structure', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <EventsFilter
        onFilterTypeChange={() => {}}
        filterType={filterType}
        upcoming={EventsFilterType.Upcoming}
        past={EventsFilterType.Past}
      />,
      div,
    );

    expect(div.hasChildNodes()).toBeTruthy();
    const eventsFilterContainer = div.childNodes[0];
    expect(eventsFilterContainer.tagName).toBe('DIV');
    expect(eventsFilterContainer.classList.contains('events-filter'),
    ).toBeTruthy();
    expect(eventsFilterContainer.childNodes.length).toBe(3);
    const label = eventsFilterContainer.childNodes[0];
    expect(label.classList.contains('events-filter__label')).toBeTruthy();
    expect(label.innerHTML).toBe('Фильтр:');
    expect(
      eventsFilterContainer.querySelectorAll('.radio-button--events').length,
    ).toBe(2);
    expect(eventsFilterContainer.querySelectorAll('.radio-button--events-active').length,
  ).toBe(1);
  });
});

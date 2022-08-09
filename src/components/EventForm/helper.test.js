/* eslint-disable no-undef */
import { eventInitState } from './helper';

test('initial state is defined', () => {
  expect(eventInitState).toStrictEqual({
    contact: '',
    description: 'Описание',
    end: '',
    id: null,
    isOnline: true,
    location: '',
    name: '',
    start: '',
    summary: 'Название',
    timezone: '+0200', // ISO-8601
    communityId: '1',
  });
});

test('verify', () => {
  // TODO: implement
  expect(true).toBe(true);
});

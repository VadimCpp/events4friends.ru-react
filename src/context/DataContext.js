/* eslint-disable no-unused-vars */
import React from 'react';

const defaultData = {
  events: [], // список анонсов
  services: [], // список услуг
  createEvent: (data, callback) => {}, // метод создает новый анонс
  deleteEvent: (eventId, callback) => {}, // метод удаляет анонс
  editEvent: (data, docId, callback) => {}, // метод изменяет анонс
  config: {}, // настройки сайта
};

export const DataContext = React.createContext(defaultData);

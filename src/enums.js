const EventsFilterType = {
  Upcoming: 'UPCOMING_EVENTS',
  Past: 'PAST_EVENTS',
  // TODO: add more types here
};

const NOTICES = {
  CONNECT_TO_DB: 'Подключаемся к базе данных...',
  LOADING_EVT: 'Загружаем события...',
  LOADING_SERVICES: 'Загружаем услуги...',
  LOADING_SERVICE: 'Загружаем услугу...',
  LOADING: 'Загружаем...',
};

const ROUTES = {
  HOME: '/',
  EVENTS: '/events',
  SERVICES: '/services',
};

const MENU_ITEMS = [
  { title: 'Главная', slug: ROUTES.HOME },
  { title: 'Мероприятия', slug: ROUTES.EVENTS },
  { title: 'Услуги', slug: ROUTES.SERVICES },
];

const STORE_BADGE_ITEMS = [
  { platform: 'ios', width: 120 },
  { platform: 'android', width: 120 },
];

const ServiceSortingType = {
  SortByName: 'SORT_BY_NAME',
  SortByService: 'SORT_BY_SERVICE',
  SortByPrice: 'SORT_BY_PRICE',
};

export {
  EventsFilterType,
  NOTICES,
  ROUTES,
  MENU_ITEMS,
  STORE_BADGE_ITEMS,
  ServiceSortingType,
};

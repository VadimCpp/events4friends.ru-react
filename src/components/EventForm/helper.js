export const verify = event => {
  let verified = true;
  const {
    summary,
    description,
    location,
    start,
    // end, // не обязательный параметр?
    name,
  } = event;

  if (!summary) {
    verified = false;
    alert('Пожалуйста, введите название мероприятия');
  } else if (!description) {
    verified = false;
    alert('Пожалуйста, введите полное описание мероприятия');
  } else if (!location) {
    verified = false;
    alert('Пожалуйста, введите место проведения мероприятия');
  } else if (!start) {
    verified = false;
    alert('Пожалуйста, укажите время начала мероприятия');
  } else if (!name) {
    verified = false;
    alert('Пожалуйста, укажите имя организатора');
  }

  return verified;
};

export const eventInitState = {
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
};

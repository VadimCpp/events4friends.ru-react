export const verify = event => {
  let verified = true;
  const { summary, description, location, start, name } = event;

  const unverified = text => {
    verified = false;
    alert(text);
  };

  if (!summary) {
    unverified('Пожалуйста, введите название мероприятия');
  } else if (!description) {
    unverified('Пожалуйста, введите полное описание мероприятия');
  } else if (!location) {
    unverified('Пожалуйста, введите место проведения мероприятия');
  } else if (!start) {
    unverified('Пожалуйста, укажите время начала мероприятия');
  } else if (!name) {
    unverified('Пожалуйста, укажите имя организатора');
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

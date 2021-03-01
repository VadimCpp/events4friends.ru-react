export const verify = newService => {
  let verified = true;
  const { service, description, name } = newService;

  const unverified = text => {
    verified = false;
    alert(text);
  };

  if (!service) {
    unverified('Пожалуйста, введите название услуги');
  } else if (!description) {
    unverified('Пожалуйста, введите полное описание услуги');
  } else if (!name) {
    unverified('Пожалуйста, укажите имя того, кто оказывает услугу');
  }

  return verified;
};

export const normalizePrice = price => {
  return Math.abs(Number(price));
};

export const serviceInitState = {
  name: '',
  contact: '',
  service: '',
  description: 'Описание',
  isFree: false,
  price: '',
  website: '',
  instagram: '',
  whatsapp: '',
  telegram: '',
  vkontakte: '',
};

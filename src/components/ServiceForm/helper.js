export const verify = newService => {
  let verified = true;
  const { service, description, name } = newService;

  if (!service) {
    verified = false;
    alert('Пожалуйста, введите название услуги');
  } else if (!description) {
    verified = false;
    alert('Пожалуйста, введите полное описание услуги');
  } else if (!name) {
    verified = false;
    alert('Пожалуйста, укажите имя того, кто оказывает услугу');
  }

  return verified;
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

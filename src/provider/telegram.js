/**
 * Функция отправляет запрос в телеграм бот для обновления данных
 *
 * @param {Object} event событие, которое было изменено
 * @param {string} userName имя админа, который все изменения
 */
export const notifyTelegramBot = (event, userName) => {
  console.info('Updating Telegram pinned message');
  fetch('https://events4friendsbot.herokuapp.com/update', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event,
      userName,
    }),
  })
    .then(() => {
      console.info('Updating Telegram pinned message done');
    })
    .catch(() => {
      console.warn('Failed to update Telegram pinned message');
    });
};

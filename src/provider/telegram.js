export const updateTelegramPinnedMessage = () => {
  console.info('Updating Telegram pinned message');
  fetch('https://events4friendsbot.herokuapp.com/update', {
    body: {},
    method: 'post',
  })
    .then(data => {
      console.info('Updating Telegram pinned message done:', data);
    })
    .catch(error => {
      console.warn('Failed to update Telegram pinned message:', error);
    });
};

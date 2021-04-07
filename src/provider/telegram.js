export const updateTelegramPinnedMessage = () => {
  console.info('Updating Telegram pinned message');
  fetch('https://events4friendsbot.herokuapp.com/update', {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event: {
        id: 'ACCt4USu1iZMLxM65aDY',
        summary: 'Воскресная служба в Родниках',
        start: '2020-11-15T08:00',
        timezone: '+0200',
      },
      userName: 'Организатор',
    }),
  })
    .then(data => {
      console.info('Updating Telegram pinned message done:', data);
    })
    .catch(error => {
      console.warn('Failed to update Telegram pinned message:', error);
    });
};

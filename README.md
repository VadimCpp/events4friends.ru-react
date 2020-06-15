This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Формат мероприятия

Мероприятия собираются из разных источников в сети и приводятся к единому формату для удобства. Каждое мероприятие состоит из набора полей:

| поле        | тип    | обязательно | описание                                                |
|-------------|--------|-------------|---------------------------------------------------------|
| id          | строка | да          | уникальный идентификатор                                |
| summary     | строка | да          | короткое название мероприятия                           |
| description | текст  | да          | полное описание                                         |
| isOnline    | булево | да          | true - онлайн, false - офлайн                           |
| location    | строка | да          | адрес мероприятия/ссылка мероприятия                    |
| contact     | строка | да          | контакт организатора                                    |
| name        | строка | да          | имя организатора                                        |
| timezone    | строка | да          | часовой пояс может принимать значения '+0200'(Калининград) или '+0300'(Москва)|
| start       | строка | да          | начало, dateTime, например "2019-09-14T11:00:00", ISO-8601       |
| end         | строка | нет         | конец, dateTime                                         |

## Формат услуги

Услуги предоставляю участники сообщества:

| поле        | тип    | обязательно | описание                                                |
|-------------|--------|-------------|---------------------------------------------------------|
| id          | строка | да          | уникальный идентификатор                                |
| name        | строка | да          | имя того, кто оказывает услугу (обычно человек)         |
| service     | текст  | да          | название услуги                                         |
| description | текст  | да          | полное описание услуги                                  |
| isFree      | булево | нет         | true - услуга оказывается безоплатно                    |
| instagram   | текст  | нет         | ссылка на инстаграм                                     |
| website     | текст  | нет         | ссылка на сайт                                          |
| price       | число  | нет         | цена в рублях                                           |
| whatsapp    | текст  | нет         | номер в вотсапп в формате 7XXX1234567                   |
| telegram    | текст  | нет         | id пользователя в телеграм                              |
| vkontakte   | текст  | нет         | ссылка на вконтакте                                     |


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

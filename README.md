## API Документация
link: https://documenter.getpostman.com/view/23856681/2s93JrvQLp#b61e02ea-8b22-428b-b753-f08dc1c8e842;
Так же имеется Swagger с документацией http://localhost:7000/api/docs

Для подключению к Websocket серверу необходимо (пример Postman): 
1) Выбрать тип подключение Socket.IO
2) Указать IP локального сервера - http://localhost:7000
3) Добавить в Headers ключ Authorization с значением Bearer и токен пользователя
4) В слушатели событий добавить ивент onMessage

## Установка зависимостей

```bash
$ npm install
```

## Локальный запуск проекта

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

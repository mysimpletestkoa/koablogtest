Клиентская часть: Anglar5
Серверная часть: node.js + koa.js + mongodb

Предварительная подготовка:
В каталоге client запустить
# npm i
в файле client/src/app/app.config.ts указать адрес сервера API в формате http://[server_name]:[port]/api

В каталоге server запустить
# npm i
в файле server/index.js в строке 20 указываем адрес сервера MongoDB и наименование базы данных

const  db = monk('localhost/koaBlog');

Запуск:
1. Запускаем сервер из каталога server

# npm start
2. Запускаем клиент из каталога client

# npm start

3. Открываем приложение в браузере, перейдя по адресу http://[server_name]:8000

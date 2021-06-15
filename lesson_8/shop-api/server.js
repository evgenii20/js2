// const http = require('http');
// const static = require('node-static');
// подключаем модуль express
const express = require('express')
// const file = new static.Server('.');

// подключим стандартный модуль "fs" для работы с "file system"
const fs = require('fs');
// нужно научить сервер смотреть содержимое POST-запроса:
const bodyParser = require('body-parser');
// подключили корсы
const cors = require('cors')

// Запись const app = express(); записывает в переменную app
// объект, который содержит основные методы express
const app = express();
// принимает путь к папке со статичными файлами
// app.use(express.static('.'));

// корсы
app.use(cors())
app.use(bodyParser.json());

// Удаление товара
//end point: post
app.post('/deleteFromCart', (req, res) => {
  // fs.readFile('./database/cartData.json', 'utf8', (err, data) => {
  fs.readFile('./database/userCart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{ "result": 0 }')
    } else {
      let cartData = JSON.parse(data);
      const item = req.body;

      cartData = cartData.filter((cartItem) => cartItem.id_product !== item.id_product)

      fs.writeFile('./database/userCart.json', JSON.stringify(cartData), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  })
})

//end point: post
app.post('/addToCart', (req, res) =>{
  // fs.readFile('./database/cartData.json', 'utf8', (err, data) => {
  fs.readFile('./database/userCart.json', 'utf8', (err, data) => {
    if (err) {
      res.send('{ "result": 0 }')
    } else {
      const cartData = JSON.parse(data);
      const item = req.body;

      cartData.push(item);

      fs.writeFile('./database/userCart.json', JSON.stringify(cartData), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  })
})



// укажем адрес для обращений, а в callback функции req, res (Request(данные запроса),
// Response(методы для создания ответа))
// -----
// app.get('/getgroupcount', (req, res) => {
//   res.send('count is 93')
// })
// -----
// изменим код на:
app.get('/catalogData', (req, res) => {
  fs.readFile('./database/catalog.json', 'utf8', (err, data) => {
    // console.log(data);
    // отправка данных на фронт обязательна, иначе грузится +-бесконечно, без отображения данных
    res.send(data);
  });
});

app.get('/cartData', (req, res) => {
  // fs.readFile('./database/cartData.json', 'utf8', (err, data) => {
  fs.readFile('./database/userCart.json', 'utf8', (err, data) => {
    // console.log(data);
    res.send(data);
  });
});

// Метод listen принимает на вход номер порта, на котором
// создаётся сервер, и колбэк, который срабатывает после его
// запуска.
app.listen(3000,() => {
  console.log('server is running on port 3000!');
});


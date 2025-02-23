// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()

// Підключіть файли роутів
const auth = require('./auth')

router.use('/', auth)
// Використовуйте інші файли роутів, якщо є

router.get('/', (req, res) => {
  res.render('home', {
    name: 'home',

    data: {},
  })
})

// Експортуємо глобальний роутер
module.exports = router

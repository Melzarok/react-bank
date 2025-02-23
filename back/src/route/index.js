const express = require('express')
const router = express.Router()

const auth = require('./auth')

router.use(auth) // Подключаем auth роуты к корневому пути

module.exports = router

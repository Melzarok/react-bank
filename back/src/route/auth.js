// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')

// ================================================================

router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('signup', {
    // вказуємо назву контейнера
    name: 'signup',
    // вказуємо назву компонентів

    // вказуємо назву сторінки
    title: 'Signup page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

router.post('/signup', function (req, res) {
  console.log('Получен POST запрос на /signup')
  console.log('Body:', req.body)

  const { email, password } = req.body

  console.log('1', email, password)

  if (!email || !password) {
    return res.status(400).json({
      message: "Помилка. Обовз'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'Помилка. Такий користувач вже існує',
      })
    }

    const newUser = User.create({ email, password })

    // const session = Session.create(newUser)

    // Confirm.create(newUser.email)

    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      // session,
      user: newUser,
    })
  } catch (err) {
    return res.status(400).json({
      message: 'Помилка створення користувача',
    })
  }
})

// router.get('/recovery', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('recovery', {
//     // вказуємо назву контейнера
//     name: 'recovery',
//     // вказуємо назву компонентів
//     component: ['back-button', 'field'],

//     // вказуємо назву сторінки
//     title: 'Recovery page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/recovery', function (req, res) {
//   const { email } = req.body

//   console.log(email)

//   if (!email) {
//     return res.status(400).json({
//       message: "Помилка. Обов'язкові поля відсутні",
//     })
//   }

//   try {
//     const user = User.getByEmail(email)

//     if (!user) {
//       return res.status(400).json({
//         message: 'Корисутвача з таким email не існує',
//       })
//     }

//     Confirm.create(email)

//     return res.status(200).json({
//       message: 'Код для відновлення відправлено',
//     })
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message,
//     })
//   }
// })

// router.get('/recovery-confirm', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('recovery-confirm', {
//     // вказуємо назву контейнера
//     name: 'recovery-confirm',
//     // вказуємо назву компонентів
//     component: ['back-button', 'field', 'field-password'],

//     // вказуємо назву сторінки
//     title: 'Recovery confirm page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/recovery-confirm', function (req, res) {
//   const { password, code } = req.body

//   console.log(password, code)

//   if (!code || !password) {
//     return res.status(400).json({
//       message: "Помилка. Обов'язкові поля відсутні",
//     })
//   }

//   try {
//     const email = Confirm.getData(Number(code))

//     if (!email) {
//       return res.status(400).json({
//         message: 'Невірний Код',
//       })
//     }

//     const user = User.getByEmail(email)

//     if (!user) {
//       return res.status(400).json({
//         message: 'Користуавача з таким email не існує',
//       })
//     }

//     user.password = password

//     console.log(user)

//     const session = Session.create(user)

//     return res.status(200).json({
//       message: 'Пароль змінено',
//     })
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message,
//     })
//   }
// })

// router.get('/signup-confirm', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   const { renew, email } = req.query

//   if (renew) {
//     Confirm.create(email)
//   }

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('signup-confirm', {
//     // вказуємо назву контейнера
//     name: 'signup-confirm',
//     // вказуємо назву компонентів
//     component: ['back-button', 'field'],

//     // вказуємо назву сторінки
//     title: 'Signup confirm page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/signup-confirm', function (req, res) {
//   const { code, token } = req.body

//   if (!code || !token) {
//     return res.status(400).json({
//       message: "Помилка. Обов'язкові поля відстуні",
//     })
//   }

//   try {
//     const session = Session.get(token)

//     if (!session) {
//       return res.status(400).json({
//         message: 'Помилка. Ви не увійшли в аккаунт',
//       })
//     }

//     const email = Confirm.getData(code)

//     if (!email) {
//       return res.status(400).json({
//         message: 'Код не існує',
//       })
//     }

//     if (email !== session.user.email) {
//       return res.status(400).json({
//         message: 'Код не дійсний',
//       })
//     }

//     const user = User.getByEmail(session.user.email)
//     user.isConfirm = true
//     session.user.isConfirm = true

//     return res.status(200).json({
//       message: 'Пошту підтверджено',
//       session,
//     })
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message,
//     })
//   }
// })

// router.get('/login', function (req, res) {
//   // res.render генерує нам HTML сторінку

//   // ↙️ cюди вводимо назву файлу з сontainer
//   return res.render('login', {
//     // вказуємо назву контейнера
//     name: 'login',
//     // вказуємо назву компонентів
//     component: ['back-button', 'field', 'field-password'],

//     // вказуємо назву сторінки
//     title: 'Login confirm page',
//     // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

//     // вказуємо дані,
//     data: {},
//   })
//   // ↑↑ сюди вводимо JSON дані
// })

// router.post('/login', function (req, res) {
//   const { email, password } = req.body

//   if (!email || !password) {
//     return res.status(400).json({
//       message: "Помилка. Обов'язкові поля відсутні",
//     })
//   }

//   try {
//     const user = User.getByEmail(email)

//     if (!user) {
//       return res.status(400).json({
//         message:
//           'Помилка. Користувача з таким email не існує',
//       })
//     }

//     if (user.password !== password) {
//       return res.status(400).json({
//         message: 'Помилка. Пароль не підходить',
//       })
//     }

//     const session = Session.create(user)

//     return res.status(200).json({
//       message: 'Ви увійшли',
//       session,
//     })
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message,
//     })
//   }
// })

// Підключаємо роутер до бек-енду
module.exports = router

const { nanoid } = require('nanoid')

class User {
  static #list = []

  constructor({ email, password }) {
    this.id = nanoid()
    this.email = String(email).toLowerCase()
    this.password = String(password)
    this.isConfirm = false
  }

  static create(data) {
    const user = new User(data)

    this.#list.push(user)

    return user
  }

  static getByEmail(email) {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLowerCase(),
      ) || null
    )
  }

  static getById(id) {
    return (
      this.#list.find((user) => user.id === String(id)) ||
      null
    )
  }

  static getList = () => this.#list
}

module.exports = {
  User,
}

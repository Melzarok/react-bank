class Confirm {
  static #list = []

  constructor(email) {
    this.code = Confirm.generateCode()
    this.email = email
  }

  static generateCode() {
    return Math.floor(
      100000 + Math.random() * 900000,
    ).toString()
  }

  static create(email) {
    if (!email) throw new Error('Email required')

    const confirmData = new Confirm(email)
    this.#list.push(confirmData)

    console.log(
      'Confirmation code for',
      email,
      ':',
      confirmData.code,
    )

    return confirmData.code
  }

  static getData(code) {
    const confirmData = this.#list.find(
      (data) => data.code === code,
    )

    if (confirmData) {
      // Удаляем использованный код
      this.#list = this.#list.filter(
        (data) => data.code !== code,
      )
    }

    return confirmData ? confirmData.email : null
  }
}

module.exports = {
  Confirm,
}

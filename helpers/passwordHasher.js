const { hashSync, compareSync } = require('bcryptjs')
module.exports = {
  hashPassword: (passwordString) => hashSync(passwordString, 12),
  comparePassword: (passwordString, passwordHashed) => compareSync(passwordString, passwordHashed)
}

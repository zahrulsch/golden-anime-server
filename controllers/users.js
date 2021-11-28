const { User } = require('../models')
const { signToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/passwordHasher')
module.exports = class Controller {
  static async register (req, res, next) {
    try {
      const {
        username,
        email,
        password,
        imageUrl,
        gender
      } = req.body
      const db = await User.create({ username, email, password, imageUrl, gender })
      const data = {
        id: db.id,
        username: db.username,
        email: db.email,
      }
      res.status(201).json({ message: 'success', data })
    } catch (e) {
      next(e)
    }
  }

  static async login (req, res, next) {
    try {
      const required = ['email', 'password']
      const empty = required.filter(e => !req.body[e])

      if (empty.length) {
        throw {
          name: 'EmptyField',
          msg: empty.map(e => e + ' is required').join(', ')
        }
      }

      const { email, password } = req.body
      const db = await User.findOne({
        where: {email}
      })

      if (!db) {
        throw {
          name: 'UserNotFound',
          msg: 'unauthorized'
        }
      }

      if (!comparePassword(password, db.password)) {
        throw {
          name: 'WrongPassword',
          msg: 'unauthorized'
        }
      }

      const access_token = signToken({
        id: db.id,
        username: db.username,
        email: db.email
      })

      res.status(200).json({ access_token })
    } catch (e) {
      next(e)
    }
  }

  static async getUserInfo(req, res, next) {
    try {
      const { email } = req.user
      const db = await User.findOne({
        where: {email},
        attributes: ['username', 'email', 'imageUrl', 'gender']
      })
      res.status(200).json({data: db})
    } catch (e) {
      next(e)
    }
  }
}
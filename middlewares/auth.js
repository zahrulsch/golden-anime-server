const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')
async function authentication (req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
    throw {
      name: 'MissingAccessToken',
      msg: 'missing token'
    }
    }
    const payload = verifyToken(access_token)
    const db = await User.findOne({
      where: { email: payload.email }
    })
    if(!db) {
      throw {
        name: 'UserNotFound',
        msg: 'unauthorized'
      }
    }
    req.user = {
      email: db.email,
      id: db.id
    }
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = {
  authentication
}
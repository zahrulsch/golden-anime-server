const { sign, verify } = require('jsonwebtoken')
const secret = process.env.SECRET
module.exports = {
  signToken: (payload) => sign(payload, secret),
  verifyToken: (token) => verify(token, secret)
}
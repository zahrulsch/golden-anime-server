module.exports = function errorHandler (err, req, res, next) {
  let status = 500
  let message = 'internal server error'

  switch(err.name) {
    case 'SequelizeUniqueConstraintError':
      status = 400
      message = err.errors[0].message
      break
    case 'SequelizeValidationError':
      status = 400
      message = err.errors.map(e => e.message).join(', ')
      break
    case 'MissingAccessToken':
    case 'WrongPassword':
    case 'UserNotFound':
      status = 401
      message = err.msg
      break
    case 'JsonWebTokenError':
      status = 401
      message = 'unauthorized'
      break
    case 'EmptyField':
      status = 400
      message = err.msg
      break
    case 'DataNotFound':
      status = 404
      message = err.msg
      break
    default:
      break
  }

  res.status(status).json({message})
}
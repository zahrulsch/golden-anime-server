const { Studio } = require('../models')
module.exports = class Controller {
  static async getStudios (req, res, next) {
    try {
      const db = await Studio.findAll()
      res.status(200).json({ data: db })
    } catch (e) {
      next(e)
    }
  }

  static async addStudios (req, res, next) {
    try {
      const { name } = req.body
      if (!name) {
        throw {
          name: 'EmptyField',
          msg: 'studio name is required'
        }
      }
      const db = await Studio.create({ name })
      res.status(201).json({ data: db })
    } catch (e) {
      next(e)
    }
  }

  static async delStudios (req, res, next) {
    try {
      const { id } = req.params
      const findDb = await Studio.findByPk(id)
      if (!findDb) {
        throw {
          name: 'DataNotFound',
          msg: `studio with id ${ id } is not found`
        }
      }
      await Studio.destroy({
        where: { id }
      })
      res.status(200).json({ data: `studio with id ${ id} deleted successfully`})
    } catch (e) {
      next(e)
    }
  }
}
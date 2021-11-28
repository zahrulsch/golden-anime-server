const { Genre } = require('../models')
module.exports = class Controller {
  static async getGenres (req, res, next) {
    try {
      const db = await Genre.findAll()
      res.status(200).json({data: db})
    } catch (e) {
      next(e)
    }
  }

  static async addGenres (req, res, next) {
    try {
      const { name } = req.body
      const db = await Genre.create({ name })
      res.status(201).json({ data: db })
    } catch (e) {
      next(e)
    }
  }

  static async deleteGenres (req, res, next) {
    try {
      const { id } = req.params
      const findDb = await Genre.findByPk(id)
      if (!findDb) {
        throw {
          name: 'DataNotFound',
          msg: `genre with id ${ id } is not found`
        }
      }
      await Genre.destroy({where: {id}})
      res.status(200).json({ data: `genre with id ${ id } deleted successfully` })
    } catch (e) {
      next(e)
    }
  }
}
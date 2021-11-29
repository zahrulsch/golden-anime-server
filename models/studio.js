'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Studio.hasMany(models.Anime, {foreignKey: 'studioId'})
    }
  };
  Studio.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: 'studio name cannot be null'},
        notEmpty: {msg: 'studio name cannot be empty'},
      }
    }
  }, {
    sequelize,
    modelName: 'Studio',
  });
  return Studio;
};
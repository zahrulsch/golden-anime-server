'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/passwordHasher');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Anime, { foreignKey: 'uploaderId' })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'username cannot be null'},
        notEmpty: {msg: 'username cannot be empty'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'email cannot be null'},
        notEmpty: {msg: 'email cannot be empty'},
        isEmail: {msg: 'email is invalid'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'password cannot be null'},
        notEmpty: {msg: 'password cannot be empty'},
        passwordLength: (v) => {
          if (v.length < 8) {
            throw new Error('password length is less than 8 character')
          }
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: 'male'
    }
  }, {
    hooks: {
      beforeCreate: (User) => {
        User.password = hashPassword(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
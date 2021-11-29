'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.belongsTo(models.User, { foreignKey: 'uploaderId' })
      Anime.belongsTo(models.Studio, { foreignKey: 'studioId' })

    }
  };
  Anime.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'anime title cannot be null'},
        notEmpty: {msg: 'anime title cannot be empty'}
      }
    },
    altTitle: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'anime status cannot be null'},
        notEmpty: {msg: 'anime status cannot be empty'}
      }
    },
    episodes: {
      type: DataTypes.INTEGER,
    },
    aired: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {msg: 'anime aired date cannot be null'},
        notEmpty: {msg: 'anime aired date cannot be empty'}
      }
    },
    premiered: {
      type: DataTypes.DATE,
    },
    broadcast: {
      type: DataTypes.STRING,
    },
    studioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'anime studio id cannot be null'},
        notEmpty: {msg: 'anime studio id cannot be empty'}
      }
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.STRING,
    },
    uploaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'anime uploader id cannot be null'},
        notEmpty: {msg: 'anime uploader id cannot be empty'}
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'anime image URL cannot be empty'},
        notNull: {msg: 'anime image URL cannot be null'},
        isUrl: {msg: 'anime image URL is invalid'}
      }
    }
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};
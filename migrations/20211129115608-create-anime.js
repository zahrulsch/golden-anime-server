'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Animes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      altTitle: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      episodes: {
        type: Sequelize.INTEGER
      },
      aired: {
        type: Sequelize.DATE
      },
      premiered: {
        type: Sequelize.DATE
      },
      broadcast: {
        type: Sequelize.STRING
      },
      studioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Studios',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      rating: {
        type: Sequelize.INTEGER
      },
      duration: {
        type: Sequelize.STRING
      },
      uploaderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      synopsis: {
        type: Sequelize.TEXT
      },
      imageUrl : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Animes');
  }
};
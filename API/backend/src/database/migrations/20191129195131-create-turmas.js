'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('turmas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    descricao: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    areaId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         
        model: 'areas',
        key: 'id'
      }
    },
    atividadeId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         
        model: 'atividades',
        key: 'id'
      }
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('turmas'),
};




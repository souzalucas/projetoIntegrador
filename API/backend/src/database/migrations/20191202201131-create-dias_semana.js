'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('dias_semana', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    dia: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    horario_inicio: {
      allowNull: false,
      type: Sequelize.TIME,
    },
    horario_fim:{
      allowNull: false,
      type: Sequelize.TIME,
    },
    turmaId:{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {         
        model: 'turmas',
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
  down: queryInterface => queryInterface.dropTable('dias_semana'),
};


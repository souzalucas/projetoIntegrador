'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('alunos', {
    cpf: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING(14),
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    telefone: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    data_nascimento:{
      allowNull: false,
      type: Sequelize.DATE,
    },
    sexo: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    // turmaId:{
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {         
    //     model: 'turmas',
    //     key: 'id'
    //   }
    // },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('alunos'),
};


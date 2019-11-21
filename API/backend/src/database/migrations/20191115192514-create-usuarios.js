module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('usuarios', {
    cpf: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING(11),
    },
    nome: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    telefone: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    profissao:{
      allowNull: false,
      type: Sequelize.STRING,
    },
    // data_nascimento: {
    //   allowNull: false,
    //   type: Sequelize.DATE,
    // },
    sexo: {
      allowNull: false,
      type: Sequelize.STRING,
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
  down: queryInterface => queryInterface.dropTable('usuarios'),
};

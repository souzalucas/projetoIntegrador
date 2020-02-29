module.exports = (sequelize, DataTypes) => {
    const Atividade = sequelize.define('Atividade', {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
    });

    return Atividade;
};
module.exports = (sequelize, DataTypes) => {
    const Turma = sequelize.define('Turma', {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
    });

    return Turma;
};
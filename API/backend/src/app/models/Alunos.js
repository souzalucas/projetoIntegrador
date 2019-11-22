module.exports = (sequelize, DataTypes) => {
    const Aluno = sequelize.define('Aluno', {
        cpf: DataTypes.STRING(11),
        nome: DataTypes.STRING,
        telefone: DataTypes.STRING,
        data_nascimento: DataTypes.DATE,
        sexo: DataTypes.STRING,
    });

    return Aluno;
};
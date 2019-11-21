module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        cpf: DataTypes.STRING(11),
        nome: DataTypes.STRING,
        telefone: DataTypes.STRING,
        // data_nascimento: DataTypes.DATE,
        sexo: DataTypes.STRING,
        profissao: DataTypes.STRING,
    });

    return Usuario;
};
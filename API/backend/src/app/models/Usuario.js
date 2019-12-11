module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        cpf: DataTypes.STRING(14),
        nome: DataTypes.STRING,
        telefone: DataTypes.STRING,
        data_nascimento: DataTypes.DATE,
        sexo: DataTypes.STRING,
        cargo: DataTypes.STRING,
    });

    return Usuario;
};
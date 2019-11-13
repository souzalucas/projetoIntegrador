module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        cpf: DataTypes.STRING,
        nome: DataTypes.STRING,
        telefone: DataTypes.STRING,
        // data_nascimento: DataTypes.DATE,
        sexo: DataTypes.STRING,
        // tipo: DataTypes.STRING,
    });

    return Usuario;
};
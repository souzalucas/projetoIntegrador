module.exports = (sequelize, DataTypes) => {
    const Area = sequelize.define('Area', {
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
    });

    return Area;
};
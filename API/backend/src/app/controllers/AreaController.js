const models = require('../models');
const bcrypt = require('bcrypt');

const addArea = async (nome, descricao) => {
    let transaction;

    try {
        transaction = await models.sequelize.transaction();

        const ret = await models.Area.create({
            nome, descricao
        });

        await transaction.commit();
        return ret;

    } catch (error) {
        await transaction.rollback();
        return null;
    }
}

const listArea = async () => {
    const areas = await models.Area.findAll();

    return areas.map(el => ({
        nome: el.nome,
        descricao: el.descricao,
    }));
}

const deleteArea = async (id) => {
    const area = await models.Area.findOne({
      where: { id },
    });

    if (area === null) return null;
  
    const ret = await area.destroy();
    return ret;
  };

module.exports = {
    addArea,
    listArea,
    deleteArea
}
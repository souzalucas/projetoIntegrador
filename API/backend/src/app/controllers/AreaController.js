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
        id: el.id,
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

const updateArea = async (id, dados) => {
    const area = await models.Area.findOne({
      where: { id },
    });
  
    if (area === null) return null;
  
    const { nome, descricao } = dados;
  
    if (Object.keys(obj).length !== 0) {
      try {
        await area.update({nome, descricao});
        const ret = await models.Area.findOne({
          where: { id },
        });
        return ret;
      } catch (error) {
        return null;
      }
    }
    return null;
};

module.exports = {
    addArea,
    listArea,
    deleteArea,
    updateArea,
}
const models = require('../models');
const bcrypt = require('bcrypt');

const addAtividade = async (nome, descricao) => {
    let transaction;

    try {
        transaction = await models.sequelize.transaction();

        const ret = await models.Atividade.create({
            nome, descricao
        });

        await transaction.commit();
        return ret;

    } catch (error) {
        await transaction.rollback();
        return null;
    }
}

const listAtividade = async () => {
    const atividades = await models.Atividade.findAll();

    return atividades.map(el => ({
        id: el.id,
        nome: el.nome,
        descricao: el.descricao,
    }));
}

const deleteAtividade = async (id) => {
    const atividade = await models.Atividade.findOne({
      where: { id },
    });

    if (atividade === null) return null;
  
    const ret = await atividade.destroy();
    return ret;
};

const updateAtividade = async (id, dados) => {
  const atividade = await models.Atividade.findOne({
    where: { id },
  });

  if (atividade === null) return null;

  const { nome, descricao } = dados;

  try {
    await atividade.update({nome, descricao});
    const ret = await models.Atividade.findOne({
      where: { id },
    });
    return ret;
  } catch (error) {
    return null;
  }
  return null;
};

module.exports = {
    addAtividade,
    listAtividade,
    deleteAtividade,
    updateAtividade,
}
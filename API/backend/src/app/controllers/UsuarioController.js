const models = require('../models/index');
const bcrypt = require('bcrypt');

//data_nascimento,tipo
const addUsuario = async (cpf, nome, telefone, sexo, profissao) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();
    //data_nascimento,tipo
    models.Usuario.removeAttribute("id");
    const ret = await models.Usuario.create({
      cpf: cpf, nome: nome, telefone: telefone, sexo: sexo, profissao : profissao
    });

    await transaction.commit();
    return ret;

  } catch (error) {
    await transaction.rollback();
    return null;
  }
}

const listUsuario = async () => {
  const usuario = await models.Usuario.findAll({ attributes: ['cpf', 'nome', 'telefone', 'sexo','profissao',] });

  return usuario.map(el => ({
    cpf: el.cpf,
    nome: el.nome,
    telefone: el.telefone,
    // data_nascimento: el.data_nascimento,
    sexo: el.sexo,
    profissao: el.profissao,
  }));
}

const deleteUsuario = async (cpf) => {
  models.Usuario.removeAttribute("id");
  const usuario = await models.Usuario.findOne({
    where: { cpf },
  });

  if (usuario == null) return null;

  const ret = await usuario.destroy();
  return ret;
};

const updateUsuario = async (cpf, dados) => {
  models.Usuario.removeAttribute("id");

  const usuario = await models.Usuario.findOne({
    where: { cpf },
  });

  if (!usuario) return null;

  const { nome, telefone, sexo, profissao } = dados;

  try {
    console.log(dados);
    const ret = await usuario.update({ nome, telefone, sexo, profissao });

    return ret;
  } catch (error) {
    return null;
  }
  return null;
};

module.exports = {
  addUsuario,
  listUsuario,
  deleteUsuario,
  updateUsuario,
}

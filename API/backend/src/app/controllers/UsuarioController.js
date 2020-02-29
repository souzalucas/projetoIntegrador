const models = require('../models/index');
const bcrypt = require('bcrypt');

//data_nascimento,tipo
const addUsuario = async (cpf, nome, telefone, data_nascimento, sexo, cargo) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();
    models.Usuario.removeAttribute("id");

    split = data_nascimento.split('/');
    novadata = split[2] + "/" +split[1]+"/"+split[0];
    console.log(novadata)
    data_americana = new Date(novadata); 

    const ret = await models.Usuario.create({
      cpf: cpf, nome: nome, telefone: telefone,data_nascimento: data_americana, sexo: sexo, cargo : cargo
    });

    await transaction.commit();
    return ret;

  } catch (error){
    await transaction.rollback();
    return null;
  }
}

//Formatação da data listagem(fazer)
const listUsuario = async () => {
  const usuario = await models.Usuario.findAll({ attributes: ['cpf', 'nome', 'telefone','data_nascimento','sexo','cargo',] });

    // split = data_nascimento.split('/');
    // novadata = split[1] + "/" +split[2]+"/"+split[0];
    // console.log(novadata)
    // data_americana = new Date(novadata); 
  

  return usuario.map(el => ({
    cpf: el.cpf,
    nome: el.nome,
    telefone: el.telefone,
    data_nascimento: el.data_nascimento,
    sexo: el.sexo,
    cargo: el.cargo,
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

  const { nome, telefone, data_nascimento, sexo, cargo } = dados;

    split = data_nascimento.split('/');
    novadata = split[2] + "/" +split[1]+"/"+split[0];
    data_americana = new Date(novadata); 

  try {
    console.log(dados);
    const ret = await usuario.update({ nome, telefone, data_nascimento : data_americana, sexo, cargo });

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

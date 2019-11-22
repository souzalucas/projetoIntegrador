const models = require('../models/index');
const bcrypt = require('bcrypt');

const addAluno = async (cpf, nome, telefone, data_nascimento, sexo) => {
  let transaction;

  try {
    transaction = await models.sequelize.transaction();
    models.Aluno.removeAttribute("id");

    split = data_nascimento.split('/');
    novadata = split[2] + "/" +split[1]+"/"+split[0];
    console.log(novadata)
    data_americana = new Date(novadata); 

    const ret = await models.Aluno.create({
      cpf: cpf, nome: nome, telefone: telefone,data_nascimento: data_americana, sexo: sexo
    });

    await transaction.commit();
    return ret;

  } catch (error){
    await transaction.rollback();
    return null;
  }
}

//Formatação da data listagem(fazer)
const listAluno = async () => {
  const aluno = await models.Aluno.findAll({ attributes: ['cpf', 'nome', 'telefone','data_nascimento','sexo',] });

    // split = data_nascimento.split('/');
    // novadata = split[1] + "/" +split[2]+"/"+split[0];
    // console.log(novadata)
    // data_americana = new Date(novadata); 
  

  return aluno.map(el => ({
    cpf: el.cpf,
    nome: el.nome,
    telefone: el.telefone,
    data_nascimento: el.data_nascimento,
    sexo: el.sexo,
  }));
}

const deleteAluno = async (cpf) => {
  models.Aluno.removeAttribute("id");
  const aluno = await models.Aluno.findOne({
    where: { cpf },
  });

  if (aluno == null) return null;

  const ret = await aluno.destroy();
  return ret;
};

const updateAluno = async (cpf, dados) => {
  models.Aluno.removeAttribute("id");

  const aluno = await models.Aluno.findOne({
    where: { cpf },
  });

  if (!aluno) return null;

  const { nome, telefone, data_nascimento, sexo } = dados;

    split = data_nascimento.split('/');
    novadata = split[2] + "/" +split[1]+"/"+split[0];
    data_americana = new Date(novadata); 

  try {
    console.log(dados);
    const ret = await aluno.update({ nome, telefone, data_nascimento : data_americana, sexo });

    return ret;
  } catch (error) {
    return null;
  }
  return null;
};

module.exports = {
  addAluno,
  listAluno,
  deleteAluno,
  updateAluno,
}

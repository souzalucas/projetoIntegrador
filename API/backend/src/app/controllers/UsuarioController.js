const models = require('../models/index');
const bcrypt = require('bcrypt');

//data_nascimento,tipo
const addUsuario = async (cpf,nome,telefone,sexo) => {
    let transaction;

    try{
        transaction = await models.sequelize.transaction();
        //data_nascimento,tipo
        models.Usuario.removeAttribute("id");
        const ret = await models.Usuario.create({
            cpf: cpf, nome: nome, telefone: telefone, sexo: sexo
        });

        await transaction.commit();
        return ret;

    } catch (error) {
        await transaction.rollback();
        return null;
    }
}

const listUsuario = async () => {
    const usuario = await models.Usuario.findAll({attributes: ['cpf', 'nome', 'telefone', 'sexo',]});

    return usuario.map(el => ({
        cpf: el.cpf,
        nome: el.nome,
        telefone: el.telefone,
        // data_nascimento: el.data_nascimento,
        sexo: el.sexo,
        // tipo: el.tipo,
    }));
}

const deleteUsuario = async (cpf) => {
    models.Usuario.removeAttribute("id");
    const usuario = await models.Usuario.findOne({
        where: {cpf},
    });

    if(usuario == null) return null;

    const ret = await usuario.destroy();
    return ret;
};

//Fazer função update

module.exports = {
    addUsuario,
    listUsuario,
    deleteUsuario,
}

const { Router } = require('express');
const AreaController = require('./app/controllers/AreaController');
const AtividadeController = require('./app/controllers/AtividadeController');
const UsuarioController = require('./app/controllers/UsuarioController');
const AlunoController = require('./app/controllers/AlunoController');

const routes = Router();

routes.get('/areas', async (req, res) => {
    const areas = await AreaController.listArea();

    return res.json(
        areas.map(area => ({
            id: area.id,
            nome: area.nome,
            descricao: area.descricao,
        })),
    )
});

routes.post('/areas', async (req, res) => {
    if (!req.body) return res.status(400).send();

    const { nome, descricao } = req.body;

    const ret = await AreaController.addArea(nome, descricao);

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

routes.delete('/areas/:id', async (req, res) => {
    const { id } = req.params;

    const ret = await AreaController.deleteArea(id);
    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

routes.put('/areas/:id', async (req, res) => {
    if (!req.body) return res.status(400).send();

    const { id } = req.params;

    const { nome, descricao } = req.body;

    // Isso permite tornar os atributos opcionais (atualiza somente o que precisar)
    const ret = await AreaController.updateArea(id, {
        ...(nome !== undefined ? { nome } : {}),
        ...(descricao !== undefined ? { descricao } : {}),
    });

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

// routes.get('/areas/:id', AreaController.show);

routes.get('/atividades', async (req, res) => {
    const atividades = await AtividadeController.listAtividade();

    return res.json(
        atividades.map(atividade => ({
            id: atividade.id,
            nome: atividade.nome,
            descricao: atividade.descricao,
        })),
    )
});

routes.post('/atividades', async (req, res) => {
    if (!req.body) return res.status(400).send();

    const { nome, descricao } = req.body;

    const ret = await AtividadeController.addAtividade(nome, descricao);

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

routes.delete('/atividades/:id', async (req, res) => {
    const { id } = req.params;

    const ret = await AtividadeController.deleteAtividade(id);
    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

routes.put('/atividades/:id', async (req, res) => {
    if (!req.body) return res.status(400).send();

    const { id } = req.params;

    const { nome, descricao } = req.body;

    // Isso permite tornar os atributos opcionais (atualiza somente o que precisar)
    const ret = await AtividadeController.updateAtividade(id, {
        ...(nome !== undefined ? { nome } : {}),
        ...(descricao !== undefined ? { descricao } : {}),
    });

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

// routes.get('/atividades/:id', AtividadeController.show);

routes.get('/usuario', async (req, res) => {
    const usuarios = await UsuarioController.listUsuario();

    return res.json(
        usuarios.map(usuario => ({
            cpf: usuario.cpf,
            nome: usuario.nome,
            telefone: usuario.telefone,
            data_nascimento: usuario.data_nascimento,
            sexo: usuario.sexo,
            cargo: usuario.cargo,
        })),
    )
});

routes.post('/usuario', async (req, res) => {
    if (!req.body) return res.status(400).send();
    const { cpf, nome, telefone, data_nascimento, sexo, cargo } = req.body;
    const ret = await UsuarioController.addUsuario(cpf, nome, telefone, data_nascimento, sexo, cargo);

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

//conferir req.params, ainda acho que seria pelo req.body
routes.delete('/usuario/:cpf', async (req, res) => {
    const { cpf } = req.params;

    const ret = await UsuarioController.deleteUsuario(cpf);
    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

routes.put('/usuario/:cpf', async (req, res) => {
    if (!req.body) return res.status(400).send();
    const { cpf } = req.params;
    const { nome, telefone, data_nascimento, sexo, cargo } = req.body;

    // Isso permite tornar os atributos opcionais (atualiza somente o que precisar)
    const ret = await UsuarioController.updateUsuario(cpf, {
        ...(nome !== undefined ? { nome } : {}),
        ...(telefone !== undefined ? { telefone } : {}),
        ...(data_nascimento !== undefined ? { data_nascimento } : {}),
        ...(sexo !== undefined ? { sexo } : {}),
        ...(cargo !== undefined ? { cargo } : {}),
    });

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

routes.get('/aluno', async (req, res) => {
    const aluno = await AlunoController.listAluno();

    return res.json(
        aluno.map(aluno => ({
            cpf: aluno.cpf,
            nome: aluno.nome,
            telefone: aluno.telefone,
            data_nascimento: aluno.data_nascimento,
            sexo: aluno.sexo,
        })),
    )
});

routes.post('/aluno', async (req, res) => {
    if (!req.body) return res.status(400).send();
    const { cpf, nome, telefone, data_nascimento, sexo } = req.body;
    const ret = await AlunoController.addAluno(cpf, nome, telefone, data_nascimento, sexo);

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

//conferir req.params, ainda acho que seria pelo req.body
routes.delete('/aluno/:cpf', async (req, res) => {
    const { cpf } = req.params;

    const ret = await AlunoController.deleteAluno(cpf);
    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

routes.put('/aluno/:cpf', async (req, res) => {
    if (!req.body) return res.status(400).send();
    const { cpf } = req.params;
    const { nome, telefone, data_nascimento, sexo } = req.body;

    // Isso permite tornar os atributos opcionais (atualiza somente o que precisar)
    const ret = await AlunoController.updateAluno(cpf, {
        ...(nome !== undefined ? { nome } : {}),
        ...(telefone !== undefined ? { telefone } : {}),
        ...(data_nascimento !== undefined ? { data_nascimento } : {}),
        ...(sexo !== undefined ? { sexo } : {}),
    });

    if (ret === null) return res.json({ msg: 'erro' });

    return res.json({ msg: 'ok' });
});

module.exports = routes;
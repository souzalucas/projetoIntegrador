const { Router } = require('express');
const AreaController = require('./app/controllers/AreaController');
const AtividadeController = require('./app/controllers/AtividadeController');

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

module.exports = routes;
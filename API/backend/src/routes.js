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


// routes.get('/areas/:id', AreaController.show);

// routes.put('/areas/:id', AreaController.update);

// routes.get('/atividades', AtividadeController.index);

// routes.get('/atividades/:id', AtividadeController.show);

// routes.post('/atividades', AtividadeController.store);

// routes.put('/atividades/:id', AtividadeController.update);

// routes.delete('/atividades/:id', AtividadeController.destroy);

module.exports = routes;
const { Router } = require('express');
const AtividadeController = require('./app/controllers/AtividadeController');

const routes = Router();

routes.get('/atividades', AtividadeController.index);

routes.get('/atividades/:id', AtividadeController.show);

routes.post('/atividades', AtividadeController.store);

routes.put('/atividades/:id', AtividadeController.update);

routes.delete('/atividades/:id', AtividadeController.destroy);

module.exports = routes;
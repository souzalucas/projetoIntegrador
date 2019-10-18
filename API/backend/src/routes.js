const { Router } = require('express');
const AreaController = require('./app/controllers/AreaController');

const routes = Router();

routes.get('/areas', AreaController.index);

routes.get('/areas/:id', AreaController.show);

routes.post('/areas', AreaController.store);

routes.put('/areas/:id', AreaController.update);

routes.delete('/areas/:id', AreaController.destroy);

routes.get('/atividades', AtividadeController.index);

routes.get('/atividades/:id', AtividadeController.show);

routes.post('/atividades', AtividadeController.store);

routes.put('/atividades/:id', AtividadeController.update);

routes.delete('/atividades/:id', AtividadeController.destroy);

module.exports = routes;
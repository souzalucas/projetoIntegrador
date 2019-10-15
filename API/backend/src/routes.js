const { Router } = require('express');
const AreaController = require('./app/controllers/AreaController');

const routes = Router();

routes.get('/areas', AreaController.index);

routes.get('/areas/:id', AreaController.show);

routes.post('/areas', AreaController.store);

routes.put('/areas/:id', AreaController.update);

routes.delete('/areas/:id', AreaController.destroy);

module.exports = routes;
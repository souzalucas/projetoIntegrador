const { Area } = require('../models');

class AreaController {
  async index(req, res) {
    try {
      const areas = await Area.findAll();

      return res.json(areas);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const area = await Area.findByPk(req.params.id);

      return res.json(area);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const area = await Area.create(req.body);

      return res.json(area);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const area = await Area.findByPk(req.params.id);

      await area.update(req.body);

      return res.json({ area });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const area = await Area.findByPk(req.params.id);

      await area.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new AreaController();
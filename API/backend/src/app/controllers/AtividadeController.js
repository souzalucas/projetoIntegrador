const { Atividade } = require('../models');

class AtividadeController {
  async index(req, res) {
    try {
      const atividades = await Atividade.findAll();

      return res.json(atividades);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async show(req, res) {
    try {
      const atividade = await Atividade.findByPk(req.params.id);

      return res.json(atividade);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const atividade = await Atividade.create(req.body);

      return res.json(atividade);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const atividade = await Atividade.findByPk(req.params.id);

      await atividade.update(req.body);

      return res.json({ atividade });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  async destroy(req, res) {
    try {
      const atividade = await Atividade.findByPk(req.params.id);

      await atividade.destroy();

      return res.json();
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new AtividadeController();
const { Status } = require("../models/models");
const ApiError = require("../error/ApiError");

class StatusController {
  async create(req, res) {
    const { name } = req.body;
    const status = await Status.create({ name });
    return res.json(status);
  }
  async getAll(req, res) {
    const status = await Status.findAll();
    return res.json(status);
  }
  async destroy(req, res) {
    const { id } = req.params;
    const status = await Status.destroy({ where: { id } });
    return res.json(status);
  }
}

module.exports = new StatusController();

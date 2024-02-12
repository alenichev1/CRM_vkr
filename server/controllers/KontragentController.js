const { Kontragent } = require("../models/models");
const ApiError = require("../error/ApiError");

class KontragentController {
  async create(req, res) {
    const { name } = req.body;
    const kontragent = await Kontragent.create({ name });
    return res.json(kontragent);
  }
  async getAll(req, res) {
    const kontragent = await Kontragent.findAll();
    return res.json(kontragent);
  }
  async destroy(req, res) {
    const { id } = req.params;
    const kontragent = await Kontragent.destroy({ where: { id } });
    return res.json(kontragent);
  }
}

module.exports = new KontragentController();

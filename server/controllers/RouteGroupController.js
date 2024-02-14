const { RouteGroup } = require("../models/models");
const ApiError = require("../error/ApiError");

class RouteGroupController {
  async create(req, res) {
    const { name } = req.body;
    const route = await RouteGroup.create({ name });
    return res.json(route);
  }

  async getAll(req, res) {
    const route = await RouteGroup.findAll();
    return res.json(route);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const route = await RouteGroup.findOne({ where: { id } });
    return res.json(route);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const route = await RouteGroup.destroy({ where: { id } });
    return res.json(route);
  }
}

module.exports = new RouteGroupController();

const { Route } = require("../models/models");
const ApiError = require("../error/ApiError");

class RouteController {
  async create(req, res) {
    const { applicationId, statusId, routeGroupId } = req.body;
    const route = await Route.create({ applicationId, statusId, routeGroupId });
    return res.json(route);
  }

  async getAll(req, res) {
    const route = await Route.findAll();
    return res.json(route);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const route = await Route.findOne({ where: { id } });
    return res.json(route);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const route = await Route.destroy({ where: { id } });
    return res.json(route);
  }
}

module.exports = new RouteController();

const { DogovorInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class DogovorInfoController {
  async create(req, res, next) {
    try {
      const { title, description } = req.body;
      const application = await DogovorInfo.create({
        title,
        description,
      });
      return res.json(application);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const dogovorInfo = await DogovorInfo.findOne({ where: { id } });
      if (!dogovorInfo) {
        return res.status(404).json({ error: "DogovorInfo not found" });
      }
      return res.json(dogovorInfo);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async getAll(req, res) {
    const dogovorInfo = await DogovorInfo.findAll();
    return res.json(dogovorInfo);
  }

  async destroy(req, res) {
    const { id } = req.params;
    const dogovorInfo = await DogovorInfo.destroy({ where: { id } });
    return res.json(dogovorInfo);
  }
}

module.exports = new DogovorInfoController();

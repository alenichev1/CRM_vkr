const { Application, DogovorInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class ApplicationController {
  async create(req, res, next) {
    try {
      const {
        name,
        data,
        address,
        coordinates,
        fio,
        phone,
        kontragentId,
        statusId,
        taskId,
        info,
      } = req.body;

      const application = await Application.create({
        name,
        data,
        address,
        coordinates,
        fio,
        phone,
        kontragentId,
        statusId,
        taskId,
      });

      if (info) {
        const parsedInfo = JSON.parse(info);
        await Promise.all(
          parsedInfo.map((i) =>
            DogovorInfo.create({
              title: i.title,
              description: i.description,
              applicationId: application.id,
            })
          )
        );
      }

      return res.json(application);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { statusId, taskId } = req.query;

    let application;
    if (!statusId && !taskId) {
      application = await Application.findAll();
    }
    if (statusId && !taskId) {
      application = await Application.findAll({
        where: { statusId },
      });
    }
    if (!statusId && taskId) {
      application = await Application.findAll({
        where: { taskId },
      });
    }
    if (statusId && taskId) {
      application = await Application.findAll({
        where: { taskId, statusId },
      });
    }
    return res.json(application);
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const application = await Application.findOne({
        where: { id },
      });
      if (!application) {
        throw new Error("Application not found");
      }
      return res.json(application);
    } catch (e) {
      next(ApiError.notFound(e.message));
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const application = await Application.destroy({ where: { id } });
    return res.json(application);
  }
}

module.exports = new ApplicationController();

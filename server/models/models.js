const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "ADMIN" },
});

const Application = sequelize.define("application", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  data: { type: DataTypes.DATE, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  coordinates: { type: DataTypes.STRING, allowNull: false },
  fio: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  kontragentId: { type: DataTypes.INTEGER },
  statusId: { type: DataTypes.INTEGER },
  taskId: { type: DataTypes.INTEGER },
});

const DogovorInfo = sequelize.define("dogovor_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Task = sequelize.define("task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Status = sequelize.define("status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const Kontragent = sequelize.define("kontragent", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

const ApplicationStatus = sequelize.define("application_status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ApplicationDogovorInfo = sequelize.define("application_dogovorInfo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ApplicationTask = sequelize.define("Application_task", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Route = sequelize.define("route", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  applicationId: { type: DataTypes.INTEGER, allowNull: false },
  statusId: { type: DataTypes.INTEGER, allowNull: false },
  routeGroupId: { type: DataTypes.INTEGER, allowNull: false },
});

const RouteGroup = sequelize.define("route_group", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

Route.belongsTo(RouteGroup);
RouteGroup.hasMany(Route);

Application.hasMany(Route);
Route.belongsTo(Application);

Status.hasMany(Route);
Route.belongsTo(Status);

Application.hasMany(User);
User.belongsTo(Application);

Application.hasMany(Kontragent);
Kontragent.belongsTo(Application);

Application.belongsToMany(DogovorInfo, { through: ApplicationDogovorInfo });
DogovorInfo.belongsToMany(Application, { through: ApplicationDogovorInfo });

Application.belongsToMany(Status, { through: ApplicationStatus });
Status.belongsToMany(Application, { through: ApplicationStatus });

Application.belongsToMany(Task, { through: ApplicationTask });
Task.belongsToMany(Application, { through: ApplicationTask });

module.exports = {
  User,
  Application,
  DogovorInfo,
  Task,
  Status,
  ApplicationStatus,
  ApplicationTask,
  ApplicationDogovorInfo,
  Kontragent,
  Route,
  RouteGroup,
};

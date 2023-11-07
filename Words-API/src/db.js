require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const UserModel = require("./models/User.js");
const SeccionModel = require("./models/Seccion.js");
const WordModel = require("./models/Word.js");

const sequelize = new Sequelize(
  `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  { logging: false, native: false }
);

UserModel(sequelize);
SeccionModel(sequelize);
WordModel(sequelize);

const { User, Seccion, Word } = sequelize.models;

User.hasMany(Seccion);
Seccion.belongsTo(User);
Seccion.hasMany(Word);
Word.belongsTo(Seccion);

module.exports = {
  sequelize,
  ...sequelize.models,
};

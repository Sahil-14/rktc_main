const dbConfig = require("../config/db.config.js");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});


const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.services = require("./service.model")(sequelize, Sequelize);
db.infrastructure = require("./infrastructure.model.js")(sequelize, Sequelize)
db.infrastructureDetail = require("./infrastructureDetail.model.js")(sequelize, Sequelize)
db.hightlights = require("./highlights.model.js")(sequelize, Sequelize)
db.gallery = require("./gallery.model.js")(sequelize, Sequelize)

db.services.hasMany(db.hightlights, { foreignKey: 'service_id' })
db.hightlights.belongsTo(db.services, { foreignKey: 'service_id' })
db.infrastructure.hasMany(db.infrastructureDetail, { foreignKey: 'infra_id' });
db.infrastructureDetail.belongsTo(db.infrastructure, { foreignKey: 'infra_id' })

db.services.sync();
db.infrastructure.sync();
db.infrastructureDetail.sync();
db.hightlights.sync()
db.gallery.sync()




module.exports = db;
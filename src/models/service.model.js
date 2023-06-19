
module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define("service", {
    service_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      field: 'service_id'
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    },
    s_dec: {
      type: Sequelize.STRING(500),
      allowNull: true
    },
    l_dec: {
      type: Sequelize.STRING(5000),
      allowNull: true
    },
  });
  return Service;
};

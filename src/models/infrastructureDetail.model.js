



module.exports = (sequelize, Sequelize) => {

  // // Define the InfrastructureDetail model
  const InfrastructureDetail = sequelize.define('infrastructureDetail', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    infra_id: {
      type: Sequelize.INTEGER,
      field: 'infra_id'
    },
    model: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    capacity: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    boom_length: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    quantity: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    mast_height: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    image: {
      type: Sequelize.STRING(250),
      allowNull: true,
    },
    dimensions: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    manufacturing_year: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
  });
  return InfrastructureDetail;
};

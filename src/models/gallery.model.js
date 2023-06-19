
module.exports = (sequelize, Sequelize) => {
  const Gallery = sequelize.define("gallery", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image_url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },

  });

  return Gallery;
};
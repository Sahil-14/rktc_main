
module.exports = (sequelize, Sequelize) => {
  const Infrastructure = sequelize.define('infrastructure', {
    infra_id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
      field: 'infra_id'
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    info: {
      type: Sequelize.STRING(10000),
      allowNull: true,
    },
  });
  return Infrastructure;
};

// eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjNjY5Y2QzZS00Mjg2LTRkZTQtYjQzOC00Mjk4NTRlZDYwNTcifQ.eyJleHAiOjE2ODU0NjI1MjEsImlhdCI6MTY4NTM3NjEyMSwianRpIjoiODkyZTIyMjgtODViNC00MWFkLWE4YWYtMDBjNzQ5YzBhODkxIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9uZXRiYW5raW5nLW1pY3Jvc2VydmljZXMiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL25ldGJhbmtpbmctbWljcm9zZXJ2aWNlcyIsInR5cCI6IkluaXRpYWxBY2Nlc3NUb2tlbiJ9.9160RileJ0GCL04049Gd7pDXOgCohvPsU-LTpPnKB70

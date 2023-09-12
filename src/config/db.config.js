
// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "root",
//   DB: "test_rktc",
//   dialect: "mysql",
//   dialectOptions: {
//     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
//   },
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };


module.exports = {
  HOST: "rktc.ca821kwblmlu.ap-south-1.rds.amazonaws.com",
  USER: "admin",
  PASSWORD: "admin12345",
  DB: "rktc_main",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};


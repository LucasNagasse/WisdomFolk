var mysql = require("mysql2");

// CONEXÃO DO BANCO MYSQL SERVER
var mySqlConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

function execute(query) {
  if (process.env.ENVIROMENT !== "production" && process.env.ENVIROMENT !== "development") {
    return Promise.reject("Enviroment not defined.");
  }

  return new Promise(function (resolve, reject) {
    var connection = mysql.createConnection(mySqlConfig);
    connection.connect();
    connection.query(query, function (error, data) {
      connection.end();
      if (error) {
        reject(error);
      }
      console.log(query, data);
      resolve(data);
    });
    connection.on("error", function (error) {
      return "Database error:", error.sqlMessage;
    });
  });
}

module.exports = {
  execute,
};

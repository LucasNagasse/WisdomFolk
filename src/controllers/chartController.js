// declaração do script do model (fazem todas as interaçÕes com o banco de dados):
const chartModel = require("../models/chartModel");

function usersPerFolk(req, res) {
  chartModel
    .usersPerFolk()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
function postsPerFolk(req, res) {
  chartModel
    .postsPerFolk()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
function folksPerFolk(req, res) {
  chartModel
    .folksPerFolk()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
// exporta as funções para o uso em outros arquivos:
module.exports = {
  usersPerFolk,
  postsPerFolk,
  folksPerFolk,
};

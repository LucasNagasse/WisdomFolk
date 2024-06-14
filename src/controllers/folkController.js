// declaração do script do model (fazem todas as interaçÕes com o banco de dados):
const folkModel = require("../models/folkModel");

// função de cadastro do grupo:
function create(req, res) {
  // valida os dados recebidos:
  if (!("name" in req.body)) return res.status(400).send("`name` is not defined.");
  if (!("fkOwner" in req.body)) return res.status(400).send("`fkOwner` is not defined.");
console.log(req.body);
  // envia os dados para a função `create` do `folkModel`:
  folkModel
    .create(req.body.name, req.body.fkOwner, req.body.fkFolk)
    .then(function (result) {
      res.status(201).json(result);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
// função de entrar no grupo:
function join(req, res) {
  // valida os dados recebidos:
  if (!("id" in req.params)) return res.status(400).send("`id` is not defined.");
  if (!("fkUser" in req.body)) return res.status(400).send("`fkUser` is not defined.");

  // envia os dados para a função `join` do `folkModel`:
  folkModel
    .join(req.params.id, req.body.fkUser)
    .then(function (result) {
      res.status(201).json(result);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
function getAll(req, res) {
  folkModel
    .getAll()
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
function get(req, res) {
  if (!("id" in req.params)) return res.status(400).send("`id` is not defined.");

  folkModel
    .get(req.params.id)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
function edit(req, res) {
  if (!("id" in req.body)) return res.status(400).send("`id` is not defined.");

  folkModel
    .edit(req.body.id, req.body.name, req.body.fkOwner)
    .then(function (data) {
      res.status(200).json(data);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
function remove(req, res) {
  if (!("id" in req.body)) return res.status(400).send("`id` is not defined.");

  folkModel
    .remove(req.body.id)
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
  create,
  join,
  getAll,
  get,
  edit,
  remove,
};

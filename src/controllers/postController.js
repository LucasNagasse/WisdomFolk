// declaração do script do model (fazem todas as interaçÕes com o banco de dados):
const postModel = require("../models/postModel");

// função de cadastro do post:
function create(req, res) {
  // valida os dados recebidos:
  if (!("content" in req.body)) return res.status(400).send("`content` is not defined.");
  if (!("fkFolk" in req.body)) return res.status(400).send("`fkFolk` is not defined.");

  // envia os dados para a função `create` do `postModel`:
  postModel
    .create(req.body.content, req.body.fkFolk, req.body.fkAuthor, req.body.fkPost)
    .then(function (result) {
      res.status(201).json(result);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}
function getAll(req, res) {
  postModel
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

  postModel
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

  postModel
    .edit(req.body.id, req.body.content)
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

  postModel
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
  getAll,
  get,
  edit,
  remove,
};

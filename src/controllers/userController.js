// declaração do script do model (fazem todas as interaçÕes com o banco de dados):
const userModel = require("../models/userModel");

// declaração dos caracteres permitidos:

// função de cadastro do usuário no site:
function signup(req, res) {
  // valida os dados recebidos:
  if (!("name" in req.body)) return res.status(400).send("`name` is not defined.");
  if (!("email" in req.body)) return res.status(400).send("`email` is not defined.");
  if (!("password" in req.body)) return res.status(400).send("`password` is not defined.");

  // envia os dados para a função `create` do `userModel`:
  userModel
    .create(req.body.name, req.body.email, req.body.password)
    .then(function (result) {
      res.status(201).json(result);
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}

// função de login do usuário no site:
function login(req, res) {
  if (!("email" in req.body)) return res.status(400).send("`email` is not defined.");
  if (!("password" in req.body)) return res.status(400).send("`password` is not defined.");

  // envia os dados para a função `login` do `userModel`:
  userModel
    .authenticate(req.body.email, req.body.password)
    .then(function (data) {
      if (data.length == 1) {
        res.status(200).json(data);
      } else {
        res.status(403).send("Invalid login.");
      }
    })
    .catch(function (error) {
      console.log("Error: ", error);
      res.status(500).json(error.sqlMessage);
    });
}

function get(req, res) {
  if (!("id" in req.params)) return res.status(400).send("`id` is not defined.");

  userModel
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

  userModel
    .edit(req.body.id, req.body.name, req.body.email, req.body.password)
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

  userModel
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
  signup,
  login,
  get,
  edit,
  remove,
};

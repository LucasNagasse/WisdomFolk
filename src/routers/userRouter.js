const express = require("express");

// declaração dos scripts dos controllers (controlam todas as requisições, retornando alguma resposta para elas):
const userController = require("../controllers/userController.js");

// declaração do mecanismo de rotas do próprio express:
const router = express.Router({mergeParams: true});

// redirecionando os dados da requisição http para as respectivas funções no `userController`:
//   onde cada requisição (req) possui sua respectiva resposta (res):
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/:id", userController.get);
router.put("/", userController.edit);
router.delete("/", userController.remove);

// exportando o "roteador" para ser requerido por outro arquivo:
module.exports = router;

const express = require("express");

// declaração dos scripts dos controllers (controlam todas as requisições, retornando alguma resposta para elas):
const folkController = require("../controllers/folkController.js");

// declaração do mecanismo de rotas do próprio express:
const router = express.Router({mergeParams: true});

// redirecionando os dados da requisição http para as respectivas funções no `folkController`:
//   onde cada requisição (req) possui sua respectiva resposta (res):
router.post("/", folkController.create);
router.post("/:id", folkController.join);
router.get("/", folkController.getAll);
router.get("/:id", folkController.get);
router.put("/", folkController.edit);
router.delete("/", folkController.remove);

// exportando o "roteador" para ser requerido por outro arquivo:
module.exports = router;

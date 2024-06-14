const express = require("express");

// declaração dos scripts dos controllers (controlam todas as requisições, retornando alguma resposta para elas):
const postController = require("../controllers/postController.js");

// declaração do mecanismo de rotas do próprio express:
const router = express.Router({mergeParams: true});

// redirecionando os dados da requisição http para as respectivas funções no `postController`:
//   onde cada requisição (req) possui sua respectiva resposta (res):
router.post("/", postController.create);
router.get("/", postController.getAll);
router.get("/:id", postController.get);
router.put("/", postController.edit);
router.delete("/", postController.remove);

// exportando o "roteador" para ser requerido por outro arquivo:
module.exports = router;

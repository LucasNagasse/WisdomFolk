const express = require("express");

// declaração dos scripts dos controllers (controlam todas as requisições, retornando alguma resposta para elas):
const chartController = require("../controllers/chartController.js");

// declaração do mecanismo de rotas do próprio express:
const router = express.Router({mergeParams: true});

// redirecionando os dados da requisição http para as respectivas funções no `chartController`:
//   onde cada requisição (req) possui sua respectiva resposta (res):
router.get("/usersPerFolk", chartController.usersPerFolk);
router.get("/postsPerFolk", chartController.postsPerFolk);
router.get("/folksPerFolk", chartController.folksPerFolk);

// exportando o "roteador" para ser requerido por outro arquivo:
module.exports = router;

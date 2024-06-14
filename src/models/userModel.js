// declaração do script de configuração do banco de dados:
const database = require("../database/config");
// declaração do script de funções úteis:
const utils = require("../utils.js");

// função de inserção de dados:
function create(name, email, password) {
  return database.execute(`insert into User (name, email, password) values ('${utils.formatValue(name)}', '${utils.formatValue(email)}', '${utils.formatValue(password)}');`);
}
// função de autenticação de dados:
function authenticate(email, password) {
  password = utils.formatValue(password);
  return database.execute(`select id, name, email, password from User where deleted=false and email='${utils.formatValue(email)}' and password='${utils.formatValue(password)}';`);
}
// função de vizualização dos dados não-sensíveis de determinado usuário:
function get(id) {
  return database.execute(`select id, deleted, name, email from User where id=${id};`);
}
// função de vizualização dos dados não-sensíveis de todos os usuários:
function getAll() {
  return database.execute(`select id, name, email from User where deleted=false;`);
}
// função de edição de dados:
function edit(id, name, email, password) {
  const edits = { name, email, password };

  const fields = [];
  for (let k in edits) {
    if (edits[k] !== undefined) fields.push(`${k}='${utils.formatValue(edits[k])}'`);
  }

  let query = `update User set ${fields.join(", ")} where deleted=false and id=${id};`;
  return database.execute(query);
}
// função de exclusão de dados:
function remove(id) {
  return database.execute(`update User set deleted=true where deleted=false and id=${id};`);
}

module.exports = {
  create,
  authenticate,
  get,
  getAll,
  edit,
  remove,
};

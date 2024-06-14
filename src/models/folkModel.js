// declaração do script de configuração do banco de dados:
const database = require("../database/config");
// declaração do script de funções úteis:
const utils = require("../utils.js");

// função de inserção de dados:
async function create(name, fkOwner, fkFolk) {
  const insert = { name, fkOwner, fkFolk };

  const fields = [];
  const data = [];

  for (let k in insert) {
    if (insert[k] !== undefined) {
      fields.push(k);
      data.push(`'${utils.formatValue(insert[k])}'`);
    }
  }

  let query = `insert into Folk (${fields.join(", ")}) values (${data.join(
    ", "
  )});`;
  const result = await database.execute(query);
  database.execute(
    `insert into FolkHasUser (fkFolk, fkUser) values (${result.insertId}, ${fkOwner});`
  );
  return result;
}
// função de entrar no grupo:
function join(id, fkUser) {
  return database.execute(
    `insert into FolkHasUser (fkFolk, fkUser) values (${id}, ${fkUser});`
  );
}
// função de vizualização dos dados não-sensíveis de determinado usuário:
function get(id) {
  return database.execute(
    `select id, deleted, name, fkOwner, fkFolk from Folk where id=${id};`
  );
}
// função de vizualização dos dados não-sensíveis de todos os usuários:
function getAll() {
  return database.execute(
    `select id, name, fkOwner, fkFolk from Folk where deleted=false;`
  );
}
// função de edição de dados:
function edit(id, name, email, fkOwner, fkFolk) {
  const edits = { name, email, fkOwner, fkFolk };

  const fields = [];
  for (let k in edits) {
    if (edits[k] !== undefined)
      fields.push(`${k}='${utils.formatValue(edits[k])}'`);
  }

  let query = `update Folk set ${fields.join(
    ", "
  )} where deleted=false and id=${id};`;
  return database.execute(query);
}
// função de exclusão de dados:
function remove(id) {
  return database.execute(
    `update Folk set deleted=true where deleted=false and id=${id};`
  );
}

module.exports = {
  create,
  join,
  get,
  getAll,
  edit,
  remove,
};

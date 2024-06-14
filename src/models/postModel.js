// declaração do script de configuração do banco de dados:
const database = require("../database/config.js");
// declaração do script de funções úteis:
const utils = require("../utils.js");

// função de inserção de dados:
function create(content, fkFolk, fkAuthor, fkPost) {
  const insert = { content, fkFolk, fkAuthor, fkPost };

  const fields = [];
  const data = [];

  for (let k in insert) {
    if (insert[k] !== undefined) {
      fields.push(k);
      data.push(`'${utils.formatValue(insert[k])}'`);
    }
  }

  let query = `insert into Post (${fields.join(", ")}) values (${data.join(", ")});`;
  return database.execute(query);
}
// função de vizualização dos dados não-sensíveis de determinado usuário:
function get(id) {
  return database.execute(`select id, deleted, content, fkFolk, fkAuthor, fkPost from Post where id=${id};`);
}
// função de vizualização dos dados não-sensíveis de todos os usuários:
function getAll() {
  return database.execute(`select id, content, fkFolk, fkAuthor, fkPost from Post where deleted=false;`);
}
// função de edição de dados:
function edit(id, content) {
  const edits = { content };

  const fields = [];
  for (let k in edits) {
    if (edits[k] !== undefined) fields.push(`${k}='${utils.formatValue(edits[k])}'`);
  }

  let query = `update Post set ${fields.join(", ")} where deleted=false and id=${id};`;
  return database.execute(query);
}
// função de exclusão de dados:
function remove(id) {
  return database.execute(`update Post set deleted=true where deleted=false and id=${id};`);
}

module.exports = {
  create,
  get,
  getAll,
  edit,
  remove,
};

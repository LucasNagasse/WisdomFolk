// declaração do script de configuração do banco de dados:
const database = require("../database/config");
// declaração do script de funções úteis:
const utils = require("../utils.js");

// função de vizualização dos dados:
function usersPerFolk() {
  return database.execute(
    `select f.name, count(u.id) count from Folk f join FolkHasUser fhu on f.id = fhu.fkFolk join User u on fhu.fkUser = u.id group by f.name, u.id;`
  );
}
function postsPerFolk() {
  return database.execute(
    `
select f.name, count(p.id) count from Folk f join FolkHasUser fhu on f.id = fhu.fkFolk join User u on fhu.fkUser = u.id join Post p on u.id = p.fkAuthor group by f.name, p.id;`
  );
}
function folksPerFolk() {
  return database.execute(
    `
select f.name, count(f2.id) count from Folk f join Folk f2 on f.id = f2.fkFolk group by f2.id, f.name;
`
  );
}

module.exports = {
  usersPerFolk,
  postsPerFolk,
  folksPerFolk,
};

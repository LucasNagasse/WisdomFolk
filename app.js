// declaração das variáveis (nesse caso constantes) de dependência:
//   variáveis de inclusão das "bibliotecas" (módulos):
const path = require("path");

//   variável que armazena o caminho para as variáveis de ambiente (configurações do servidor):
const envPath = ".env.dev"; // ambiente de desenvolvimento (.dev)
//   const envPath = '.env'; // ambiente de produção

//   declaração do caminho da pasta public para renderizar arquivos estáticos (arquivos prontos que não mudam, como arquivos *.html, *.css, *.png, etc) com a indicação da pasta estática do servidor:
process.env.publicPath = path.join(__dirname, "public");

//   declara as variáveis de ambiente a partir do caminho fornecido:
require("dotenv").config({ path: envPath });

const express = require("express");
const cors = require("cors");

//   declaração dos scripts das rotas (ditam quais rotas são válidas):
const indexRouter = require("./src/routers/indexRouter.js");

// aplicação:
//   declaração da variável da aplicação
const app = express();

//   configuração dos middlewares da aplicação (scripts prontos que são executados durante a comunicação entre o cliente e o servidor):
//     adição do middleware para transferir dados entre esta e outra origem/domínio:
app.use(cors());
//     adição do middleware para tratar dados enviados com encriptação do tipo "application/x-www-form-urlencoded":
app.use(express.urlencoded({ extended: false }));
//     adição do middleware para tratar dados enviados com encriptação do tipo "application/json":
app.use(express.json());

//     adição dos middlewares de rotas para toda url que inicia com "/", "/user", "/folk", etc:
app.use("/", indexRouter);

//     adição do middleware para lidar com requisições estáticas:
app.use(express.static(process.env.publicPath));

//     adição da rota para erros de requisição:
app.use((req, res) => {
  res.status(404).sendFile(path.join(process.env.publicPath, "notFound.html"));
});

//   início da "escuta" do servidor (função para iniciar o recebimento de requisições) juntamente com uma função a ser executada após o início:
const listener = app.listen(process.env.APP_PORT, () => {
  console.log(`Server running in "${process.env.ENVIROMENT}" enviroment, can be accessed with "http://${process.env.APP_HOST}:${process.env.APP_PORT}".\nIf the enviroment is "development", you are connected in a local database.\nIf the enviroment is "production", you are connected in a remote database.`);
});

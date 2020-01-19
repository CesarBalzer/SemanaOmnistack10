const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');

const { setupWebSocket } = require('./websocket.js');

const app = express();

const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-hetmf.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Para liberar o uso de url externas precisamos instalar o cors
app.use(cors());

app.use(express.json());

app.use(routes);

// Metodos HTTP: GET, POST, PUT, DELETE

//Tipos de parametros

//Query params: request.query (Filtros, paginacao, ordenacao...etc)

//Route params: request.params (Identificar um recurso na alteracao ou remocao)

//Body: request.body (dados para criacao ou alteracao de um registro)

//MongoDB (Nao relacional)


server.listen(3333);


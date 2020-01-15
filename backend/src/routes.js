//Importamos o express com a funcao Router para utilizar os metodos de rotas: post, get, put, delete
const { Router } = require('express');

//Importamos o controller DevController
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

// Precisamos importar o axios para fazer a busca dos dados no github
// const axios = require('axios');

//Importar o model Dev para salvar as informacoes no banco do mongodb
// const Dev = require('./models/Dev');


//Instaciamos uma nova classe para usar os metodos
const routes = Router();

routes.get('/devs', DevController.index);

//show
routes.get('/devs/:id', DevController.show);

//create
routes.post('/devs', DevController.store);

//update 
routes.put('/devs/:id', DevController.update);

//delete 
routes.delete('/devs/:id', DevController.destroy);

//search
routes.get('/search', SearchController.index);

module.exports = routes;
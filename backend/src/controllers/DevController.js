// Precisamos importar o axios para fazer a busca dos dados no github
const axios = require('axios');

//Importar o model Dev para salvar as informacoes no banco do mongodb
const Dev = require('../models/Dev');

//
const parseStringAsArray = require('../utils/parseStringAsArray');

const { findConnections, sendMessage } = require('../websocket');
//No maximo 5 metodos do controller: index, show, store, update, destroy

module.exports = {
  async index(request, response) {

    const devs = await Dev.find();

    return response.json(devs);

  },

  async store(request, response) {

    //Desestruturamos o request.body pegando as variaveis do usuario
    const { github_username, techs, latitude, longitude } = request.body;

    //Evitar duplicata
    let dev = await Dev.findOne({ github_username });

    if (!dev) {

      //Aguardamos o resultado com await por causa do tempo de espera
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      //desustruturamos os dados da apiResponse para obter somente as variaveis name, avatar_url, bio
      //* setamos o name  recebendo o login para caso nao exista o nome de usuario do github
      const { name = login, avatar_url, bio } = apiResponse.data;

      //Separando o array vindo do usuario, e mapeando para retirar os espacos com o trim
      const techsArray = parseStringAsArray(techs);

      //Para passar os dados de lat e long precisamos criar uma variavel
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      //Aguardamos o resultado da criacao dos dados no banco
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      //Filtrsar as conexoes que etsao no maximo a 10km de distancia
      //  e que possuem pelo menos tenhas pelo menosd uma das tecnologias filtradas
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      )
      sendMessage(sendSocketMessageTo, 'new-dev', dev);

    }
    return response.json(dev);
  },

  async show(request, response) {

    const devs = await Dev.findById(request.params.id);

    return response.json(devs);
  },

  async update(request, response) {

    const devs = await Dev.findByIdAndUpdate(request.params.id, request.body, { new: true });

    return response.json(devs);
  },

  async destroy(request, response) {
    const devs = await Dev.findByIdAndRemove(request.params.id);

    return response.json(devs);
  },


};
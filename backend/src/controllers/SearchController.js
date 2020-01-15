const Dev = require('../models/Dev')

const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

  async index(request, response) {

    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude] //sempre passar a longitude primeiro, padrao do mongo
          },
          $maxDistance: 10000,
        }
      }
    });

    return response.json({ devs });
  }

};
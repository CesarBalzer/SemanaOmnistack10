const mongoose = require('mongoose');

//Para esconder o aviso de depreciação
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({

  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    index: '2dsphere'
  }

});

module.exports = mongoose.model('Dev', DevSchema);
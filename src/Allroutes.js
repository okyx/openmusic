const Albums = require('./api/albums');
const AlbumService = require('./services/albumService');
const AlbumValidator = require('./validations/albums');
const Songs = require('./api/songs');
const SongValidator = require('./validations/songs');
const SongService = require('./services/songService');

const albumService = new AlbumService();
const songService = new SongService();
const routess = [
  {
    plugin: Albums,
    options: {
      service: albumService,
      validator: AlbumValidator,
    },
  },
  {
    plugin: Songs,
    options: {
      service: songService,
      validator: SongValidator,
    },
  },
];
module.exports = routess;

const BadRequest = require('../../exceptions/ClientError/BadRequest');
const { postPlaylistSongSchema, deletePlaylistSongSchema } = require('./schema');

const playlistsSongsValidator = {
  validatePost: (payloads) => {
    const is = postPlaylistSongSchema.validate(payloads);
    if (is.error) {
      throw new BadRequest('payloads tidak sesuai');
    }
  },
  validateDelete: (payloads) => {
    const is = deletePlaylistSongSchema.validate(payloads);
    if (is.error) {
      throw new BadRequest('payloads tidak sesuai');
    }
  },
};

module.exports = playlistsSongsValidator;

const BadRequest = require('../../exceptions/ClientError/BadRequest');
const { postPlaylistSchema } = require('./schema');

const playlistValidator = {
  validatePost: (payloads) => {
    const is = postPlaylistSchema.validate(payloads);
    if (is.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
};

module.exports = playlistValidator;

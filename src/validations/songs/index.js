const BadRequest = require('../../exceptions/ClientError/BadRequest');
const songSchema = require('./schema');

const songsValidator = {
  validateSong: (payloads) => {
    const isValid = songSchema.validate(payloads);
    if (isValid.error) {
      throw new BadRequest('gagal validasi karna request tidak sesuai');
    }
  },
};

module.exports = songsValidator;

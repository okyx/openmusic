const BadRequest = require('../../exceptions/ClientError/BadRequest');
const AlbumSchema = require('./schema');

const AlbumValidator = {
  validateAlbum: (payloads) => {
    const isValid = AlbumSchema.validate(payloads);
    if (isValid.error) {
      throw new BadRequest('gagal validasi karna request tidak sesuai');
    }
  },
};

module.exports = AlbumValidator;

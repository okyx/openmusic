const { ImageSchema } = require('./schema');
const BadRequest = require('../../exceptions/ClientError/BadRequest');

const uploadValidator = {
  imageValidator: (payload) => {
    const is = ImageSchema.validate(payload);
    if (is.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
};
module.exports = uploadValidator;

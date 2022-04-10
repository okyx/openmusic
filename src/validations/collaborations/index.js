const BadRequest = require('../../exceptions/ClientError/BadRequest');
const { postCollaborationsSchema } = require('./schema');

const collaborationsValidator = {
  validatePost: (payloads) => {
    const is = postCollaborationsSchema.validate(payloads);
    if (is.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
  validateDelete: (payloads) => {
    const is = postCollaborationsSchema.validate(payloads);
    if (is.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
};

module.exports = collaborationsValidator;

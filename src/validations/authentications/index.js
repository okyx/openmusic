const BadRequest = require('../../exceptions/ClientError/BadRequest');
const { postAuthenticationSchema, putAuthenticationSchema, deleteAuthenticationSchema } = require('./schema');

const AuthenticationValidation = {
  validatePost: (payload) => {
    const result = postAuthenticationSchema.validate(payload);
    if (result.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
  validatePut: (payload) => {
    const result = putAuthenticationSchema.validate(payload);
    if (result.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
  validateDelete: (payload) => {
    const result = deleteAuthenticationSchema.validate(payload);
    if (result.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
};

module.exports = AuthenticationValidation;

const BadRequest = require('../../exceptions/ClientError/BadRequest');
const { postUserSchema } = require('./schema');

const userValidation = {
  validatePost: (payload) => {
    const result = postUserSchema.validate(payload);
    if (result.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
};
module.exports = userValidation;

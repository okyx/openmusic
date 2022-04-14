const { exportValidatorSchema } = require('./schema');
const BadRequest = require('../../exceptions/ClientError/BadRequest');

const exportValidator = {
  validatePost: (payload) => {
    const is = exportValidatorSchema.validate(payload);
    if (is.error) {
      throw new BadRequest('payload tidak sesuai');
    }
  },
};

module.exports = exportValidator;

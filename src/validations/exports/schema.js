const Joi = require('joi');

const exportValidatorSchema = Joi.object({
  targetEmail: Joi.string().email({ tlds: true }).required(),
});

module.exports = { exportValidatorSchema };

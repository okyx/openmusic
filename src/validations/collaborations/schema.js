const Joi = require('joi');

const postCollaborationsSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

const deleteCollaborationsSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { postCollaborationsSchema, deleteCollaborationsSchema };

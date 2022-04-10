const Joi = require('joi');

const postPlaylistSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { postPlaylistSchema };

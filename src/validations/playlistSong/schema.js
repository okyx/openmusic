const Joi = require('joi');

const postPlaylistSongSchema = Joi.object({
  songId: Joi.string().required(),
});

const deletePlaylistSongSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { postPlaylistSongSchema, deletePlaylistSongSchema };

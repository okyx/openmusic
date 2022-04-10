/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addConstraint('collaborations', 'uniqueCollaborations', 'UNIQUE(playlist_id,user_id)');
};

exports.down = (pgm) => {
  pgm.dropConstraint('collaborations', 'uniqueCollaborations');
};

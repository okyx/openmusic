/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(22)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(22)',
      notNull: true,
    },
  });
  pgm.addConstraint(
    'user_album_likes',
    'fkFromUALToAlbum',
    'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'user_album_likes',
    'fkFromUALTousers',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'user_album_likes',
    'unique2',
    'UNIQUE(user_id, album_id)',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};

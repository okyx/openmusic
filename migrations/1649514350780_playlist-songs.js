/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'VARCHAR(19)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(25)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(22)',
      notNull: true,
    },
  });
  pgm.addConstraint(
    'playlist_songs',
    'fkToPlaylists',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'playlist_songs',
    'fkToSongs',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'playlist_songs',
    'unique',
    'UNIQUE(playlist_id,song_id)',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_songs');
};

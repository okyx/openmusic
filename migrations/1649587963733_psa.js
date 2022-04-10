/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'VARCHAR(20)',
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
    user_id: {
      type: 'VARCHAR(22)',
      notNull: true,
    },
    action: {
      type: 'VARCHAR(10)',
      notNull: true,
    },
    time: {
      type: 'TEXT',
      notNull: true,
    },
  });
  pgm.addConstraint(
    'playlist_song_activities',
    'fkFromPsaToPlaylistsssss',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'playlist_song_activities',
    'fkFromPsaToSongs',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'playlist_song_activities',
    'fkFromPsaToPlaylists',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_song_activities');
};

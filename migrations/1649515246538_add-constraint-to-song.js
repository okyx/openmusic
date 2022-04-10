/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql('ALTER TABLE songs RENAME COLUMN "albumId" TO album_id');
  pgm.sql("INSERT INTO albums VALUES('old_album','old_album','1900')");
  pgm.sql("UPDATE songs SET album_id = 'old_album' WHERE album_id = NULL");
  pgm.addConstraint(
    'songs',
    'fkToAlbums',
    'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.sql("UPDATE songs SET album_id = NULL where album_id = 'old_album'");
  pgm.sql('ALTER TABLE songs RENAME COLUMN album_id TO "albumId"');
  pgm.sql("DELETE albums WHERE id = 'old_album'");
  pgm.dropConstraint('songs', 'fkToAlbums');
};

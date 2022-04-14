const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class AlbumLikeService {
  constructor() {
    this._pool = new Pool();
  }

  async addLikes(userId, albumId) {
    const id = `ual-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3)',
      values: [id, userId, albumId],
    };
    await this._pool.query(query);
  }

  async deleteLikes(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes where user_id = $1 and album_id = $2',
      values: [userId, albumId],
    };
    await this._pool.query(query);
  }

  async getLike(albumId) {
    const query = {
      text: 'SELECT COUNT(*) as likes from user_album_likes WHERE album_id = $1',
      values: [albumId],
    };
    const result = await this._pool.query(query);
    return result.rows[0].likes;
  }
}

module.exports = AlbumLikeService;

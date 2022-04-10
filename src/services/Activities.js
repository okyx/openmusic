const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class Activities {
  constructor() {
    this._pool = new Pool();
  }

  async addActivites({
    playlistId, songId, userId, action,
  }) {
    const time = new Date().toISOString();
    const id = `psa-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, playlistId, songId, userId, action, time],
    };
    await this._pool.query(query);
  }

  async getActivites(playlistId) {
    const query = {
      text: 'SELECT users.username,songs.title, psa.action, psa.time from playlist_song_activities as psa INNER JOIN songs on psa.song_id = songs.id INNER JOIN users on psa.user_id = users.id WHERE psa.playlist_id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = Activities;

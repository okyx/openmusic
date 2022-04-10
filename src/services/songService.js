const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../exceptions/ClientError/NotFoundError');
const ServerError = require('../exceptions/ServerError');
const { MapTo3Columns } = require('../utils/songs/MapTo3Column');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new ServerError('Gagal memasukkan data');
    }
    return result.rows[0].id;
  }

  async getSongs(paramsQuery) {
    let text = 'SELECT * FROM songs';
    const temporaryQuery = [];
    const values = [];
    let i = 1;
    Object.keys(paramsQuery).forEach((q) => {
      if (paramsQuery[q]) {
        temporaryQuery.push(`${q} ILIKE $${i}`);
        values.push(`%${paramsQuery[q]}%`);
        i += 1;
      }
    });
    if (temporaryQuery.length) {
      const Query1 = temporaryQuery.join(' and ');
      text = `${text} WHERE ${Query1}`;
    }
    const querys = {
      text,
      values,
    };
    const result = await this._pool.query(querys);
    return result.rows.map(MapTo3Columns);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Id tidak ada');
    }
    return result.rows[0];
  }

  async putSongById(id, {
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
  }) {
    const dataById = await this.getSongById(id);
    const durations = duration || dataById.duration;
    const albumIds = albumId || dataById.albumId;
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
      values: [title, year, genre, performer, durations, albumIds, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbaruhi catatan. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('ID tidak ditemukan');
    }
  }
}

module.exports = SongService;

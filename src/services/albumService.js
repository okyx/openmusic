const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const ServerError = require('../exceptions/ServerError');
const NotFoundError = require('../exceptions/ClientError/NotFoundError');
const mapCoverUrl = require('../utils/albums/mapCoverUrl');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO ALBUMS VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new ServerError('Gagal menyimpan');
    }
    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM Albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('gagal mendapat id tersebut');
    }
    const results = result.rows.map(mapCoverUrl);
    let data = { ...results[0] };
    const querySong = {
      text: 'SELECT * FROM songs WHERE album_id = $1',
      values: [id],
    };
    const resultSong = await this._pool.query(querySong);
    if (resultSong.rows.length) {
      data = { ...data, songs: resultSong.rows };
    }
    return data;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name= $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbaruhi, id tidak ada');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM Albums WHERE id = $1 RETURNING id',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal menghapus catatan karna id tidak ada');
    }
  }

  async editCoverById(path, id) {
    const query = {
      text: 'UPDATE albums SET cover= $1 WHERE id = $2 RETURNING id',
      values: [path, id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbaruhi, id tidak ada');
    }
  }
}
module.exports = AlbumService;

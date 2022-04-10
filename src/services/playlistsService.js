const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../exceptions/ClientError/NotFoundError');
const ServerError = require('../exceptions/ServerError');
const Forbidden = require('../exceptions/ClientError/Forbidden');

class PlaylistService {
  constructor(collaborationService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
  }

  async addPlaylist({ userId, name }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, userId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new ServerError('Gagal memasukan data');
    }
    return result.rows[0].id;
  }

  async getPlaylists(userId) {
    const query = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlists INNER JOIN users ON playlists.owner = users.id LEFT JOIN collaborations ON collaborations.playlist_id = playlists.id where users.id = $1 OR collaborations.user_id = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPlaylistsByPlaylistId(playlistId) {
    const query = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlists INNER JOIN users ON playlists.owner = users.id where playlists.id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async deletePlaylist(playlistId) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1',
      values: [playlistId],
    };
    await this._pool.query(query);
  }

  async verifyPlaylistId(playlistId, userId) {
    const query = {
      text: 'SELECT owner from playlists where id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('tidak ada id tersebut');
    }
    if (result.rows[0].owner !== userId) {
      throw new Forbidden('tidak ada akses');
    }
  }

  async userHaveAccess(playlistId, userId) {
    try {
      await this.verifyPlaylistId(playlistId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      try {
        await this._collaborationService.verifyCollaboration(playlistId, userId);
      } catch {
        throw error;
      }
    }
  }
}
module.exports = PlaylistService;

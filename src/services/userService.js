const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const BadRequest = require('../exceptions/ClientError/BadRequest');
const ServerError = require('../exceptions/ServerError');
const Unauthorized = require('../exceptions/ClientError/Unautorized');
const NotFoundError = require('../exceptions/ClientError/NotFoundError');

class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async addData({ username, password, fullname }) {
    await this.verifyUniqueUsername(username);
    const id = `users-${nanoid(16)}`;
    const Hashedpassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, Hashedpassword, fullname],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new ServerError('Gagal memasukkan data');
    }
    return result.rows[0].id;
  }

  async verifyUniqueUsername(username) {
    const query = {
      text: 'SELECT * from users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);
    if (result.rows.length) {
      throw new BadRequest('Username telah ada');
    }
  }

  async verifyUserCredentials({ username, password }) {
    const query = {
      text: 'SELECT * from users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new Unauthorized('Username tidak ada');
    }
    const { id, password: Hashedpassword } = result.rows[0];
    const match = await bcrypt.compare(password, Hashedpassword);
    if (!match) {
      throw new Unauthorized('password tidak sesuai');
    }
    return id;
  }

  async verifyUserId(userId) {
    const query = {
      text: 'SELECT * from users WHERE id = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('tidak ada id tersebut');
    }
  }
}
module.exports = UserService;

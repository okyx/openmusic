const { Pool } = require('pg');
const BadRequest = require('../exceptions/ClientError/BadRequest');

class AuthenticationService {
  constructor() {
    this._pool = new Pool();
  }

  // add token to authenticiation table
  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };
    await this._pool.query(query);
  }

  // verify token
  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT * from authentications WHERE token = $1',
      values: [token],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new BadRequest('refresh token salah');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE from authentications WHERE token = $1',
      values: [token],
    };
    await this._pool.query(query);
  }
}

module.exports = AuthenticationService;

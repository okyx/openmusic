const Jwt = require('@hapi/jwt');
const BadRequest = require('../exceptions/ClientError/BadRequest');

const TokenManager = {
  generateAccessToken: (id) => Jwt.token.generate(id, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (id) => Jwt.token.generate(id, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new BadRequest('Refresh Token salah');
    }
  },
};
module.exports = TokenManager;

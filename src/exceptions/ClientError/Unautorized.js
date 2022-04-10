const ClientError = require('.');

class Unauthorized extends ClientError {
  constructor(message, code = 401) {
    super(message, code);
    this.name = 'Unauthorized';
  }
}
module.exports = Unauthorized;

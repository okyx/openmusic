const ClientError = require('.');

class Forbidden extends ClientError {
  constructor(message, code = 403) {
    super(message, code);
    this.name = 'Forbidden';
  }
}

module.exports = Forbidden;

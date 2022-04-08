const ClientError = require('.');

class BadRequest extends ClientError {
  constructor(message, code = 400) {
    super(message, code);
    this.name = 'Bad Request';
  }
}

module.exports = BadRequest;

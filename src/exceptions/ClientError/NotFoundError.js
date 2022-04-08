const ClientError = require('.');

class NotFoundError extends ClientError {
  constructor(message, code = 404) {
    super(message, code);
    this.name = 'Not Found Error';
  }
}
module.exports = NotFoundError;

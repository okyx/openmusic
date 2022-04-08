class ServerError extends Error {
  constructor(message, code = 500) {
    super(message);
    this.statusCode = code;
    this.name = 'Server Error';
    this.status = 'error';
  }
}
module.exports = ServerError;

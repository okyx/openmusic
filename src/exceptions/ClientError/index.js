class ClientError extends Error {
  constructor(message, code = 404) {
    super(message);
    this.statusCode = code;
    this.name = 'ClientError';
    this.status = 'fail';
  }
}
module.exports = ClientError;

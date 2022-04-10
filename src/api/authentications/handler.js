class AuthenticationHandler {
  constructor(service, validator, userService, tokenManager) {
    this._service = service;
    this._validator = validator;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this.postAuthenticationsHandler = this.postAuthenticationsHandler.bind(this);
    this.putAuthenticationsHandler = this.putAuthenticationsHandler.bind(this);
    this.deletetAuthenticationsHandler = this.deletetAuthenticationsHandler.bind(this);
  }

  async postAuthenticationsHandler(request, h) {
    try {
      this._validator.validatePost(request.payload);
      const id = await this._userService.verifyUserCredentials(request.payload);
      const refreshToken = this._tokenManager.generateRefreshToken({ id });
      const accessToken = this._tokenManager.generateAccessToken({ id });
      await this._service.addRefreshToken(refreshToken);
      const response = h.response({
        status: 'success',
        data: {
          accessToken,
          refreshToken,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }

  async putAuthenticationsHandler(request) {
    try {
      this._validator.validatePut(request.payload);
      const { refreshToken } = request.payload;
      await this._service.verifyRefreshToken(refreshToken);
      const { id } = this._tokenManager.verifyRefreshToken(refreshToken);
      const accessToken = this._tokenManager.generateRefreshToken({ id });
      return {
        status: 'success',
        data: {
          accessToken,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async deletetAuthenticationsHandler(request) {
    try {
      this._validator.validateDelete(request.payload);
      const { refreshToken } = request.payload;
      await this._service.verifyRefreshToken(refreshToken);
      await this._service.deleteRefreshToken(refreshToken);
      return {
        status: 'success',
        message: 'berhasil hapus token',
      };
    } catch (error) {
      return error;
    }
  }
}

module.exports = AuthenticationHandler;

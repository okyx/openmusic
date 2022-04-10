class UserHandler {
  constructor(userService, userValidator) {
    this._service = userService;
    this._validator = userValidator;
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validatePost(request.payload);
      const result = await this._service.addData(request.payload);
      const response = h.response({
        status: 'success',
        data: {
          userId: result,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserHandler;

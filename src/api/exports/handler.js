class ExportsHandler {
  constructor(service, validator, playlistService) {
    this._service = service;
    this._validator = validator;
    this._playlistService = playlistService;
    this.postExportsHandler = this.postExportsHandler.bind(this);
  }

  async postExportsHandler(request, h) {
    try {
      this._validator.validatePost(request.payload);
      const { playlistId } = request.params;
      const { id } = request.auth.credentials;
      const { targetEmail } = request.payload;
      await this._playlistService.verifyPlaylistId(playlistId, id);
      const message = {
        playlistId,
        id,
        targetEmail,
      };
      await this._service.sendMessage('exports', JSON.stringify(message));
      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ExportsHandler;

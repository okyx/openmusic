class CollaborationHandler {
  constructor(service, validator, playlistService, userService) {
    this._service = service;
    this._validator = validator;
    this._playlistService = playlistService;
    this._userService = userService;
    this.postCollaboration = this.postCollaboration.bind(this);
    this.deleteCollaboration = this.deleteCollaboration.bind(this);
  }

  async postCollaboration(request, h) {
    try {
      this._validator.validatePost(request.payload);
      const { playlistId, userId } = request.payload;
      const { id: ownerId } = request.auth.credentials;
      await this._playlistService.verifyPlaylistId(playlistId, ownerId);
      await this._userService.verifyUserId(userId);
      const collaborationId = await this._service.addCollaboration({ playlistId, userId });
      const response = h.response({
        status: 'success',
        data: {
          collaborationId,
        },
      });
      response.code(201);
      return response;
    } catch (err) {
      return err;
    }
  }

  async deleteCollaboration(request) {
    try {
      this._validator.validateDelete(request.payload);
      const { playlistId, userId } = request.payload;
      const { id: ownerId } = request.auth.credentials;
      await this._playlistService.verifyPlaylistId(playlistId, ownerId);
      await this._service.deleteCollaboration({ playlistId, userId });
      return {
        status: 'success',
        message: 'berhasil hapus collaborations',
      };
    } catch (err) {
      return err;
    }
  }
}
module.exports = CollaborationHandler;

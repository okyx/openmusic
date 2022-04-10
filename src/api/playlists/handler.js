class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postPlaylist = this.postPlaylist.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
  }

  async postPlaylist(request, h) {
    try {
      this._validator.validatePost(request.payload);
      const { id: userId } = request.auth.credentials;
      const { name } = request.payload;
      const playlistId = await this._service.addPlaylist({ userId, name });
      const response = h.response({
        status: 'success',
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;
    } catch (err) {
      return err;
    }
  }

  async getPlaylists(request) {
    const { id } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(id);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylist(request) {
    try {
      const { id } = request.params;
      const { id: userId } = request.auth.credentials;
      await this._service.verifyPlaylistId(id, userId);
      await this._service.deletePlaylist(id);
      return {
        status: 'success',
        message: 'berhasil hapus',
      };
    } catch (err) {
      return err;
    }
  }
}
module.exports = PlaylistHandler;

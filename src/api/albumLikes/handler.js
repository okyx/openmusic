const NotFoundError = require('../../exceptions/ClientError/NotFoundError');

class AlbumLikesHandler {
  constructor(service, albumsService, cacheService) {
    this._service = service;
    this._albumService = albumsService;
    this._cacheService = cacheService;
    this.postAlbumLikeshandler = this.postAlbumLikeshandler.bind(this);
    this.getAlbumLikeshandler = this.getAlbumLikeshandler.bind(this);
  }

  async postAlbumLikeshandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;
    try {
      await this._albumService.getAlbumById(albumId);
      await this._service.addLikes(userId, albumId);
      this._cacheService.delete(`albums:${albumId}`);
      const response = h.response({
        status: 'success',
        message: 'berhasil like',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof NotFoundError) {
        return error;
      }
      try {
        await this._service.deleteLikes(userId, albumId);
        this._cacheService.delete(`albums:${albumId}`);
        const response = h.response({
          status: 'success',
          message: 'berhasil dislike',
        });
        response.code(201);
        return response;
      } catch {
        return error;
      }
    }
  }

  async getAlbumLikeshandler(request, h) {
    const { id: albumId } = request.params;
    try {
      const likes = parseInt(await this._cacheService.get(`albums:${albumId}`), 10);
      const response = h.response({
        status: 'success',
        data: {
          likes,
        },
      });
      response.header('X-Data-Source', 'cache');
      return response;
    } catch {
      try {
        await this._albumService.getAlbumById(albumId);
        const likes = parseInt(await this._service.getLike(albumId), 10);
        await this._cacheService.set(`albums:${albumId}`, likes);
        return {
          status: 'success',
          data: {
            likes,
          },
        };
      } catch (error) {
        return error;
      }
    }
  }
}

module.exports = AlbumLikesHandler;

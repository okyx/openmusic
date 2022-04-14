class AlbumHandler {
  constructor(service, validator, uploadValidator, storageService) {
    this._service = service;
    this._validator = validator;
    this._uploadValidator = uploadValidator;
    this._storageService = storageService;
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    this.postCoverAlbumHandler = this.postCoverAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      this._validator.validateAlbum(request.payload);
      const albumId = await this._service.addAlbum(request.payload);
      const response = h.response({
        status: 'success',
        data: {
          albumId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const album = await this._service.getAlbumById(id);
      const response = h.response({
        status: 'success',
        data: {
          album,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  }

  async putAlbumByIdHandler(request) {
    try {
      const { id } = request.params;
      this._validator.validateAlbum(request.payload);
      await this._service.editAlbumById(id, request.payload);
      return {
        status: 'success',
        message: 'sukses edit',
      };
    } catch (error) {
      return error;
    }
  }

  async deleteAlbumByIdHandler(request) {
    try {
      const { id } = request.params;
      await this._service.deleteAlbumById(id);
      return {
        status: 'success',
        message: 'sukses delete',
      };
    } catch (error) {
      return error;
    }
  }

  async postCoverAlbumHandler(request, h) {
    try {
      const { id } = request.params;
      const { cover } = request.payload;
      this._uploadValidator.imageValidator(cover.hapi.headers);
      const filename = await this._storageService.writeFile(cover, cover.hapi);
      const path = `http://${process.env.HOST}:${process.env.PORT}/albums/images/${filename}`;
      await this._service.editCoverById(path, id);
      const response = h.response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }
}
module.exports = AlbumHandler;

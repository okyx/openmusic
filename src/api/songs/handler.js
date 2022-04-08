class songsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validateSong(request.payload);
      const songId = await this._service.addSong(request.payload);
      const response = h.response({
        status: 'success',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getSongsHandler(request) {
    const { title, performer } = request.query;
    const query = { title, performer };
    const songs = await this._service.getSongs(query);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    try {
      const { id } = request.params;
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      return error;
    }
  }

  async putSongByIdHandler(request) {
    try {
      this._validator.validateSong(request.payload);
      const { id } = request.params;
      await this._service.putSongById(id, request.payload);
      return {
        status: 'success',
        message: 'berhasil edit',
      };
    } catch (error) {
      return error;
    }
  }

  async deleteSongByIdHandler(request) {
    try {
      const { id } = request.params;
      await this._service.deleteSongById(id, request.payload);
      return {
        status: 'success',
        message: 'berhasil edit',
      };
    } catch (error) {
      return error;
    }
  }
}
module.exports = songsHandler;

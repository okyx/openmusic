class PlaylistsSonghandler {
  constructor(service, validator, playlistService, songService, activitiesService) {
    this._service = service;
    this._validator = validator;
    this._playlistService = playlistService;
    this._songService = songService;
    this._activitesService = activitiesService;
    this.postPlaylistSong = this.postPlaylistSong.bind(this);
    this.getPlaylistSongs = this.getPlaylistSongs.bind(this);
    this.deletePlaylistSong = this.deletePlaylistSong.bind(this);
  }

  async postPlaylistSong(requrest, h) {
    try {
      this._validator.validatePost(requrest.payload);
      const { id: playlistId } = requrest.params;
      const { id: userId } = requrest.auth.credentials;
      await this._playlistService.userHaveAccess(playlistId, userId);
      const { songId } = requrest.payload;
      await this._songService.getSongById(songId);
      await this._service.addPlaylistSong({ playlistId, songId });
      const passedDataForActivities = {
        playlistId,
        songId,
        userId,
        action: 'add',
      };
      this._activitesService.addActivites(passedDataForActivities);
      const response = h.response({
        status: 'success',
        message: 'berhasil input',
      });
      response.code(201);
      return response;
    } catch (err) {
      return err;
    }
  }

  async getPlaylistSongs(requrest) {
    try {
      const { id: playlistId } = requrest.params;
      const { id: userId } = requrest.auth.credentials;
      await this._playlistService.userHaveAccess(playlistId, userId);
      const getPlaylist = await this._playlistService.getPlaylistsByPlaylistId(playlistId);
      const songs = await this._service.getPlaylistsSong(playlistId);
      const playlist = {
        ...getPlaylist,
        songs,
      };
      return {
        status: 'success',
        data: {
          playlist,
        },
      };
    } catch (err) {
      return err;
    }
  }

  async deletePlaylistSong(requrest) {
    try {
      this._validator.validateDelete(requrest.payload);
      const { id: playlistId } = requrest.params;
      const { songId } = requrest.payload;
      const { id: userId } = requrest.auth.credentials;
      await this._playlistService.userHaveAccess(playlistId, userId);
      await this._service.deletePlaylistSong({ playlistId, songId });
      const passedDataForActivities = {
        playlistId,
        songId,
        userId,
        action: 'delete',
      };
      this._activitesService.addActivites(passedDataForActivities);
      return {
        status: 'success',
        message: 'berhasil hapus',
      };
    } catch (err) {
      return err;
    }
  }
}

module.exports = PlaylistsSonghandler;

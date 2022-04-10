class ActivitesHandler {
  constructor(service, playlistService) {
    this._service = service;
    this._playService = playlistService;
    this.getActivities = this.getActivities.bind(this);
  }

  async getActivities(request) {
    try {
      const { id: playlistId } = request.params;
      const { id: userId } = request.auth.credentials;
      await this._playService.userHaveAccess(playlistId, userId);
      const activities = await this._service.getActivites(playlistId);
      return {
        status: 'success',
        data: {
          playlistId,
          activities,
        },
      };
    } catch (err) {
      return err;
    }
  }
}

module.exports = ActivitesHandler;

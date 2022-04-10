const PlaylistsSonghandler = require('./handler');
const routes = require('./routes');

const plugin = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, {
    service, validator, playlistService, songService, activitiesService,
  }) => {
    const playlistsSonghandler = new PlaylistsSonghandler(
      service,
      validator,
      playlistService,
      songService,
      activitiesService,
    );
    server.route(routes(playlistsSonghandler));
  },
};

module.exports = plugin;

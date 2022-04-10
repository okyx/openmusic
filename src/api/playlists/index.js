const PlaylistHandler = require('./handler');
const routes = require('./routes');

const plugin = {
  name: 'playlist',
  varsion: '1.0.0',
  register: (server, { service, validator }) => {
    const playlistHandler = new PlaylistHandler(service, validator);
    server.route(routes(playlistHandler));
  },
};
module.exports = plugin;

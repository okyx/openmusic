const routes = require('./routes');
const CollaborationHandler = require('./handler');

const plugin = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server, {
    service, validator, playlistService, userService,
  }) => {
    const collaborationsHandler = new CollaborationHandler(
      service,
      validator,
      playlistService,
      userService,
    );
    server.route(routes(collaborationsHandler));
  },
};

module.exports = plugin;

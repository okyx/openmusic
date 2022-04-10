const ActivitiesHandler = require('./handler');
const routes = require('./routes');

const plugin = {
  name: 'activities',
  version: '1.0.0',
  register: async (server, { service, playlistService }) => {
    const activities = new ActivitiesHandler(service, playlistService);
    server.route(routes(activities));
  },
};

module.exports = plugin;

const AuthenticationHandler = require('./handler');
const routes = require('./routes');

const plugin = {
  name: 'authentications',
  version: '1.0.0',
  register: (server, {
    service, validator, userService, tokenManager,
  }) => {
    const authenticationHandler = new AuthenticationHandler(
      service,
      validator,
      userService,
      tokenManager,
    );
    server.route(routes(authenticationHandler));
  },
};

module.exports = plugin;

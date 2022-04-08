require('dotenv').config();
const Hapi = require('@hapi/hapi');
const extensions = require('../extensions');
const routess = require('./Allroutes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register(routess);
  server.ext('onPreResponse', extensions.onPreResponse);
  await server.start();
  console.log(`Running on port ${server.info.uri}`);
};

init();

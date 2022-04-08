const extensions = {
  onPreResponse: (request, h) => {
    const { response } = request;
    if (response instanceof Error) {
      const newResponse = h.response({
        status: response.status,
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }
    return response.continue || response;
  },
};

module.exports = extensions;

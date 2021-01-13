const url = require('url');


class Router {
  #io; //fica private
  constructor(io) {
    this.#io;
  }

  async post(request, response) {
    const { headers } = request;
    const {query:{ socketId }} = url.parse(request.url, true);


    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9);
    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9)
    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9)
    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9)
    this.#io.to(socketId).emit(ON_UPLOAD_EVENT, 5e9)
    const onFinish = (request, redirecTo) => {
      response.writeHead(303, {
        Connection: "close",
        Location: `${redirecTo}?msg=File Uploaded with success`,
      });
      request.end();
    };

    return onFinish(response, headers.origin);
  }
}

module.exports = Router;

export default class ServerModel {
  constructor() {
    this.port = undefined;
    this.routes = [];
    this.middlewares = [];
    this.http = false;
  }

  setPort(port) {
    this.port = port;
  }

  setRoutes(routes) {
    this.routes = routes;
  }

  setMiddlewares(middlewares) {
    this.middlewares = middlewares;
  }

  setHttp(http) {
    this.http = http;
  }
}

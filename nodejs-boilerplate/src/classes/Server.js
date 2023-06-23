import express from "express";

export default class Server {
  constructor(port, routes, middlewares) {
    this.app = express();

    this.init();
    this.useMiddlewares(middlewares);
    this.addRoutes(routes);
    this.listenServer(port);
  }

  init() {
    // initialize stuff here
  }

  useMiddlewares(middlewares) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  addRoutes(routes) {
    routes.forEach((route) => {
      const { path, method, handler } = route;
      this.app[method](path, handler);
    });
  }

  listenServer(port) {
    this.app.listen(port, () => console.log(`Server started on port ${port}`));
  }
}

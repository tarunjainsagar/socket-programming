import express from "express";
import { createServer } from "http";

export default class Server {
  constructor(serverModel) {
    this.http = serverModel.http;
    this.app = express();
    if (this.http) {
      this.server = createServer(this.app);
    }

    this.useMiddlewares(serverModel.middlewares);
    this.addRoutes(serverModel.routes);
    this.listenServer(serverModel.port);
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
    if (port !== undefined) {
      if (this.http === true) {
        this.server.listen(port, () =>
          console.log(`Http Server started on port ${port}`)
        );
      } else {
        this.app.listen(port, () =>
          console.log(`Express Server started on port ${port}`)
        );
      }
    }
  }
}

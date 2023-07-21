import { injectable, inject } from "tsyringe";

@injectable()
export default class ServerModel {
  constructor(@inject("Config") config) {
    this.port = config.port;
    this.routes = config.routes;
    this.middlewares = config.middlewares;
    this.http = config.http;
  }
}

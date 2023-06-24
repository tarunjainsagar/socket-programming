export default class SocketIoModel {
  constructor() {
    this.server = undefined;
    this.events = [];
  }

  setServer(server) {
    this.server = server;
  }

  setEvents(events) {
    this.events = events;
  }
}

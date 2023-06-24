import { Server } from "socket.io";

export default class SocketIo {
  constructor(socketIoModel) {
    this.io = new Server(socketIoModel.server, {});
    this.addEvents(socketIoModel.events);
  }

  addEvents(events) {
    this.io.on("connection", (socket) => {
      console.log("A user connected");

      for (const event of events) {
        const { eventOwner, eventType, eventName, handler } = event;
        this[eventOwner][eventType](
          eventName,
          handler.bind(
            // If handler needs current object, pass this
            null,
            // Pass current socket to handler
            socket
          )
        );
      }
    });
  }
}

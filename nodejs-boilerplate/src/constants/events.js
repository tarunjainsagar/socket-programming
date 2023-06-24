const events = [
  {
    eventOwner: "io",
    eventType: "emit",
    eventName: "ioEvent",
    handler: (socket, data) => {
      console.log("Custom handler for ioEvent:", data);
      // You can use the `socket` object here if needed
    },
  },
  {
    eventOwner: "socket",
    eventType: "on",
    eventName: "message",
    handler: (socket, data) => {
      console.log("Custom handler for message:", data);
      // You can use the `socket` object here if needed
    },
  },
];

export { events };

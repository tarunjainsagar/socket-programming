import dotenv from "dotenv";
import Server from "./classes/Server.js";
import SocketIo from "./classes/SocketIo.js";
import ServerModel from "./model/ServerModel.js";
import SocketIoModel from "./model/SocketIoModel.js";
import { routes } from "./constants/routes.js";
import { events } from "./constants/events.js";
import { middlewares } from "./constants/middlewares.js";

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 3000;

// Initialize Server parameters
const serverObj = new ServerModel();
serverObj.setPort(port);
serverObj.setMiddlewares(middlewares);
serverObj.setRoutes(routes);
serverObj.setHttp(true);

// Create Server
const server = new Server(serverObj);

// Create Socket
const socketObj = new SocketIoModel();
socketObj.setServer(server);
socketObj.setEvents(events);
const io = new SocketIo(socketObj);

import dotenv from "dotenv";
import Server from "./classes/Server.js";
import { routes } from "./constants/routes.js";
import { middlewares } from "./constants/middlewares.js";

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 3000;

const server = new Server(port, routes, middlewares);

import "reflect-metadata";
import { container } from "tsyringe";
import ServerModel from "./model/ServerModel.js";

const serverModel = container.resolve(ServerModel);
console.log(serverModel);

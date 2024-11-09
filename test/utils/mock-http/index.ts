import { setupServer } from "msw/node";
import baseHandlers from "./base.mock";
import userHandlers from "./user.mock";

const mergeHandlers = [...baseHandlers, ...userHandlers];

const server = setupServer(...mergeHandlers);

server.listen();

export default server;

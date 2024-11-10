import { setupServer } from "msw/node";
import baseHandlers from "./base.mock";
import userHandlers, { onResetData } from "./user.mock";

const mergeHandlers = [...baseHandlers, ...userHandlers];

const server = setupServer(...mergeHandlers);

server.listen();

const resetHandlers = () => {
  onResetData();
  server.resetHandlers(...mergeHandlers);
};
export { resetHandlers };
export default server;

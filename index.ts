import request, { create, requestFactor } from "./src/request";
import Request from "./src/core/RequestCore";
import fetchMiddleware from "./src/middlewares/fetchMiddleware";
import parseResponseMiddleware from "./src/middlewares/parseResponseMiddleware";
import simpleGetNiddleware from "./src/middlewares/simpleGetMiddleware";
import simplePostMiddleware from "./src/middlewares/simplePostMiddleware";

export {
  create,
  requestFactor,
  fetchMiddleware,
  parseResponseMiddleware,
  simpleGetNiddleware,
  simplePostMiddleware,
  Request,
};
export default request;

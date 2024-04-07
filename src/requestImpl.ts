import Request from "./core/Request";
import fetchMiddleware from "./middlewares/fetchMiddleware";
import parseResponseMiddleware from "./middlewares/parseResponseMiddleware";
import simpleGetNiddleware from "./middlewares/simpleGetMiddleware";
import simplePostMiddleware from "./middlewares/simplePostMiddleware";
import { Options } from "./types";

const requestImplement = (config: Options) => {
  const instance = new Request(config, [
    simpleGetNiddleware,
    simplePostMiddleware,
    parseResponseMiddleware,
    fetchMiddleware,
  ]);
  return instance;
};

export default requestImplement;

import Interceptor from "./core/Interceptor";

export type RequestType = "json" | "form";
export type ResponseType =
  | "json"
  | "text"
  | "blob"
  | "arrayBuffer"
  | "formData";

export type Method =
  | "get"
  | "post"
  | "delete"
  | "put"
  | "patch"
  | "head"
  | "options"
  | (string & {});

export interface Options extends RequestInit {
  baseURL?: string;
  url?: string;
  data?: any;
  params?: any;
  method?: Method;
  timeout?: number;
  // headers?: Headers;
  requestType?: RequestType;
  responseType?: ResponseType;
  [key: string]: any;
}

export interface Context<T = any> {
  data: T;
  config: Options;
  request: Request;
  response: Response;
}

export type MiddlewareType = (
  context: any,
  next: () => Promise<void>
) => Promise<void>;

export interface RequestMethodType {
  (options?: Options): Promise<any>;
  interceptors: {
    request: Interceptor<Options>;
    response: Interceptor<Options>;
  };
  get: (url: string, options?: Options) => Promise<any>;
  post: (url: string, options?: Options) => Promise<any>;
  put: (url: string, options?: Options) => Promise<any>;
  delete: (url: string, options?: Options) => Promise<any>;
  patch: (url: string, options?: Options) => Promise<any>;
  head: (url: string, options?: Options) => Promise<any>;
  options: (url: string, options?: Options) => Promise<any>;
}

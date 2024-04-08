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
  basicUrl?: string;
  url?: string;
  data?: any;
  params?: any;
  method?: Method;
  timeout?: number;
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

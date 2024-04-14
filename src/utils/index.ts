import { Options } from "../types";

export class RequestError {
  [x: string]: any;
  constructor(
    public name: string,
    public message: string,
    options?: Partial<Options>
  ) {
    this.stack = new Error().stack;
    Object.keys(options ?? {}).forEach((key) => {
      this[key] = options?.[key];
    });
  }
}

/**
 * 安全的JSON.parse
 */
export function safeJsonParse(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    // if (throwErrIfParseFail) {
    //   throw new ResponseError(
    //     response,
    //     "JSON.parse fail",
    //     data,
    //     request,
    //     "ParseError"
    //   );
    // }
  } // eslint-disable-line no-empty
  return data;
}

export const timeoutToThrow = (
  millisecond: number,
  context: Options
): Promise<any> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new RequestError("Timeout", `timeout of ${millisecond}ms exceeded`, {
          config: context,
        })
      );
    }, millisecond);
  });
};

export const mergeConfig = (
  initialConfig: Options,
  config: Options
): Options => {
  const {
    headers: initialHeaders,
    params: initialParams,
    data: initialData,
    ...restInitialConfig
  } = initialConfig;
  const { headers, params, data, ...restConfig } = config;

  const mergeHeader =
    initialHeaders || headers
      ? {
          headers: {
            ...initialHeaders,
            ...headers,
          },
        }
      : {};
  const mergeParams =
    initialParams || initialParams
      ? {
          params: {
            ...initialParams,
            ...params,
          },
        }
      : {};
  const mergeData =
    initialData || data
      ? {
          data: {
            ...initialData,
            ...data,
          },
        }
      : {};

  return {
    ...restInitialConfig,
    ...restConfig,
    ...mergeHeader,
    ...mergeParams,
    ...mergeData,
  };
};

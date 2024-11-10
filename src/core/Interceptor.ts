import { RequestError } from "../utils";

export interface InterceptorStack<T = any> {
  onFullfilled?: (context: T) => T;
  onRejected?: (error: RequestError) => T;
}

class Interceptor<T = any> {
  private interceptors: InterceptorStack<T>[] = [];

  public use = (
    onFullfilled?: InterceptorStack<T>["onFullfilled"],
    onRejected?: InterceptorStack<T>["onRejected"]
  ): number => {
    this.interceptors.push({
      onFullfilled,
      onRejected,
    });

    return this.interceptors.length - 1;
  };

  public remove = (id: number) => {
    if (this.interceptors[id]) {
      this.interceptors[id] = {};
    }
  };

  public clear = () => {
    this.interceptors = [];
  };

  public forEach = (fn: (interceptor: InterceptorStack<T>) => void) => {
    this.interceptors.forEach(fn);
  };
}

export default Interceptor;

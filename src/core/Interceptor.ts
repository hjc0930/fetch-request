export interface InterceptorStack<T = any> {
  onFullfilled?: (context: T) => T;
  onRejected?: (context: T) => T;
}

class Interceptor<T = any> {
  private interceptors: InterceptorStack<T>[] = [];

  public use = (
    onFullfilled?: InterceptorStack["onFullfilled"],
    onRejected?: InterceptorStack["onRejected"]
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

  public forEach = (fn: (interceptor: InterceptorStack) => void) => {
    this.interceptors.forEach(fn);
  };
}

export default Interceptor;

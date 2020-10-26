import { BehaviorSubject, Observable } from 'rxjs';

export type LazyState = 'none' | 'loading' | 'loaded' | 'error' | 'notfound';
export const LazyState = {
  none: 'none' as LazyState,
  loading: 'loading' as LazyState,
  loaded: 'loaded' as LazyState,
  error: 'error' as LazyState,
  notfound: 'notfound' as LazyState,
};

export class LazyCache {
  private cache: {
    [key: string]: BehaviorSubject<LazyState>;
  } = {};

  add(selector: string, state: LazyState = LazyState.none): void {
    if (this.cache[selector]) {
      throw new Error(`${selector} already add`);
    }
    this.cache[selector] = new BehaviorSubject(state);
  }

  set(selector: string, state: LazyState) {
    if (!this.cache[selector]) {
      throw new Error(`${selector} not exist`);
    }
    this.cache[selector].next(state);
  }

  remove(selector: string) {
    if (!this.cache[selector]) {
      throw new Error(`${selector} not exist`);
    }
    this.cache[selector].complete();
    this.cache[selector] = null;
    delete this.cache[selector];
  }

  get(selector: string): Observable<LazyState> {
    if (!this.cache[selector]) {
      throw new Error(`${selector} not exist`);
    }
    return this.cache[selector].asObservable();
  }

  has(selector: string): boolean {
    return !!this.cache[selector];
  }
}

export const LAZY_CACHE = new LazyCache();

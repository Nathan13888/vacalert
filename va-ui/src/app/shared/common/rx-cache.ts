import {
  ConnectableObservable,
  Observable,
  ReplaySubject,
  throwError
} from 'rxjs';
import { catchError, multicast, publishReplay, refCount } from 'rxjs/operators';

const DEFAULT_MAX_AGE = 300000;
const globalCache: { [key: string]: CacheEntry<any> } = {};

interface CacheEntry<T> {
  expiry: number;
  observable: Observable<T>;
}

export function cache(key: string, maxAge: number = DEFAULT_MAX_AGE) {
  return function cacheOperatorImpl<T>(source: Observable<T>) {
    return Observable.create(observer => {
      const cached = globalCache[key];
      if (cached && cached.expiry >= Date.now()) {
        cached.observable.subscribe(observer);
      } else {
        const add = source.pipe(
          multicast(new ReplaySubject(1))
        ) as ConnectableObservable<T>;
        globalCache[key] = { observable: add, expiry: Date.now() + maxAge };
        add.connect();
        add
          .pipe(
            catchError(err => {
              delete globalCache[key];
              return throwError(err);
            })
          )
          .subscribe(observer);
      }
    });
  };
}

export function clearCache(key: string) {
  delete globalCache[key];
}

// export function cache(obs: Observable<any>): Observable<any> {
//   return obs.pipe(publishReplay(1), refCount());
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: { [url: string]: any } = {};

  constructor(private http: HttpClient) {}

  getCachedOrFetch<T>(url: string): Observable<T> {
    if (this.cache[url]) {
      // console.log('Returning cached response for', url);
      return of(this.cache[url] as T);
    } else {
      // console.log('Fetching from network for', url);
      return this.http.get<T>(url).pipe(
        tap((response) => {
          // console.log('Response received from network for', url);
          this.cache[url] = response;
        }),
        catchError((error) => {
          console.error('Error fetching data for', url, error);
          return EMPTY; 
        })
      );
    }
  }
}

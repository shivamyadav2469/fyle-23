import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private cache = new Map<string, any>();

  constructor(private httpClient: HttpClient) {}

  getWithCache<T>(url: string, params?: any): Observable<T> {
    const key = this.generateCacheKey(url, params);
    const cachedResponse = this.cache.get(key);

    if (cachedResponse) {
      // console.log(`Cache hit for URL: ${url}`);
      return of(cachedResponse);
    }

    const httpParams = new HttpParams({ fromObject: params });

    return this.httpClient.get<T>(url, { params: httpParams })
      .pipe(
        tap(response => {
          // console.log(`Adding response to cache for URL: ${url}`);
          this.cache.set(key, response);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            console.error('API rate limit exceeded. Please try again later.');
          }
          return throwError(error); 
        })
      );
  }

  getData(): Observable<any> {
    const url = "https://api.github.com/users";
    return this.getWithCache<any>(url);
  }

  getRepos(userId: string, page: number, perPage: number): Observable<any> {
    const url = `https://api.github.com/users/${userId}/repos`;
    return this.httpClient.get<any>(url, { params: { page: page.toString(), per_page: perPage.toString() } });
  }

  getName(userId: string): Observable<any> {
    const url = `https://api.github.com/users/${userId}`;
    return this.getWithCache<any>(url);
  }

  getLanguages(repoName: string, userId: string): Observable<any> {
    const url = `https://api.github.com/repos/${userId}/${repoName}/languages`;
    return this.getWithCache<any>(url);
  }

  private generateCacheKey(url: string, params: any): string {
    return `${url}-${JSON.stringify(params)}`;
  }
}

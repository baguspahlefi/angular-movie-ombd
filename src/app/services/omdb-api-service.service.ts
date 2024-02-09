import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
HttpClient;

@Injectable({
  providedIn: 'root',
})
export class OmdbApiServiceService {

  opts: any[] = [];

  constructor(private http: HttpClient) {}
  baseUrl = 'https://www.omdbapi.com'; 
  APIKey = '715289b';

  getListHome(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/?apikey=${this.APIKey}&s=Batman&page=1`
    );
  }

  getSearchMovie(data: { movieName: string; page?: number }): Observable<any> {
    const pageParam = data.page ? `&page=${data.page}` : '';
    return this.http.get(
      `${this.baseUrl}/?apikey=${this.APIKey}&s=${data.movieName}${pageParam}`
    );
  }

  getMovieDetail(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/?apikey=${this.APIKey}&i=${data}`);
  }

  getData(): Observable<any[]> {
    return this.opts.length
      ? of(this.opts)
      : this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(
          map((data) => {
            this.opts = data;
            return data;
          }),
          catchError((error) => {
            console.error('Error fetching data:', error);
            return of([]);
          })
        );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpClient

@Injectable({
  providedIn: 'root'
})
export class OmdbApiServiceService {

  constructor(private http : HttpClient) { }
  baseUrl = 'https://www.omdbapi.com'; // Tambahkan "https://" pada baseUrl
  APIKey = '715289b';

  getListHome(): Observable<any> {
    return this.http.get(`${this.baseUrl}/?apikey=${this.APIKey}&s=Batman&page=1`);
  }

  getSearchMovie(data: { movieName: string, page?: number }): Observable<any> {
    const pageParam = data.page ? `&page=${data.page}` : '';
    return this.http.get(`${this.baseUrl}/?apikey=${this.APIKey}&s=${data.movieName}${pageParam}`);
  }

  getMovieDetail(data : any):Observable<any>{
    return this.http.get(`${this.baseUrl}/?apikey=${this.APIKey}&i=${data}`);
  }
  
}

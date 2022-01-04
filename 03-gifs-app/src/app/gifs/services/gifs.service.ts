import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '0tDBx88XFdm5QbNl7WLXkM2eWHKu810o';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if( !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)
    ;

    this.http.get<SearchGifsResponse>(`${this.baseUrl}/search`, { params })
      .subscribe( resp => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}



  /* SEARCH USING FETCH WITH PROMISES
  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0,10);
    }
    this.finalUrl = `${this.baseUrl}?api_key=${this.apiKey}&q=${query}&limit=10`;
    fetch(this.finalUrl)
      .then(resp => {
        resp.json().then(data => {
          console.log(data); 
        });
      });
  } 
  */

  /* SEARCH USING ASYNC AWAIT
  async buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this.historial.splice(0,10);
    }
    this.finalUrl = `${this.baseUrl}?api_key=${this.apiKey}&q=${query}&limit=10`;
    const resp = fetch(this.finalUrl);
    const data = resp.json();
    console.log(data);
  }
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisLite } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl: string = 'https://restcountries.com/v2';
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[] {
    return [ ...this._regiones ];
  }

  constructor( private http:HttpClient ) { }

  getPaisesPorRegion(region: string): Observable<PaisLite[]> {
    const url: string = `${ this.baseUrl }/region/${ region }?fields=alpha3Code,name`;
    return this.http.get<PaisLite[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<Pais | null> {

    if (!codigo) return of(null);
  
    const url: string = `${ this.baseUrl }/alpha/${ codigo }`;
    return this.http.get<Pais>(url);
  }

  getPaisLitePorCodigo(codigo: string): Observable<PaisLite> {
    const url: string = `${ this.baseUrl }/alpha/${ codigo }?fields=alpha3Code,name`;
    return this.http.get<PaisLite>(url);
  }

  getPaisesLitePorBorders(borders: string[]): Observable<PaisLite[]> {

    if (!borders) return of([]);

    const peticiones: Observable<PaisLite>[] = [];

    borders.forEach( border => {
      const peticion = this.getPaisLitePorCodigo(border);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
    
  }

}

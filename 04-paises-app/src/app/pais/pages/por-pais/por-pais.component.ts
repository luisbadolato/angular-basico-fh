import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent {

  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor( private paisService: PaisService ) { }

  buscar(termino:string): void {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(termino)
      .subscribe({ 
        next: resp => {
          console.log(resp);
          this.paises = resp;
        },
        error: err => {
          this.hayError = true;
          this.paises = [];
        }      
      });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarPais(termino)
      .subscribe({
        next: (paises) => this.paisesSugeridos = paises.splice(0, 5),
        error: () => this.paisesSugeridos = []
      });
  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }

}

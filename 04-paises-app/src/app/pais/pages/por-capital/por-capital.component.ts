import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent {


  termino: string = "";
  hayError: boolean = false;
  paises: Country[] = [];

  constructor( private paisService: PaisService ) { }

  buscar(termino:string): void {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarCapital(termino)
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

}

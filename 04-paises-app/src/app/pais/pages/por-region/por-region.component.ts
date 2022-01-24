import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent {

  regiones: string[] = [ 'africa', 'americas', 'asia', 'europe', 'oceania' ];
  regionActiva: string = '';
  paisesRegion: Country[] = [];

  constructor( private paisService: PaisService ) { }

  getClaseCSS(region: string):string {
    return (this.regionActiva === region) 
      ? 'btn me-2 pb-2 btn-primary' 
      : 'btn me-2 pb-2 btn-outline-primary';
  }

  activarRegion(region: string) {
    if (region === this.regionActiva) return;
    this.regionActiva = region;
    this.paisesRegion = [];
    this.paisService.buscarRegion(region)
      .subscribe(paises => this.paisesRegion = paises);
  }

}

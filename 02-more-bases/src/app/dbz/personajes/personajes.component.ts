import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css']
})
export class PersonajesComponent {

  get personajes() {
    return this.dbzService.personajes;
  }

  // personajes: Personaje[] = [];

  constructor( private dbzService: DbzService ) {
    // this.personajes = this.dbzService.personajes; 
  }

}

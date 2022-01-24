import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-no-comunes',
  templateUrl: './no-comunes.component.html',
  styleUrls: ['./no-comunes.component.css']
})
export class NoComunesComponent  {

  // i18nSelect
  nombre: string = 'Fernando';
  genero: string = 'masculino';
  invitacionMap = {
    'masculino': 'invitarlo al evento de SEÑOROS.',
    'femenino': 'invitarla al evento de SEÑORAS.'
  }

  // i18nPlural
  _clientes: string[] = [
    'María',
    'Manuel',
    'Ricardo',
    'Silvia',
    'Gema',
    'Lola',
    'Pedro'
  ];

  get clientes(): string[] {
    return [...this._clientes];
  }

  clientesMapa = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    'other': 'tenemos # clientes esperando.'
  }

  cambiarGenero(): void {
    if (this.genero === 'masculino') {
      this.nombre = 'Fernanda',
      this.genero = 'femenino'
    } else {
      this.nombre = 'Fernando',
      this.genero = 'masculino'
    }
  }

  borrarPrimerCliente(): void {
    if (this._clientes.length > 0) {
      this._clientes.shift();
    }
  }

  // KeyValue Pipe
  persona = {
    nombre: 'Ricardito',
    edad: 57,
    direccion: 'Ottawa, Canada'
  };

  // Json Pipe
  heroes = [
    {
      nombre: "Superman",
      vuela: true
    },
    {
      nombre: "Batman",
      vuela: false
    },
    {
      nombre: "Catgirl",
      vuela: false
    },
    {
      nombre: "Capitana Marvel",
      vuela: true
    },
  ];

  // Async Pipe
  miObservable: Observable<number> = interval(2000);

  valorPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve( 'Tenemos data de Promesa');
    }, 3500);
  });

}

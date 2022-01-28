import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent {
  
  nuevoJuego: string = '';

  persona: Persona = {
    nombre: 'Ricardito',
    favoritos: [
      { id: 1, nombre: 'Metal Gear' },
      { id: 2, nombre: 'Silent Hill' },
      { id: 3, nombre: 'Resident Evil' },
    ]
  }

  agregar(): void {
    if (!this.nuevoJuego) return;

    const nuevoFavorito = {
      id: (this.persona.favoritos[this.persona.favoritos.length-1]?.id + 1) || 1,
      nombre: this.nuevoJuego
    };

    this.persona.favoritos.push({...nuevoFavorito});
  }

  eliminar(index: number): void {
    this.persona.favoritos.splice(index, 1);
  }

  guardar(): void {
    console.log('Form Posted');
  }

}

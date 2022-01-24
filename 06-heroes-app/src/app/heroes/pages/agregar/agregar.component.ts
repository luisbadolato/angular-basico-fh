import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC Comics Entertainment'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel Comics Media'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private snackBar: MatSnackBar,
               private dialog: MatDialog,
               private router: Router ) { }

  ngOnInit(): void {

    if ( this.router.url.includes('editar')) {
      this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe );
    }


    
  }

  guardar() {

    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id) {
      this.heroesService.editarHeroe(this.heroe)
        .subscribe( heroe => this.mostrarSnackBar('Registro Actualizado Correctamente'));
    } else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackBar('Registro Creado Correctamente');
        });
      }
    }
    
    borrar() {

      const dialog = this.dialog.open(ConfirmarComponent, {
        width: '250px',
        data: {...this.heroe}
      });

      dialog.afterClosed()
        .subscribe(result => {
          if (result) {
            this.heroesService.borrarHeroe (this.heroe.id!)
              .subscribe( resp => {
                this.router.navigate(['/heroes']);
                this.mostrarSnackBar('Registro Borrado Correctamente');
              });
          }
        });

/* 
      
 */  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });
  }

}

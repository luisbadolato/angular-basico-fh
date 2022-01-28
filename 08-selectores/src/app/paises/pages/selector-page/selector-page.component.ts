import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap, tap } from 'rxjs';

import { PaisesService } from '../../services/paises.service';
import { Pais, PaisLite } from '../../interfaces/paises.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region  : [ '', Validators.required ],
    pais    : [ '', Validators.required ],
    frontera: [ '', Validators.required ],
  })

  // populate select options
  regiones       : string[]    = [];
  paises         : PaisLite[]  = [];
  fronteras      : PaisLite[]  = [];
  paisFronterizo : Pais | null = null;

  // UI
  cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    // Cambio de Region
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.myForm.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( region => {
          return this.paisesService.getPaisesPorRegion(region);
        })
      )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
      });
  
    // Cambio de Pais
    this.myForm.get('pais')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.cargando = true;
          this.fronteras = [];
          this.myForm.get('frontera')?.reset('');
        }),
        switchMap( codigo => this.paisesService.getPaisPorCodigo(codigo)),
        switchMap( pais => this.paisesService.getPaisesLitePorBorders(pais?.borders!))
      )
      .subscribe( paises => {
        this.fronteras = paises;
        this.cargando = false;
      });

    // Cambio de Frontera
    this.myForm.get('frontera')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.paisFronterizo = null;
        }),
        switchMap( codigo => {
          return this.paisesService.getPaisPorCodigo(codigo);
        })
      )
      .subscribe( paisFronterizo => {
        this.paisFronterizo = paisFronterizo;
      });
  }

  submit() {
    console.log(this.myForm.value);
  }

}

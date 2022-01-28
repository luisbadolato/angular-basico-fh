import { Component, NgIterable, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css']
})
export class DinamicosComponent implements OnInit {

  myForm: FormGroup = this.formBuilder.group({
    nombre: [ null, [ Validators.required, Validators.minLength(3) ] ],
    favoritos: this.formBuilder.array( [
      ['Metal Gear', Validators.required ],
      ['Death Stranding', Validators.required ]
    ], Validators.required )
  })

  nuevoFavorito: FormControl = this.formBuilder.control('', Validators.required);

  get favoritosArray() {
    return this.myForm.get('favoritos') as FormArray;
  }

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
  }

  validarCampo(campo: string): boolean { 

    return this.myForm.controls[campo]?.errors
        && this.myForm.controls[campo]?.touched
        || false;
  }

  agregarFavorito(): void {
    if (this.nuevoFavorito.invalid) return;
    
    // this.favoritosArray.push( new FormControl( this.nuevoFavorito.value, Validators.required ) ); LO MISMO ABAJO
    this.favoritosArray.push( this.formBuilder.control( this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset();
  }

  eliminar(index: number): void {
    this.favoritosArray.removeAt(index);
  } 

  guardar(): void {
    console.log('Valid Form:', this.myForm.valid);

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset();
  }

}

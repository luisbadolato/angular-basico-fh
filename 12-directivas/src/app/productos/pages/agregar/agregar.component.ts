import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {

  myForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required ]
  });

  textoMensaje: string = 'El nombre es obligatorio';
  color: string = 'red';

  constructor( private fb: FormBuilder ) { }

  validarCampo(campo: string): boolean {
    return this.myForm.get(campo)?.invalid 
        // && this.myForm.controls[campo]?.touched
        || false;
  }

  cambiarMensaje(): void {
    this.textoMensaje = 'Por favor, rellena el campo';
    // this.textoMensaje = Math.random().toString();
  }

  cambiarColor() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random()*16|0).toString(16));
    this.color = color;
  }

}

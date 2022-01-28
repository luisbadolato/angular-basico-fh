import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

/*   myForm: FormGroup = new FormGroup({
    'nombre'     : new FormControl('RTX 4080ti'),
    'precio'     : new FormControl(1500),
    'existencias': new FormControl(5)
  }) */

  myForm: FormGroup = this.formBuilder.group({
    nombre     : [ null, [ Validators.required, Validators.minLength(3) ] ],
    precio     : [ null, [ Validators.required, Validators.min(0) ] ],
    existencias: [ null, [ Validators.required, Validators.min(0) ] ],
  })

  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.myForm.reset({
      nombre: 'RTX 6080ti',
      precio: 1600,
      existencias: 10
    });
  }

  validarCampo(campo: string): boolean {

    return this.myForm.controls[campo]?.errors 
        && this.myForm.controls[campo]?.touched
        || false;
  }

  guardar(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.myForm.reset();
  }

}

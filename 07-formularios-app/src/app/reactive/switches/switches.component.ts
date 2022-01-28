import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styleUrls: ['./switches.component.css']
})
export class SwitchesComponent implements OnInit {

  myForm: FormGroup = this.formBuilder.group({
    genero        : [ 'M', Validators.required ],
    notificaciones: [ false, Validators.required ],
    terminos      : [ false, Validators.requiredTrue ],
  });

  persona = {
    genero: "F",
    notificaciones: true
  }


  constructor( private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    // this.myForm.setValue( this.persona ); SetValue revienta si no se le pasan las propiedades exactas
    this.myForm.reset({ 
      ...this.persona,
      terminos: false 
    });

    // En caso de querer vincular los Switches a los valores de Persona
    this.myForm.valueChanges.subscribe( ({ terminos, ...rest }) => {
      this.persona = rest;
    });

  }

  guardar(): void {

    const formValue = { ...this.myForm.value };
    delete formValue.terminos;
    this.persona = formValue;
    console.log(formValue);

  }


}

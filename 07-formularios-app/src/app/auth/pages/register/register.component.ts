import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this.formBuilder.group({
    nombre   : [ '', [ Validators.required, Validators.pattern( this.valService.nombreApellidoPattern ) ] ],
    email    : [ '', [ Validators.required, Validators.pattern( this.valService.emailPattern ) ], [ this.emailValidator ] ],
    username : [ '', [ Validators.required, this.valService.usernameNoCordelay ] ],
    password : [ '', [ Validators.required, Validators.minLength(8) ] ],
    password2: [ '', [ Validators.required ] ],
  }, {
    validators: [ this.valService.camposIguales('password', 'password2') ]
  });

  get emailErrorMsg(): string {
    
    const errors = this.myForm.get('email')?.errors;
    if ( errors?.['required'] ) {
      return 'El email es obligatorio';
    } else if ( errors?.['pattern'] ) {
      return 'El email debe tener un formato válido';
    } else if ( errors?.['emailUsed'] ) {
      return 'El email ya tiene una cuenta asociada';
    } else {
      return '';
    }
    
  }

  constructor( private formBuilder: FormBuilder,
               private valService: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {

    this.myForm.reset({
      nombre  : 'Pepito Grillo',
      email   : 'test1@test.com',
      username: 'pepitogrillo',
      password: '12341234',
      password2: '12341234',
    });

  }

  validarCampo(campo: string): boolean {
    return this.myForm.get(campo)?.invalid
        && this.myForm.get(campo)?.touched
        || false;
  }



  crear() {
    console.log(this.myForm);
    this.myForm.markAllAsTouched();
  }

}

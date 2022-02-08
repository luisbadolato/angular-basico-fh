import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  myForm: FormGroup = this.fb.group({
    name:     ['Test1', [ Validators.required, Validators.minLength(4) ]],
    password: ['123456', [ Validators.required, Validators.minLength(6) ]],
    email:    ['test1@test.com', [ Validators.required, Validators.email ]]
  });

  constructor( private fb: FormBuilder,
               private authService: AuthService,
               private router: Router ) { }

  register() {

    const { name, email, password } = this.myForm.value;

    this.authService.register(name, email, password)
      .subscribe ( ok => {
        if (ok === true) {
          Swal.fire('Usuario creado con éxito', ok, 'success');
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', ok, 'error')
        }
      });

  }

}

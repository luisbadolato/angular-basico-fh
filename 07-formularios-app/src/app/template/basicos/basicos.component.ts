import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent implements OnInit {

  @ViewChild('myForm') myForm!: NgForm;

  initForm = {
    producto: 'RTX 5080ti',
    precio: 10,
    existencias: 10
  }

  constructor() { }

  ngOnInit(): void {
  }

  nombreValido(): boolean {
    return (
      this.myForm?.controls['producto']?.invalid &&
      this.myForm?.controls['producto']?.touched
    );
  }

  precioValido(): boolean {
    return (
      this.myForm?.controls['precio']?.touched &&
      this.myForm?.controls['precio']?.value < 0
    );
  }

  guardar(): void {
    console.log(this.myForm);
    console.log('Posteo Correcto');

    this.myForm.resetForm({
      producto: 'Coso',
      precio: 0,
      existencias: 0
    });
  }

}

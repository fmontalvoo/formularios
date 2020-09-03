import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  public formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private validators: ValidatorsService) {
    this.crearFormulario();
    this.cargaDatosFormualrio();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  public crearFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3), this.validators.noBaboso]],
      usuario: ['', Validators.required, this.validators.usuarioYaExiste],
      correo: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      pass: ['', Validators.required],
      confirm_pass: ['', Validators.required],
      direccion: this.formBuilder.group({
        calle: ['', Validators.required],
        codigo_postal: ['', Validators.required]
      }),
      pasatiempos: this.formBuilder.array([]),
    }, {
      validators: this.validators.verifyPasswords('pass', 'confirm_pass')
    });
  }

  private crearListeners() {
    // this.formulario.valueChanges.subscribe(value => {
    //   console.log(value);
    // });
    // this.formulario.statusChanges.subscribe(status => {
    //   console.log(status);
    // });
    this.formulario.get('usuario').valueChanges.subscribe(console.log);
  }

  private cargaDatosFormualrio() {
    this.formulario.setValue({
      nombre: "Fulano",
      apellido: "Detal",
      usuario: 'fulano',
      correo: "fulano@gmail.com",
      pass: "123456",
      confirm_pass: "123456",
      direccion: {
        calle: "Lamar",
        codigo_postal: "170502"
      },
      pasatiempos: []
    });
  }

  public get getPasatiempos() {
    return this.formulario.get('pasatiempos') as FormArray;
  }

  public isInValid(input: string) {
    return this.formulario.get(input).invalid && this.formulario.get(input).touched;
  }

  public isValid(input: string) {
    return this.formulario.get(input).valid;
  }

  public get confirmPassword() {
    const pass = this.formulario.get('pass');
    const confirm_pass = this.formulario.get('confirm_pass');

    return (pass === confirm_pass) ? true : false;
  }

  public addPasatiempo() {
    this.getPasatiempos.push(this.formBuilder.control('Nuevo', Validators.required));
  }

  public removePasatiempo(index: number) {
    this.getPasatiempos.removeAt(index);
  }

  public onSubmit() {
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }
    this.formulario.reset();
  }

}

import { Injectable } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  public noBaboso(control: FormControl): ErrorUsuario {
    if (control.value?.toLowerCase() === 'baboso')
      return {
        noBaboso: true
      };

    return null;
  }

  public verifyPasswords(pass: string, confirm_pass: string) {
    return (formGroup: FormGroup) => {
      const pass1 = formGroup.controls[pass];
      const pass2 = formGroup.controls[confirm_pass];

      if (pass1.value === pass2.value)
        pass2.setErrors(null);
      else
        pass2.setErrors({ noEsIgual: true });
    };
  }

  public usuarioYaExiste(control: FormControl): Promise<ErrorUsuario> | Observable<ErrorUsuario> {
    if (!control.value) return Promise.resolve(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'user')
          resolve({ existe: true });
        else
          resolve(null);
      }, 2000);
    });
  }
}


interface ErrorUsuario {
  [s: string]: boolean
}
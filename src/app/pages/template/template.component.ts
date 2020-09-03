import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  constructor(private countriesService: CountriesService) { }

  public paises: any[] = [];

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries => {
      this.paises = countries
      // this.paises.unshift({ codigo: "", nombre: "Seleccione Pais" }); // Agrega un elemento al inicio del arreglo.
    });
  }

  public submit(formulario: NgForm) {
    if (formulario.invalid) {
      Object.values(formulario.controls).forEach(control => control.markAsTouched());
      return;
    }
    console.log(formulario.value);
  }

}

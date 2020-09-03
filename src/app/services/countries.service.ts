import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private URL: string = 'https://restcountries.eu/rest/v2/lang/es';

  constructor(private http: HttpClient) {

  }

  public getCountries() {
    return this.http.get(this.URL)
      .pipe(map((response: any[]) => response
        .map(pais => ({
          codigo: pais.alpha3Code,
          nombre: pais.name
        }))
      ));
  }
}

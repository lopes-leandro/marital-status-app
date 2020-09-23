import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISpouse } from '../interfaces/interfaces';
import { CustomValidators } from 'src/app/shared/utils/validators';
import { environment } from 'src/environments/environment';

export interface ISpouseService {
  readonly spouses$: BehaviorSubject<ISpouse[]>;
}

@Injectable({
  providedIn: 'root',
})
export class SpouseService implements ISpouseService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': '	application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  readonly spouses$ = new BehaviorSubject<ISpouse[]>(null);

  constructor(private http: HttpClient) {}

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'),
    ]),
    maritalStatus: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', [
      Validators.required,
      CustomValidators.GreaterThanEighteenYears,
    ]),
    spouseName: new FormControl('', Validators.required),
    spouseDateOfBirth: new FormControl('', Validators.required),
  });

  inicializedFormGroup() {
    this.form.setValue({
      id: null,
      name: '',
      maritalStatus: '',
      dateOfBirth: '',
      spouseName: '',
      spouseDateOfBirth: '',
    });
  }

  setSpouseValidator() {}

  getAllSpouses(): Observable<ISpouse[]> {
    return this.http.get<ISpouse[]>(
      `${environment.baseUrl}localhost:4500/spouse`
    );
  }

  addSpouse(spouse: ISpouse): Observable<ISpouse> {
    return this.http.post<ISpouse>(
      `${environment.baseUrl}localhost:4500/spouse`,
      JSON.stringify(spouse),
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  updateSpouse(spouse: ISpouse): Observable<ISpouse> {
    return this.http.put<ISpouse>(
      `${environment.baseUrl}localhost:4500/spouse`,
      JSON.stringify(spouse),
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  deleteSpouse(id: string): Observable<ISpouse> {
    return this.http.delete<ISpouse>(
      `${environment.baseUrl}localhost:4500/spouse/${id}`,
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  mockAddSpouse(spouse: ISpouse): Observable<ISpouse> {
    return this.http.post<ISpouse>(
      `${environment.baseUrl}localhost:4500/spouse`,
      JSON.stringify(spouse),
      {
        headers: this.httpOptions.headers,
      }
    );
  }
}

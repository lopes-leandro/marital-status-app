import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ISpouse } from '../interfaces/interfaces';
import { CustomValidators } from 'src/app/shared/utils/validators';
import { environment } from 'src/environments/environment';
import { validateBasis } from '@angular/flex-layout';

@Injectable({
  providedIn: 'root',
})
export class SpouseService{
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': '	application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

   private spousesObs$: Subject<ISpouse[]> = new Subject<ISpouse[]>();

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
    spouseName: new FormControl(''),
    spouseDateOfBirth: new FormControl(''),
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

  setSpouseValidator(maritalStatus) {
    switch (maritalStatus) {
      case 'Casado(a)':
        this.form
          .get('spouseName')
          .setValidators([
            Validators.required,
            Validators.minLength(5),
            Validators.pattern('^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$'),
          ]);
        this.form.get('spouseName').updateValueAndValidity();        
        this.form
          .get('spouseDateOfBirth')
          .setValidators([
            Validators.required,
            CustomValidators.GreaterThanEighteenYears,
          ]);
        this.form.get('spouseDateOfBirth').updateValueAndValidity();
        break;
      case 'Solteiro(a)':
        this.form.get('spouseName').setValidators([]);
        this.form.get('spouseName').updateValueAndValidity();
        this.form.get('spouseDateOfBirth').setValidators([]);
        this.form.get('spouseDateOfBirth').updateValueAndValidity();
        break;
    }
  }

  getAllSpouses(): Observable<ISpouse[]> {
    return this.http.get<ISpouse[]>(`${environment.baseUrl}/spouse`);
  }

  getSpousesObs(): Observable<ISpouse[]> {
    return this.spousesObs$.asObservable();
  }

  setSpousesObs(spouses: ISpouse[]) {
    this.spousesObs$.next(spouses);
  }

  addSpouse(spouse: ISpouse): Observable<ISpouse> {
    return this.http.post<ISpouse>(
      `${environment.baseUrl}/spouse`,
      JSON.stringify(spouse),
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  updateSpouse(spouse: ISpouse): Observable<ISpouse> {
    const id = spouse.id;
    const transform = {
      name: spouse.name,
      dateOfBirth: spouse.dateOfBirth,
      maritalStatus: spouse.maritalStatus,
      spouseName: spouse.spouseName,
      spouseDateOfBirth: spouse.spouseDateOfBirth,
    };
    return this.http.put<ISpouse>(
      `${environment.baseUrl}/spouse/${id}`,
      JSON.stringify(transform),
      {
        headers: this.httpOptions.headers,
      }
    );
  }

  deleteSpouse(id: string): Observable<ISpouse> {
    return this.http.delete<ISpouse>(`${environment.baseUrl}/spouse/${id}`, {
      headers: this.httpOptions.headers,
    });
  }

  mockAddSpouse(spouse: ISpouse): Observable<ISpouse> {
    return this.http.post<ISpouse>(
      `${environment.baseUrl}/spouse`,
      JSON.stringify(spouse),
      {
        headers: this.httpOptions.headers,
      }
    );
  }
}

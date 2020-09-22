import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ISpouse } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root',
})
export class SpouseService {

  private spousesBehaviorSubject = new BehaviorSubject<ISpouse[]>([]);

  constructor(private httpClient: HttpClient) {}

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('^[a-zA-z]*$'),
    ]),
    maritalStatus: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    spouseName: new FormControl('', Validators.required),
    spouseDateOfBirth: new FormControl('', Validators.required),
  });

  inicializedFormGroup() {
    this.form.setValue({
      $key: null,
      name: '',
      maritalStatus: '',
      dateOfBirth: '',
      spouseName: '',
      spouseDateOfBirth: '',
    });
  }

  getSpouses(){
    return this.spousesBehaviorSubject;
  }
}

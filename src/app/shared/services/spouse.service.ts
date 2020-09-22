import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
@Injectable({
  providedIn: 'root'
})
export class SpouseService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    maritalStatus: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    spouseName: new FormControl('', Validators.required),
    spouseDateOfBirth: new FormControl('', Validators.required),
  })
}
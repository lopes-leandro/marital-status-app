import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ISpouseService, SpouseService } from 'src/app/shared/services/spouse.service';
import { Router } from '@angular/router';
import { ISpouse } from 'src/app/shared/interfaces/interfaces';

@Component({
  selector: 'app-spouses',
  templateUrl: './spouses.component.html',
  styleUrls: ['./spouses.component.scss'],
})
export class SpousesComponent implements OnInit {
  constructor(public service: SpouseService, private router: Router) {}

  maritalStatus = [
    { id: 1, value: 'Casado(a)' },
    { id: 2, value: 'Solteiro(a)' },
  ];

  ngOnInit(): void {}

  onSubmit() {    
    if (this.service.form.valid) {
      this.service.addSpouse(this.service.form.value).subscribe(
        data => console.log(data),
        error => console.log(error)        
      );
      this.service.form.reset();
      this.service.inicializedFormGroup();
    }
  }

  onChangeMaritalStatus(ev) {
    console.log(ev);    
  }

  mockAdd() {
    const spouse: ISpouse = {
      id: null,
      maritalStatus: "1",
      name: "Leandro Lopes",
      dateOfBirth: "12/08/10982",
      spouseName: null,
      spouseDateOfBirth: null
    }
    this.service.mockAddSpouse(spouse).subscribe(
      data => console.log(data), 
      error => console.log(error)
    );
  }

  back() {
    this.service.form.reset();
    this.router.navigateByUrl('/');
  }
}

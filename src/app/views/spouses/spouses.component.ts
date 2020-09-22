import { Component, OnInit } from '@angular/core';
import { SpouseService } from 'src/app/shared/services/spouse.service';

@Component({
  selector: 'app-spouses',
  templateUrl: './spouses.component.html',
  styleUrls: ['./spouses.component.scss'],
})
export class SpousesComponent implements OnInit {
  constructor(public service: SpouseService) {}

  maritalStatus = [
    { id: 1, value: 'Casado(a)' },
    { id: 2, value: 'Solteiro(a)' },
  ];

  ngOnInit(): void {}

  back() {
    this.service.form.reset();
  }
}

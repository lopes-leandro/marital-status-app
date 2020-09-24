import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  SpouseService,
} from 'src/app/shared/services/spouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISpouse } from 'src/app/shared/interfaces/interfaces';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-spouses',
  templateUrl: './spouses.component.html',
  styleUrls: ['./spouses.component.scss'],
})
export class SpousesComponent implements OnInit, OnDestroy {

  isEdit: boolean;
  isMarried: boolean = false;
  maritalStatus = [
    { id: 1, value: 'Casado(a)' },
    { id: 2, value: 'Solteiro(a)' },
  ];

  constructor(
    public service: SpouseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnDestroy(): void {
    // this.service.isMarried$.unsubscribe();
  }

  ngOnInit(): void {
    this.checkEdit();
    if (this.isEdit) {
      this.getSpouseToEdit();
    }
  }

  onSubmit() {
    if (!this.service.form.valid) return;

    if (this.isEdit) {
      this.service.updateSpouse(this.service.form.value).subscribe(
        (data) => {
          console.log(data);
          this.notificationService.sucess(':: Alterado com sucesso!');
        },
        (error) => {
          console.log(error);
          this.notificationService.error(':: Internal Server Error');
        }
      );
      this.service.form.reset();
      this.service.inicializedFormGroup();
    } else {
      this.service.addSpouse(this.service.form.value).subscribe(
        (data) => {
          console.log(data);
          this.notificationService.sucess(':: Adicionado com sucesso!');
        },
        (error) => {
          console.log(error);
          this.notificationService.error(':: Internal Server Error');
        }
      );
      this.service.form.reset();
      this.service.inicializedFormGroup();
    }
  }

  onChangeMaritalStatus(ev) {
    console.log(ev.source.value);
    this.service.setSpouseValidator(ev.source.value);
    this.isMarried = ev.source.value == 'Solteiro(a)' ? false : true;
  }

  getSpouseToEdit() {
    this.activatedRoute.data.subscribe((resolveData: { spouse: ISpouse }) => {
      this.service.form.patchValue(resolveData.spouse);
      this.isMarried = resolveData.spouse.maritalStatus == 'Solteiro(a)' ? false : true;
    });
  }

  checkEdit() {
    this.activatedRoute.url.subscribe((data) => {
      const [path] = data.filter((f) => f.path === 'edit');
      this.isEdit = path ? true : false;
    });
  }

  mockAdd() {
    const spouse: ISpouse = {
      id: null,
      maritalStatus: 'Solteiro(a)',
      name: 'Leandro Lopes',
      dateOfBirth: '2002-05-01T03:00:00.000Z',
      spouseName: null,
      spouseDateOfBirth: null,
    };
    this.service.mockAddSpouse(spouse).subscribe(
      (data) => {
        console.log(data);
        this.notificationService.sucess(':: Adicionado com sucesso!');
      },
      (error) => {
        console.log(error);
        this.notificationService.sucess(':: Internal Server Error');
      }
    );
  }

  back() {
    this.service.form.reset();
    this.router.navigateByUrl('/');
  }
}

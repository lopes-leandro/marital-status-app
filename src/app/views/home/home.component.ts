import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ISpouse } from 'src/app/shared/interfaces/interfaces';
import { SpouseService } from 'src/app/shared/services/spouse.service';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title: string = 'Lista de Cônjuges';
  spouses$: Subject<ISpouse[]> = new Subject<ISpouse[]>();
  spouses: ISpouse[] = [];
  dataSource: MatTableDataSource<ISpouse>;

  constructor(
    public spouseService: SpouseService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.getSpouses();
  }

  ngOnInit(): void {    
    this.spouses$.subscribe((data) => {
      this.spouses = data;
      this.dataSource = new MatTableDataSource<ISpouse>(data);
    });
  }
  getSpouses() {
    this.spouseService.getAllSpouses().subscribe((data) => {
      this.spouses$.next(data);      
    });
  }

  newSpouse() {
    this.router.navigate(['/spouse/add']);
  }

  editSpouse(ev) {
    this.router.navigate(['/spouse/' + ev + '/edit']);
  }

  deleteSpouse(ev) {
    this.spouseService.deleteSpouse(ev).subscribe(
      (data) => {
        console.log(data);
        this.notificationService.sucess(':: Removido com sucesso!');
      },
      (error) => {
        console.log(error);
        this.notificationService.error(':: Internal Server Error!');
      }
    );
    this.getSpouses();
  }

  ngOnDestroy(): void {}
}

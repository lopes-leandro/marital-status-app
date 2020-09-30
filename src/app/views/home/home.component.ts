import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
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

  dataSource: MatTableDataSource<ISpouse>;
  subscription: Subscription;
  subscriptionObs: Subscription;

  constructor(
    public spouseService: SpouseService,
    private router: Router,
    private notificationService: NotificationService
  ) {
   console.log('construct');
   this.getSpouses();
  }

  ngOnInit(): void {
    this.subscriptionObs = this.spouseService.getSpousesObs().subscribe((data) => {            
      this.dataSource = new MatTableDataSource<ISpouse>(data);
    }); 
  }

  getSpouses() {
    this.subscription = this.spouseService.getAllSpouses().subscribe((data) => {
      this.spouseService.setSpousesObs(data);
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

  ngOnDestroy(): void {
    if (this.subscriptionObs) {
      this.subscriptionObs.unsubscribe();
      console.log('subscriptionObs');
    }
    if (this.subscription){
      this.subscription.unsubscribe();
      console.log('subscription');
    }    
  }
}

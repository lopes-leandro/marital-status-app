import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ISpouse } from 'src/app/shared/interfaces/interfaces';
import { SpouseService } from 'src/app/shared/services/spouse.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  title: string = "Lista de Cônjuges";
  spouses$: Subject<ISpouse[]> = new Subject<ISpouse[]>();
  spouses: ISpouse[] = [];
  dataSource: MatTableDataSource<ISpouse>;
  
  constructor(public spouseService: SpouseService, private router: Router) {}
  

  ngOnInit(): void {  
    this.spouses$.subscribe(data => this.spouses = data);  
    this.getSpouses();    
  }
  getSpouses() {
    this.spouseService.getAllSpouses().subscribe(data => 
      {
        this.spouses$.next(data);
        this.dataSource = new MatTableDataSource<ISpouse>(data);
      }
      );
  }

  deleteSpouse(ev) {
    this.spouseService.deleteSpouse(ev).subscribe();
    this.getSpouses();
  }

  ngOnDestroy(): void {
  }  
}

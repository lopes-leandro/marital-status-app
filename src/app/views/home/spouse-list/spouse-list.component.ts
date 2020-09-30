import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ISpouse } from "src/app/shared/interfaces/interfaces";

@Component({
  selector: 'app-spouse-list',
  templateUrl: './spouse-list.component.html',
  styleUrls: ['./spouse-list.component.scss'],
})
export class SpouseListComponent implements OnInit {
  @Input() inputData: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Output() deleteItem: EventEmitter<number> = new EventEmitter<number>(); 
  @Output() editItem: EventEmitter<number> = new EventEmitter<number>();
  
  displayedColumns: string[] = [
    'name',
    'dateOfBirth',
    'maritalStatus',
    'spouseName',
    'actions',
  ];
  dataInput: MatTableDataSource<any>;

  searchKey: string;
  
  constructor(private dialogService: DialogService, private cdr: ChangeDetectorRef) {
  }

  sortData(sort: Sort) {
    const data = this.dataInput.data.slice();
    if (!sort.active || sort.direction == '') {
      this.dataInput.data = data;
      return;
    }
    this.dataInput.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'dateOfBirth':
          return compare(a.dateOfBirth, b.dateOfBirth, isAsc);
        case 'maritalStatus':
          return compare(a.maritalStatus, b.maritalStatus, isAsc);
        case 'spouseName':
          return compare(a.spouseName, b.spouseName, isAsc);
        case 'spouseDateOfBirth':
          return compare(a.spouseDateOfBirth, b.spouseDateOfBirth, isAsc);
        default:
          return 0;
      }
    });
  }

  ngOnInit(): void {
    // retornar o nome das propriedades de um array
    // const test = this.inputData.find((v, i) => i == 0);
    // console.log(Object.getOwnPropertyNames(test));

    this.dataInput = new MatTableDataSource(this.inputData.slice());
    this.dataInput.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataInput.filter = this.searchKey.trim().toLowerCase();
  }

  onEdit(id) {
    this.editItem.emit(id);
  }

  onDelete(id) {    
    this.dialogService.openConfirmDialog("Você tem certeza que quer deletar este registro?")
    .afterClosed().subscribe(res => {
      if (res) {
        this.deleteItem.emit(id);
      }      
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

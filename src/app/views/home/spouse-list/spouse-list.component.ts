import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from 'src/app/shared/services/dialog.service';

export interface Spouse {
  $key: number;
  name: string;
  maritalStatus: string;
  dateOfBirth: number;
  spouseName: string;
  spouseDateOfBirth: number;
}

@Component({
  selector: 'app-spouse-list',
  templateUrl: './spouse-list.component.html',
  styleUrls: ['./spouse-list.component.scss'],
})
export class SpouseListComponent implements OnInit {
  @Input() data: Spouse[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'dateOfBirth',
    'maritalStatus',
    'spouseName',
    'actions',
  ];
  
  listData: MatTableDataSource<any>;
  searchKey: string = 'ex: Maria ou Solteiro';
  dateTs: number = Date.parse('12/08/1982');

  constructor(private dialogService: DialogService) {}

  sortData(sort: Sort) {
    const data = this.data.slice();
    if (!sort.active || sort.direction == '') {
      this.listData.data = data;
      return;
    }
    this.listData.data = data.sort((a, b) => {
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
    this.listData = new MatTableDataSource(this.data.slice());
    this.listData.paginator = this.paginator;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onDelete($key) {
    // if (confirm('Você tem certeza que quer deletar este registro?')) {
    //   $key;
    // }
    this.dialogService.openConfirmDialog("Você tem certeza que quer deletar este registro?")
    .afterClosed().subscribe(res => {
      if (res) {
        this.data
      }      
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

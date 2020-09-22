import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { config } from 'process';
import { MatConfigDialogComponent } from '../components/mat-config-dialog/mat-config-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {

  config: MatDialogConfig = {
    width: '390px',
    panelClass: 'confirm-dialog-container',
    disableClose: true,
  }

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg: string){
    return this.dialog.open(MatConfigDialogComponent, {...this.config, data: {message: msg}});
  }
}

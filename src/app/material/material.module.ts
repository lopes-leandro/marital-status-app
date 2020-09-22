import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table'; 
import {MatSortModule} from '@angular/material/sort'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,  
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ]
})
export class MaterialModule { }

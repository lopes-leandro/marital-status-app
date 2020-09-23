import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HomeComponent } from './views/home/home.component';
import { SpouseListComponent } from './views/home/spouse-list/spouse-list.component';
import { SpousesComponent } from './views/spouses/spouses.component';
import { MatConfigDialogComponent } from './shared/components/mat-config-dialog/mat-config-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpouseListComponent,
    SpousesComponent,
    MatConfigDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent],
  entryComponents: [MatConfigDialogComponent]
})
export class AppModule { }

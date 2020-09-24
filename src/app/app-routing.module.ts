import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleSpouseResolverService } from './shared/services/single-spouse-resolver.service';
import { HomeComponent } from './views/home/home.component';
import { SpousesComponent } from './views/spouses/spouses.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'spouse/add',
    component: SpousesComponent,
  },
  {
    path: 'spouse/:id/edit',
    component: SpousesComponent,
    resolve: {spouse: SingleSpouseResolverService}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

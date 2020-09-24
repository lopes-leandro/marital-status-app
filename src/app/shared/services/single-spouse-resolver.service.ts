import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ISpouse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SingleSpouseResolverService implements Resolve<ISpouse> {

  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.http.get<ISpouse>(`${environment.baseUrl}/spouse/${id}`);
  }
}

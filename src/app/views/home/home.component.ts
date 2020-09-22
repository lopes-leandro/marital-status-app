import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title: string = "Lista de Cônjuges";
  spouses = [{
    name: "Antonella Agatha Nascimento",
    maritalStatus: "Casado(a)",
    dateOfBirth: "01/08/1944",
    spouseName: "Gael Heitor Assis",
    spouseDateOfBirth: "22/08/1948"
  },{
    name: "Sara Helena Campos",
    maritalStatus: "Casado(a)",
    dateOfBirth: "24/06/1946",
    spouseName: "Victor Tomás Pires",
    spouseDateOfBirth: "20/05/1941"
  },{
    name: "Stefany Renata Vieira",
    maritalStatus: "Solteiro(a)",
    dateOfBirth: "25/02/1975",
    spouseName: "",
    spouseDateOfBirth: ""
  },{
    name: "Maya Priscila Pietra Pereira",
    maritalStatus: "Casado(a)",
    dateOfBirth: "20/07/1976",
    spouseName: "Arthur Luan Lucca Ferreira",
    spouseDateOfBirth: "23/08/1988"
  }];
  
  constructor() { }

  ngOnInit(): void {
  }

}

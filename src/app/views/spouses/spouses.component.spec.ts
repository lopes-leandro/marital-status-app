import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpousesComponent } from './spouses.component';

describe('SpousesComponent', () => {
  let component: SpousesComponent;
  let fixture: ComponentFixture<SpousesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpousesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

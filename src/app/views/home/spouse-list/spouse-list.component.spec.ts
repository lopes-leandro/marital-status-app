import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpouseListComponent } from './spouse-list.component';

describe('SpouseListComponent', () => {
  let component: SpouseListComponent;
  let fixture: ComponentFixture<SpouseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpouseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpouseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

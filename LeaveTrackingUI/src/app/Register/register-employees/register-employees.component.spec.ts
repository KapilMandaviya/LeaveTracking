import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmployeesComponent } from './register-employees.component';

describe('RegisterEmployeesComponent', () => {
  let component: RegisterEmployeesComponent;
  let fixture: ComponentFixture<RegisterEmployeesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterEmployeesComponent]
    });
    fixture = TestBed.createComponent(RegisterEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

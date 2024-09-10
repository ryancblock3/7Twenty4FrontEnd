import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AddEmployeeComponent } from "./add-employee.component";
import { EmployeeService } from "../services/employee.service";
import { mockEmployee } from "../models/mock-employee";
import { of } from "rxjs";

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeeComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'employees', component: AddEmployeeComponent }
        ])
      ],
      providers: [EmployeeService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create employee and navigate to employee list', () => {
    spyOn(employeeService, 'createEmployee').and.returnValue(of(mockEmployee));
    component.employee = mockEmployee;
    component.onSubmit();
    expect(employeeService.createEmployee).toHaveBeenCalledWith(mockEmployee);
  });
});
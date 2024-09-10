import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeInformationComponent } from './employee-information.component';
import { EmployeeService } from '../services/employee.service';
import { mockEmployees } from '../models/mock-employees';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('EmployeeInformationComponent', () => {
  let component: EmployeeInformationComponent;
  let fixture: ComponentFixture<EmployeeInformationComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeInformationComponent],
      imports: [
        HttpClientTestingModule,
        NgxPaginationModule,
        FormsModule
      ],
      providers: [EmployeeService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeInformationComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should retrieve and display employees', () => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployees));
    component.ngOnInit();
    expect(component.employees.length).toBe(mockEmployees.length);
  });
});
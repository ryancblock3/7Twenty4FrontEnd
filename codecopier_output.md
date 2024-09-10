# CodeCopier Output

## File: src/app/app-routing.module.ts

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { EmployeeDetailsComponent } from './employee-information/employee-details.component';
import { AddEmployeeComponent } from './employee-information/add-employee.component';
import { EmployeeHoursComponent } from './timesheets/employee-hours/employee-hours.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceEditComponent } from './invoices/invoice-edit/invoice-edit.component';
import { EmployeeHoursReportComponent } from './employee-hours-report/employee-hours-report.component';
import { JobsComponent } from './jobs/jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'employee-information', component: EmployeeInformationComponent, canActivate: [AuthGuard] },
  { path: 'timesheets', component: TimesheetsComponent, canActivate: [AuthGuard] },
  { path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employees', component: EmployeeInformationComponent, canActivate: [AuthGuard] },
  { path: 'employee-hours', component: EmployeeHoursComponent, canActivate: [AuthGuard] },
  { path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard] },
  { path: 'invoices/:invoiceNumber/edit', component: InvoiceEditComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: EmployeeHoursReportComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## File: src/app/app.component.css

```css

```

## File: src/app/app.component.html

```html

<app-navbar *ngIf="authService.isLoggedIn"></app-navbar>
  <router-outlet></router-outlet>
```

## File: src/app/app.component.ts

```typescript
import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '724-front-end';

  constructor(public authService: AuthService) {}
}

```

## File: src/app/app.module.ts

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeInformationComponent } from './employee-information/employee-information.component';
import { TimesheetsComponent } from './timesheets/timesheets.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsComponent } from './employee-information/employee-details.component';
import { AddEmployeeComponent } from './employee-information/add-employee.component';
import { SaturdayValidatorDirective } from './timesheets/sunday-validator.directive';
import { EmployeeHoursComponent } from './timesheets/employee-hours/employee-hours.component';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceEditComponent } from './invoices/invoice-edit/invoice-edit.component';
import { ConfirmationModalComponent } from './timesheets/ConfirmationModal/confirmation-modal.component';
import { DeleteModalComponent } from './invoices/delete-modal/delete-modal.component';
import { EmployeeHoursReportComponent } from './employee-hours-report/employee-hours-report.component';
import { JobsComponent } from './jobs/jobs.component';
import { DeleteConfirmationModal } from './jobs/delete-confirmation-modal/delete-confirmation-modal.component';
import { SuccessModal } from './jobs/success-modal/success-modal.component';
import { CreateJobModalComponent } from './jobs/create-job-modal/create-job-modal.component';
import { EditJobModalComponent } from './jobs/edit-job-modal/edit-job-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeInformationComponent,
    TimesheetsComponent,
    FilterPipe,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    SaturdayValidatorDirective,
    EmployeeHoursComponent,
    InvoicesComponent,
    InvoiceEditComponent,
    ConfirmationModalComponent,
    DeleteModalComponent,
    EmployeeHoursReportComponent,
    JobsComponent,
    DeleteConfirmationModal,
    SuccessModal,
    CreateJobModalComponent,
    EditJobModalComponent,
    DashboardComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    NgbCollapseModule,
    ReactiveFormsModule
  ],
  providers: [
    CurrencyPipe,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## File: src/app/auth-config.ts

```typescript
import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
    
};
```

## File: src/app/auth/auth.guard.ts

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
```

## File: src/app/auth/auth.service.ts

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
```

## File: src/app/dashboard/dashboard.component.css

```css

```

## File: src/app/dashboard/dashboard.component.html

```html
<div class="container py-5">
    <h2 class="text-center mb-4">Dashboard</h2>
    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card bg-primary text-white shadow">
          <div class="card-body">
            <h5 class="card-title">Total Employees</h5>
            <p class="card-text display-4">{{ totalEmployees }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card bg-success text-white shadow">
          <div class="card-body">
            <h5 class="card-title">Total Hours Worked</h5>
            <p class="card-text display-4">{{ totalHoursWorked }}</p>
            <p class="card-text">Previous Week Ending</p>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div class="card bg-info text-white shadow">
          <div class="card-body">
            <h5 class="card-title">Invoice Total</h5>
            <p class="card-text display-4">{{ totalInvoiceTotal | currency }}</p>
            <p class="card-text">Previous Week Ending</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card bg-warning text-white shadow">
          <div class="card-body">
            <h5 class="card-title">Active Jobs</h5>
            <p class="card-text display-4">{{ activeJobs }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card bg-secondary text-white shadow">
          <div class="card-body">
            <h5 class="card-title">Timesheets Submitted</h5>
            <p class="card-text display-4">{{ timesheetsSubmitted }}</p>
            <p class="card-text">Previous Week Ending</p>
          </div>
        </div>
      </div>
    </div>
  </div>
```

## File: src/app/dashboard/dashboard.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { TimesheetService } from '../services/timesheet.service';
import { InvoiceService } from '../services/InvoiceService.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0;
  totalHoursWorked: number = 0;
  totalInvoiceTotal: number = 0;
  activeJobs: number = 0;
  timesheetsSubmitted: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private timesheetService: TimesheetService,
    private invoiceService: InvoiceService,
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.getTotalEmployees();
    this.getTotalHoursWorked();
    this.getTotalInvoiceTotal();
    this.getActiveJobs();
    this.getTimesheetsSubmitted();
  }

  getTotalEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees) => {
        this.totalEmployees = employees.length;
      },
      (error) => {
        console.error('Error retrieving total employees:', error);
      }
    );
  }

  getTotalHoursWorked() {
    const previousWeekEnding = this.getPreviousWeekEnding();
    this.timesheetService.getTimesheetsByWeekEnding(previousWeekEnding).subscribe(
      (timesheets) => {
        this.totalHoursWorked = timesheets.reduce((total, timesheet) => {
          return total + (timesheet.totalHours || 0);
        }, 0);
      },
      (error) => {
        console.error('Error retrieving total hours worked:', error);
      }
    );
  }

  getTotalInvoiceTotal() {
    const previousWeekEnding = this.getPreviousWeekEnding();
    this.invoiceService.getInvoicesByWeekEnding(previousWeekEnding).subscribe(
      (invoices) => {
        this.totalInvoiceTotal = invoices.reduce((total, invoice) => {
          return total + (invoice.totalAmount || 0);
        }, 0);
      },
      (error) => {
        console.error('Error retrieving total invoice total:', error);
      }
    );
  }

  getActiveJobs() {
    this.jobService.getActiveJobs().subscribe(
      (jobs) => {
        this.activeJobs = jobs.length;
      },
      (error) => {
        console.error('Error retrieving active jobs:', error);
      }
    );
  }

  getTimesheetsSubmitted() {
    const previousWeekEnding = this.getPreviousWeekEnding();
    this.timesheetService.getTimesheetsByWeekEnding(previousWeekEnding).subscribe(
      (timesheets) => {
        this.timesheetsSubmitted = timesheets.length;
      },
      (error) => {
        console.error('Error retrieving timesheets submitted:', error);
      }
    );
  }

  getPreviousWeekEnding(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToSubtract = (dayOfWeek === 0) ? 7 : dayOfWeek;
    const previousWeekEnding = new Date(today);
    previousWeekEnding.setDate(today.getDate() - daysToSubtract);
    return previousWeekEnding;
  }
}
```

## File: src/app/employee-hours-report/employee-hours-report.component.css

```css

```

## File: src/app/employee-hours-report/employee-hours-report.component.html

```html
<div class="container">
  <h2 class="mb-4 mt-3">Employee Hours Report</h2>
  <div class="row mb-4">
    <div class="col-md-4">
      <label for="weekEnding">Week Ending:</label>
      <input type="date" class="form-control" id="weekEnding" [(ngModel)]="weekEnding" />
    </div>
    <div class="col-md-4">
      <button class="btn btn-primary mt-4" (click)="generateReport()">Generate Report</button>
    </div>
  </div>
  <div *ngIf="reportData">
    <p>Report Generated On: {{ reportGeneratedAt | date: 'medium' }}</p>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Total Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of reportData" [ngClass]="{ 'table-warning': employee.totalHours < 24, 'table-danger': employee.totalHours > 50 }">
          <td>{{ employee.name }}</td>
          <td>{{ employee.totalHours }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## File: src/app/employee-hours-report/employee-hours-report.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { EmployeeHoursReportService } from '../services/employee-hours-report.service';
import jsPDF from 'jspdf';

interface EmployeeHours {
  name: string;
  totalHours: number;
}

@Component({
  selector: 'app-employee-hours-report',
  templateUrl: './employee-hours-report.component.html',
  styleUrls: ['./employee-hours-report.component.css']
})
export class EmployeeHoursReportComponent implements OnInit {
  weekEnding: string = '';
  reportData: EmployeeHours[] = [];
  reportGeneratedAt: Date = new Date();

  constructor(private employeeHoursReportService: EmployeeHoursReportService) { }

  ngOnInit(): void {
  }

  generateReport(): void {
    this.employeeHoursReportService.getEmployeeHoursReport(this.weekEnding)
      .subscribe((data: EmployeeHours[]) => {
        this.reportData = data.sort((a, b) => a.name.localeCompare(b.name));
        this.reportGeneratedAt = new Date();
      });
  }
}



```

## File: src/app/employee-information/add-employee.component.css

```css

```

## File: src/app/employee-information/add-employee.component.html

```html
<div class="container">
    <h2 class="mt-4 mb-4">Add Employee</h2>
    <div class="card">
      <div class="card-body">
        <form (ngSubmit)="onSubmit()" #employeeForm="ngForm">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" id="name" name="name" [(ngModel)]="employee.name" required>
              </div>
              <div class="form-group">
                <label for="hireDate">Hire Date:</label>
                <input type="date" class="form-control" id="hireDate" name="hireDate" [(ngModel)]="employee.hireDate" required>
              </div>
              <div class="form-group">
                <label for="jobTitle">Job Title:</label>
                <input type="text" class="form-control" id="jobTitle" name="jobTitle" [(ngModel)]="employee.jobTitle" required>
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" name="email" [(ngModel)]="employee.email" required>
              </div>
              <div class="form-group">
                <label for="hourlyWage">Hourly Wage:</label>
                <input type="number" class="form-control" id="hourlyWage" name="hourlyWage" [(ngModel)]="employee.hourlyWage" required>
              </div>
              <div class="form-group">
                <label for="fica">FICA:</label>
                <input type="number" class="form-control" id="fica" name="fica" [(ngModel)]="employee.fica" required>
              </div>
              <div class="form-group">
                <label for="lastRaiseDate">Last Raise Date:</label>
                <input type="date" class="form-control" id="lastRaiseDate" name="lastRaiseDate" [(ngModel)]="employee.lastRaiseDate">
              </div>
              <div class="form-group">
                <label for="insurance">Insurance:</label>
                <input type="number" class="form-control" id="insurance" name="insurance" [(ngModel)]="employee.insurance" required>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="vacationHoliday">Vacation/Holiday:</label>
                <input type="number" class="form-control" id="vacationHoliday" name="vacationHoliday" [(ngModel)]="employee.vacationHoliday" required>
              </div>
              <div class="form-group">
                <label for="carFuel">Car/Fuel:</label>
                <input type="number" class="form-control" id="carFuel" name="carFuel" [(ngModel)]="employee.carFuel" required>
              </div>
              <div class="form-group">
                <label for="markup">Markup:</label>
                <input type="number" class="form-control" id="markup" name="markup" [(ngModel)]="employee.markup" required>
              </div>
              <div class="form-group">
                <label for="lastVacationDate">Last Vacation Date:</label>
                <input type="date" class="form-control" id="lastVacationDate" name="lastVacationDate" [(ngModel)]="employee.lastVacationDate">
              </div>
              <div class="form-group">
                <label for="vacationDaysUsed">Vacation Days Used:</label>
                <input type="number" class="form-control" id="vacationDaysUsed" name="vacationDaysUsed" [(ngModel)]="employee.vacationDaysUsed" required>
              </div>
              <div class="form-group">
                <label for="notes">Notes:</label>
                <textarea class="form-control" id="notes" name="notes" [(ngModel)]="employee.notes"></textarea>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="!employeeForm.form.valid">Create Employee</button>
        </form>
      </div>
    </div>
  </div>
```

## File: src/app/employee-information/add-employee.component.spec.ts

```typescript
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
```

## File: src/app/employee-information/add-employee.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: any = {
    name: '',
    jobTitle: '',
    email: '',
    hourlyWage: null,
    insurance: null,
    vacationHoliday: null,
    carFuel: null,
    markup: null
  };

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.employeeService.createEmployee(this.employee).subscribe(
      (response) => {
        console.log('Employee created successfully:', response);
        this.router.navigate(['/employees']);
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }
}
```

## File: src/app/employee-information/employee-details.component.css

```css

```

## File: src/app/employee-information/employee-details.component.html

```html
<div class="container">
  <h2 class="mt-4 mb-4">Employee Details</h2>
  <div *ngIf="employee" class="card">
    <div class="card-body">
      <form (ngSubmit)="onSubmit()" #employeeForm="ngForm">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="employeeId">Employee ID:</label>
              <input type="text" class="form-control" id="employeeId" name="employeeId" [(ngModel)]="employee.employeeId" readonly>
            </div>
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" id="name" name="name" [(ngModel)]="employee.name" required>
            </div>
            <div class="form-group">
              <label for="hireDate">Hire Date:</label>
              <input type="date" class="form-control" id="hireDate" name="hireDate" [(ngModel)]="employee.hireDate" required>
            </div>
            <div class="form-group">
              <label for="jobTitle">Job Title:</label>
              <input type="text" class="form-control" id="jobTitle" name="jobTitle" [(ngModel)]="employee.jobTitle" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" class="form-control" id="email" name="email" [(ngModel)]="employee.email" required>
            </div>
            <div class="form-group">
              <label for="hourlyWage">Hourly Wage:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="number" class="form-control" id="hourlyWage" name="hourlyWage" [(ngModel)]="employee.hourlyWage" required>
              </div>
            </div>
            <div class="form-group">
              <label for="fica">FICA:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="number" class="form-control" id="fica" name="fica" [(ngModel)]="employee.fica" required>
              </div>
            </div>
            <div class="form-group">
              <label for="lastRaiseDate">Last Raise Date:</label>
              <input type="date" class="form-control" id="lastRaiseDate" name="lastRaiseDate" [(ngModel)]="employee.lastRaiseDate">
            </div>
            <div class="form-group">
              <label for="insurance">Insurance:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="number" class="form-control" id="insurance" name="insurance" [(ngModel)]="employee.insurance" required>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="vacationHoliday">Vacation/Holiday:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="number" class="form-control" id="vacationHoliday" name="vacationHoliday" [(ngModel)]="employee.vacationHoliday" required>
              </div>
            </div>
            <div class="form-group">
              <label for="carFuel">Car/Fuel:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="number" class="form-control" id="carFuel" name="carFuel" [(ngModel)]="employee.carFuel" required>
              </div>
            </div>
            <div class="form-group">
              <label for="markup">Markup:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">%</span>
                </div>
                <input type="number" class="form-control" id="markup" name="markup" [(ngModel)]="employee.markup" required>
              </div>
            </div>
            <div class="form-group">
              <label for="rate">Rate:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="number" class="form-control" id="rate" name="rate" [(ngModel)]="employee.rate" required>
              </div>
            </div>
            <div class="form-group">
              <label for="burdenedRate">Burdened Rate:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="number" class="form-control" id="burdenedRate" name="burdenedRate" [(ngModel)]="employee.burdenedRate" required>
              </div>
            </div>
            <div class="form-group">
              <label for="burdenedOtRate">Burdened OT Rate:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input type="number" class="form-control" id="burdenedOtRate" name="burdenedOtRate" [(ngModel)]="employee.burdenedOtRate" required>
              </div>
            </div>
            <div class="form-group">
              <label for="lastVacationDate">Last Vacation Date:</label>
              <input type="date" class="form-control" id="lastVacationDate" name="lastVacationDate" [(ngModel)]="employee.lastVacationDate">
            </div>
            <div class="form-group">
              <label for="vacationDaysUsed">Vacation Days Used:</label>
              <input type="number" class="form-control" id="vacationDaysUsed" name="vacationDaysUsed" [(ngModel)]="employee.vacationDaysUsed" required>
            </div>
            <div class="form-group">
              <label for="notes">Notes:</label>
              <textarea class="form-control" id="notes" name="notes" [(ngModel)]="employee.notes" rows="3"></textarea>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-lg" [disabled]="!employeeForm.form.valid">Update</button>
        </div>
      </form>
    </div>
  </div>
</div>
```

## File: src/app/employee-information/employee-details.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: any;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const employeeId = +params['id'];
      if (!isNaN(employeeId)) {
        this.fetchEmployeeDetails(employeeId);
      } else {
        console.error('Invalid employee ID');
      }
    });
  }

  fetchEmployeeDetails(employeeId: number) {
    this.employeeService.getEmployee(employeeId).subscribe(
      employee => {
        this.employee = employee;
      },
      error => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employee.employeeId, this.employee).subscribe(
      updatedEmployee => {
        console.log('Employee updated successfully:', updatedEmployee);
      },
      error => {
        console.error('Error updating employee:', error);
      }
    );
  }
}
```

## File: src/app/employee-information/employee-information.component.css

```css

```

## File: src/app/employee-information/employee-information.component.html

```html
<div class="container">
  <div class="row align-items-center mb-4">
    <div class="col">
      <h2 class="mt-4">Employee List</h2>
    </div>
    <div class="col-md-4">
      <div class="input-group">
        <input type="text" class="form-control" [(ngModel)]="searchTerm" (ngModelChange)="filterEmployees()" placeholder="Search employees...">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" (click)="filterEmployees()">Search</button>
        </div>
      </div>
    </div>
    <div class="col-md-2">
      <button class="btn btn-primary btn-block" (click)="addEmployee()">Add Employee</button>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead class="thead-dark">
        <tr>
          <th class="sortable" (click)="sortEmployeesByName()">
            Name
            <span *ngIf="sortOrderName === 'asc'" class="sort-icon">&#9650;</span>
            <span *ngIf="sortOrderName === 'desc'" class="sort-icon">&#9660;</span>
          </th>
          <th>Job Title</th>
          <th>Email</th>
          <th class="sortable" (click)="sortEmployeesByHourlyWage()">
            Hourly Wage
            <span *ngIf="sortOrder === 'asc'" class="sort-icon">&#9650;</span>
            <span *ngIf="sortOrder === 'desc'" class="sort-icon">&#9660;</span>
          </th>
          <th>Burdened Rate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of filteredEmployees | paginate: { itemsPerPage: itemsPerPage, currentPage: currentPage }">
          <td>{{ employee.name }}</td>
          <td>{{ employee.jobTitle }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.hourlyWage | currency:'USD':'symbol':'1.2-2' }}</td>
          <td>{{ employee.burdenedRate | currency:'USD':'symbol':'1.2-2' }}</td>
          <td>
            <div class="btn-group" role="group">
              <button class="btn btn-primary" [routerLink]="['/employee', employee.employeeId]">View Details</button>
              <button class="btn btn-warning" [routerLink]="['/employee', employee.employeeId]">Edit</button>
              <button class="btn btn-danger" (click)="deleteEmployee(employee)">Delete</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="d-flex justify-content-center mt-4">
    <pagination-controls (pageChange)="currentPage = $event"></pagination-controls>
  </div>
</div>
```

## File: src/app/employee-information/employee-information.component.spec.ts

```typescript
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
```

## File: src/app/employee-information/employee-information.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.css'],
})
export class EmployeeInformationComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: any[] = [];
  selectedEmployee: any = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  sortOrderName: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  itemsPerPage = 10;
  pageSize = 12;
  searchTerm: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees: any[]) => {
        this.employees = employees;
        this.filterEmployees();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  selectEmployee(employee: any) {
    this.selectedEmployee = employee;
  }

  sortEmployeesByName() {
    if (this.sortOrderName === 'asc') {
      this.filteredEmployees.sort((a, b) => a.name.localeCompare(b.name));
      this.sortOrderName = 'desc';
    } else {
      this.filteredEmployees.sort((a, b) => b.name.localeCompare(a.name));
      this.sortOrderName = 'asc';
    }
  }

  sortEmployeesByHourlyWage() {
    if (this.sortOrder === 'asc') {
      this.filteredEmployees.sort((a, b) => a.hourlyWage - b.hourlyWage);
      this.sortOrder = 'desc';
    } else {
      this.filteredEmployees.sort((a, b) => b.hourlyWage - a.hourlyWage);
      this.sortOrder = 'asc';
    }
  }

  deleteEmployee(employee: any) {
    if (employee && employee.employeeId) {
      if (confirm('Are you sure you want to delete this employee?')) {
        this.employeeService.deleteEmployee(employee.employeeId).subscribe(
          () => {
            this.employees = this.employees.filter((e) => e.employeeId !== employee.employeeId);
            this.filterEmployees();
            if (this.selectedEmployee && this.selectedEmployee.employeeId === employee.employeeId) {
              this.selectedEmployee = null;
            }
          },
          (error: any) => console.log(error)
        );
      }
    } else {
      console.error('Invalid employee object:', employee);
    }
  }

  editEmployee(employee: any) {}

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }

  filterEmployees() {
    if (this.searchTerm) {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEmployees = this.employees;
    }
    this.currentPage = 1;
  }
}
```

## File: src/app/invoices/delete-modal/delete-modal.component.css

```css
/* delete-modal.component.css */
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1040;
  }
  
  .modal-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1050;
  }

  .modal {
    display: block;
    position: fixed;
    z-index: 1050;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-dialog {
    margin: 1.75rem auto;
  }
```

## File: src/app/invoices/delete-modal/delete-modal.component.html

```html
<div class="modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary d-flex justify-content-between align-items-center">
          <h5 class="modal-title text-white mb-0">Invoice Deleted</h5>
          <button type="button" class="btn btn-outline-light btn-sm" (click)="closeModal()">
            <i class="fas fa-times">X</i>
          </button>
        </div>
        <div class="modal-body">
          <p class="mb-0">The invoice was successfully deleted.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" (click)="closeModal()">OK</button>
        </div>
      </div>
    </div>
  </div>
```

## File: src/app/invoices/delete-modal/delete-modal.component.ts

```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Output() modalClosed = new EventEmitter<void>();

  closeModal() {
    this.modalClosed.emit();
  }
}
```

## File: src/app/invoices/invoice-edit/invoice-edit.component.css

```css

```

## File: src/app/invoices/invoice-edit/invoice-edit.component.html

```html
<div class="container">
  <h2>Edit Invoice</h2>
  <form *ngIf="invoice" (ngSubmit)="updateInvoice()">
    <div class="form-group">
      <label for="invoiceNumber">Invoice Number</label>
      <input type="text" class="form-control" id="invoiceNumber" [(ngModel)]="invoice.invoiceNumber" name="invoiceNumber" required>
    </div>
    <div class="form-group">
      <label for="jobName">Job Name</label>
      <input type="text" class="form-control" id="jobName" [(ngModel)]="jobName" name="jobName" required>
    </div>
    <div class="form-group">
      <label for="jobNumber">Job Number</label>
      <input type="text" class="form-control" id="jobNumber" [(ngModel)]="jobNumber" name="jobNumber" required>
    </div>
    <div class="form-group">
      <label for="weekEnding">Week Ending</label>
      <input type="date" class="form-control" id="weekEnding" [(ngModel)]="invoice.weekEnding" name="weekEnding" required>
    </div>
    <div class="form-group">
      <label for="totalRegularHours">Total Regular Hours</label>
      <input type="number" class="form-control" id="totalRegularHours" [(ngModel)]="invoice.totalRegularHours" name="totalRegularHours" required>
    </div>
    <div class="form-group">
      <label for="totalOvertimeHours">Total Overtime Hours</label>
      <input type="number" class="form-control" id="totalOvertimeHours" [(ngModel)]="invoice.totalOvertimeHours" name="totalOvertimeHours" required>
    </div>
    <div class="form-group">
      <label for="totalAmount">Total Amount</label>
      <input type="number" class="form-control" id="totalAmount" [(ngModel)]="invoice.totalAmount" name="totalAmount" required>
    </div>
    <h4>Invoice Employees</h4>
    <table class="table">
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>Regular Hours</th>
          <th>Overtime Hours</th>
          <th>Regular Cost</th>
          <th>Overtime Cost</th>
          <th>Total Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of invoice.invoiceEmployees; let i = index">
          <td>
            <input type="text" class="form-control" [(ngModel)]="employee.employeeName" [name]="'employeeName' + i" required>
          </td>
          <td>
            <input type="number" class="form-control" [(ngModel)]="employee.regularHours" [name]="'regularHours' + i" required>
          </td>
          <td>
            <input type="number" class="form-control" [(ngModel)]="employee.overtimeHours" [name]="'overtimeHours' + i" required>
          </td>
          <td>
            <input type="number" class="form-control" [(ngModel)]="employee.regularCost" [name]="'regularCost' + i" required>
          </td>
          <td>
            <input type="number" class="form-control" [(ngModel)]="employee.overtimeCost" [name]="'overtimeCost' + i" required>
          </td>
          <td>
            <input type="number" class="form-control" [(ngModel)]="employee.totalCost" [name]="'totalCost' + i" required>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-right">
      <button type="submit" class="btn btn-primary">Save</button>
      <button type="button" class="btn btn-secondary ml-2" (click)="navigateToInvoices()">Cancel</button>
    </div>
  </form>
</div>
```

## File: src/app/invoices/invoice-edit/invoice-edit.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/InvoiceService.service';
import { InvoiceData } from 'src/app/models/invoice-data.model';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  invoice: InvoiceData | undefined;
  jobName: string = '';
  jobNumber: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.getInvoice();
  }

getInvoice() {
  const invoiceNumber = this.route.snapshot.paramMap.get('invoiceNumber');
  if (invoiceNumber) {
    const invoiceNumberAsNumber = Number(invoiceNumber);
    if (!isNaN(invoiceNumberAsNumber)) {
      this.invoiceService.getInvoiceByNumber(invoiceNumberAsNumber).subscribe(
      );
    } else {
      console.error('Invalid invoice number:', invoiceNumber);
    }
  }
}

  updateInvoice() {
    if (this.invoice) {
      this.invoiceService.updateInvoice(this.invoice).subscribe(
        () => {
          this.router.navigate(['/invoices']);
        },
        (error: any) => {
          console.error('Error updating invoice:', error);
        }
      );
    }
  }

  navigateToInvoices() {
    this.router.navigate(['/invoices']);
  }
}
```

## File: src/app/invoices/invoices.component.css

```css
.card-header {
    cursor: pointer;
  }
  
  .card-header i {
    transition: transform 0.3s;
  }
  
  .fa-rotate-180 {
    transform: rotate(180deg);
  }
```

## File: src/app/invoices/invoices.component.html

```html
<div class="container">
  <h2 class="mb-4 mt-3">Invoices</h2>
  <div class="row mb-4">
    <div class="col-md-6">
      <input type="text" class="form-control" placeholder="Search invoices..." [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()" />
    </div>
    <div class="col-md-6">
      <input type="date" class="form-control" [(ngModel)]="weekEndingFilter" (ngModelChange)="filterByWeekEnding($event)" />
    </div>
  </div>
  <div *ngFor="let invoice of filteredInvoices" class="card mb-4">
    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center" (click)="invoice.isCollapsed = !invoice.isCollapsed">
      <h5 class="mb-0">
        {{ invoice.invoiceNumber }} | {{ invoice.job?.jobName }} | {{ invoice.weekEnding | date: 'MM-dd-yyyy' }}
      </h5>
      <i class="fas fa-chevron-down" [ngClass]="{ 'fa-rotate-180': !invoice.isCollapsed }"></i>
    </div>
    <div class="collapse" [ngClass]="{ 'show': !invoice.isCollapsed }">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <p><strong>Job Name:</strong> {{ invoice.job?.jobName }}</p>
            <p><strong>Job Number:</strong> {{ invoice.job?.jobNumber }}</p>
            <p><strong>Week Ending:</strong> {{ invoice.weekEnding | date: 'MM-dd-yyyy' }}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Total Regular Hours:</strong> {{ invoice.totalRegularHours }}</p>
            <p><strong>Total Overtime Hours:</strong> {{ invoice.totalOvertimeHours }}</p>
            <p><strong>Total Amount:</strong> {{ invoice.totalAmount | currency }}</p>
          </div>
        </div>
        <table class="table table-striped mt-4">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Regular Hours</th>
              <th>Overtime Hours</th>
              <th>Regular Cost</th>
              <th>Overtime Cost</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let employee of invoice.invoiceEmployees">
              <td>{{ employee.employeeName }}</td>
              <td>{{ employee.regularHours }}</td>
              <td>{{ employee.overtimeHours }}</td>
              <td>{{ employee.regularCost | currency }}</td>
              <td>{{ employee.overtimeCost | currency }}</td>
              <td>{{ employee.totalCost | currency }}</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-3 d-flex justify-content-end">
          <button class="btn btn-primary mr-2" (click)="editInvoice(invoice)">Edit</button>
          <button class="btn btn-danger" (click)="deleteInvoice(invoice)">Delete</button>
          <button class="btn btn-success" (click)="generatePDF(invoice)">Generate PDF</button>
        </div>
      </div>
    </div>
  </div>
</div>

<app-delete-modal *ngIf="showDeleteModal" (modalClosed)="showDeleteModal = false"></app-delete-modal>
```

## File: src/app/invoices/invoices.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/InvoiceService.service';
import { InvoiceData } from '../models/invoice-data.model';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  invoices: InvoiceData[] = [];
  showDeleteModal = false;
  filteredInvoices: InvoiceData[] = [];
  searchTerm: string = '';
  weekEndingFilter: Date | null = null;

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit() {
    this.getInvoices();
    this.fetchInvoices();
  }

  fetchInvoices() {
    this.invoiceService.getInvoices().subscribe(
      (invoices: InvoiceData[]) => {
        this.invoices = invoices;
        this.filteredInvoices = invoices;
      },
      (error: any) => {
        console.error('Error fetching invoices:', error);
      }
    );
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(
      (invoices: InvoiceData[]) => {
        this.invoices = invoices.map((invoice) => ({
          ...invoice,
          isCollapsed: false,
        }));
      },
      (error: any) => {
        console.error('Error retrieving invoices:', error);
      }
    );
  }

  updateInvoice(invoice: InvoiceData) {
    this.invoiceService.updateInvoice(invoice).subscribe(
      (updatedInvoice: InvoiceData) => {
        const index = this.invoices.findIndex(
          (i) => i.invoiceNumber === updatedInvoice.invoiceNumber
        );
        if (index !== -1) {
          this.invoices[index] = updatedInvoice;
        }
      },
      (error: any) => {
        console.error('Error updating invoice:', error);
      }
    );
  }

  deleteInvoice(invoice: InvoiceData) {
    if (invoice.invoiceNumber) {
      this.invoiceService.deleteInvoice(invoice.invoiceNumber).subscribe(
        () => {
          this.fetchInvoices();
          this.showDeleteModal = true;
        },
        (error: any) => {
          console.error('Error deleting invoice:', error);
        }
      );
    } else {
      console.error('Invoice number is undefined');
    }
  }

  editInvoice(invoice: InvoiceData) {
    this.router.navigate(['/invoices', invoice.invoiceNumber, 'edit']);
  }

  filterByWeekEnding(date: Date) {
    this.weekEndingFilter = date;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredInvoices = this.invoices.filter((invoice) => {
      const searchTermMatch = this.searchTerm
        ? invoice.invoiceNumber?.toString().includes(this.searchTerm) ||
          invoice.job?.jobName
            ?.toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          invoice.job?.jobNumber
            ?.toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        : true;

      const weekEndingMatch =
        this.weekEndingFilter !== null && this.weekEndingFilter instanceof Date
          ? invoice.weekEnding
            ? new Date(invoice.weekEnding).toISOString().slice(0, 10) ===
              this.weekEndingFilter.toISOString().slice(0, 10)
            : false
          : true;

      return searchTermMatch && weekEndingMatch;
    });
  }

  generatePDF(invoice: InvoiceData) {
    const doc = new jsPDF();
  
    const logo = new Image();
    logo.src = 'assets/images/logo-smaller.png';
    logo.onload = () => {
      const logoWidth = 35;
      const logoHeight = (296 / 515) * logoWidth;
      const logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2;
      const logoY = 10;
  
      doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('7Twenty4 Services LLC', 105, logoY + logoHeight + 10, { align: 'center' });
  
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 105, logoY + logoHeight + 20, { align: 'center' });

      doc.text(`Job Name: ${invoice.job?.jobName}`, 20, 60);
      doc.text(`Job Number: ${invoice.job?.jobNumber}`, 20, 70);
      doc.text(
        `Week Ending: ${
          invoice.weekEnding
            ? new Date(invoice.weekEnding).toLocaleDateString()
            : ''
        }`,
        20,
        80
      );

      doc.setFont('helvetica', 'bold');
      doc.text('Employee Details', 105, 100, { align: 'center' });

      doc.setFillColor(211, 211, 211);
      doc.rect(20, 110, 170, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Employee', 25, 117);
      doc.text('Regular Hours', 60, 117);
      doc.text('Overtime Hours', 95, 117);
      doc.text('Regular Cost', 130, 117);
      doc.text('Overtime Cost', 165, 117);

      doc.setFont('helvetica', 'normal');
      let y = 130;
      if (invoice.invoiceEmployees) {
        invoice.invoiceEmployees.forEach((employee) => {
          doc.text(employee.employeeName, 25, y);
          doc.text(employee.regularHours.toString(), 70, y, { align: 'right' });
          doc.text(employee.overtimeHours.toString(), 105, y, {
            align: 'right',
          });
          doc.text(`$${employee.regularCost.toFixed(2)}`, 140, y, {
            align: 'right',
          });
          doc.text(`$${employee.overtimeCost.toFixed(2)}`, 175, y, {
            align: 'right',
          });
          y += 10;
        });
      }

      doc.setFont('helvetica', 'bold');
      doc.text('Total Regular Hours:', 20, y + 20);
      doc.text(invoice.totalRegularHours?.toString() ?? '', 70, y + 20, {
        align: 'left',
      });
      doc.text('Total Overtime Hours:', 20, y + 30);
      doc.text(invoice.totalOvertimeHours?.toString() ?? '', 70, y + 30, {
        align: 'left',
      });
      doc.text('Total Amount:', 20, y + 40);
      doc.text(`$${invoice.totalAmount?.toFixed(2) ?? ''}`, 70, y + 40, {
        align: 'left',
      });

      doc.save(`invoice_${invoice.invoiceNumber}.pdf`);
    };
  }
}

```

## File: src/app/jobs/create-job-modal/create-job-modal.component.html

```html
<div class="modal-header">
    <h4 class="modal-title">Create New Job</h4>
  </div>
  <div class="modal-body">
    <form>
      <div class="form-group">
        <label for="jobName">Job Name</label>
        <input type="text" class="form-control" id="jobName" [(ngModel)]="job.jobName" name="jobName">
      </div>
      <div class="form-group">
        <label for="jobNumber">Job ID</label>
        <input type="text" class="form-control" id="jobNumber" [(ngModel)]="job.jobNumber" name="jobNumber">
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="createJob()">Create</button>
    <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Cancel</button>
  </div>
```

## File: src/app/jobs/create-job-modal/create-job-modal.component.ts

```typescript
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-create-job-modal',
  templateUrl: './create-job-modal.component.html'
})
export class CreateJobModalComponent {
  job: Job = {
    jobName: '',
  };

  constructor(
    public activeModal: NgbActiveModal,
    private jobService: JobService
  ) { }

  createJob() {
    this.jobService.createJob(this.job).subscribe(
      (createdJob: Job) => {
        console.log('Job created successfully:', createdJob);
        this.activeModal.close();
      },
      (error) => {
        console.error('Error creating job:', error);
      }
    );
  }
}
```

## File: src/app/jobs/delete-confirmation-modal/delete-confirmation-modal.component.html

```html

```

## File: src/app/jobs/delete-confirmation-modal/delete-confirmation-modal.component.ts

```typescript
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-delete-confirmation-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirm Deletion</h4>
    </div>
    <div class="modal-body">
      <p>
        Are you sure you want to delete the job "{{
          job?.jobName || 'Unknown'
        }}"?
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" (click)="confirm()">
        Delete
      </button>
      <button type="button" class="btn btn-secondary" (click)="dismiss()">
        Cancel
      </button>
    </div>
  `,
})
export class DeleteConfirmationModal {
  @Input() job: Job | null = null;

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}

```

## File: src/app/jobs/edit-job-modal/edit-job-modal.component.html

```html
<div class="modal-header">
    <h4 class="modal-title">Edit Job</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form [formGroup]="editJobForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="jobName">Job Name</label>
        <input type="text" class="form-control" id="jobName" formControlName="jobName" required>
      </div>
      <div class="form-group">
        <label for="jobNumber">Job Number</label>
        <input type="text" class="form-control" id="jobNumber" formControlName="jobNumber" required>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss('Cancel click')">Cancel</button>
        <button type="submit" class="btn btn-primary" [disabled]="!editJobForm.valid">Save</button>
      </div>
    </form>
  </div>
```

## File: src/app/jobs/edit-job-modal/edit-job-modal.component.ts

```typescript
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from '../../models/job.model';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-edit-job-modal',
  templateUrl: './edit-job-modal.component.html'
})
export class EditJobModalComponent implements OnInit {
  @Input() job!: Job;
  editJobForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.editJobForm = this.formBuilder.group({
      jobName: [this.job.jobName, Validators.required],
      jobNumber: [this.job.jobNumber, Validators.required],
    });
  }

  onSubmit() {
    if (this.editJobForm.valid) {
      const updatedJob: Job = {
        ...this.job,
        ...this.editJobForm.value
      };
      this.jobService.updateJob(updatedJob).subscribe(
        () => {
          this.activeModal.close('success');
        },
        (error) => {
          console.error('Error updating job:', error);
        }
      );
    }
  }
}
```

## File: src/app/jobs/jobs.component.css

```css

```

## File: src/app/jobs/jobs.component.html

```html
<div class="container">
  <div class="row align-items-center mb-4">
    <div class="col">
      <h2 class="mt-4">Jobs</h2>
    </div>
    <div class="col-md-6">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Search jobs..." [(ngModel)]="searchTerm" (ngModelChange)="applyFilters()" id="search-bar" />
        <div class="input-group-append">
        </div>
      </div>
    </div>
    <div class="col-md-3 text-right">
      <button class="btn btn-success" (click)="openCreateJobModal()">
        <i class="fas fa-plus mr-2"></i>Create Job
      </button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>Job Name</th>
          <th>Job Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let job of filteredJobs">
          <td>{{ job.jobName }}</td>
          <td>{{ job.jobNumber }}</td>
          <td>
            <button class="btn btn-primary btn-sm mr-2" (click)="openEditJobModal(job)">
              <i class="fas fa-edit mr-1"></i>Edit
            </button>
            <button class="btn btn-danger btn-sm" (click)="openDeleteConfirmation(job)">
              <i class="fas fa-trash-alt mr-1"></i>Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="d-flex justify-content-center mt-4">
    <nav>
      <ul class="pagination">
        <li class="page-item" [class.disabled]="currentPage === 1">
          <a class="page-link" (click)="previousPage()" tabindex="-1" aria-disabled="true">Previous</a>
        </li>
        <li class="page-item" *ngFor="let page of createRange(getCeilOfTotalItems())" [class.active]="page + 1 === currentPage">
          <a class="page-link" (click)="goToPage(page + 1)">{{ page + 1 }}</a>
        </li>
        <li class="page-item" [class.disabled]="currentPage === getCeilOfTotalItems()">
          <a class="page-link" (click)="nextPage()">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</div>
```

## File: src/app/jobs/jobs.component.ts

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from '../models/job.model';
import { JobService } from '../services/job.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationModal } from './delete-confirmation-modal/delete-confirmation-modal.component';
import { SuccessModal } from './success-modal/success-modal.component';
import { CreateJobModalComponent } from './create-job-modal/create-job-modal.component';
import { EditJobModalComponent } from './edit-job-modal/edit-job-modal.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchTerm: string = '';
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;

  constructor(private jobService: JobService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getAllJobs().subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  applyFilters() {
    this.filteredJobs = this.jobs.filter(job => job.jobName?.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.totalItems = this.filteredJobs.length;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredJobs = this.filteredJobs.slice(startIndex, endIndex);
  }

  openDeleteConfirmation(job: Job) {
    const modalRef = this.modalService.open(DeleteConfirmationModal);
    modalRef.componentInstance.job = job;
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.deleteJob(job);
        }
      },
      (reason) => {}
    );
  }

  deleteJob(job: Job) {
    const jobId = job.jobId;

    if (jobId !== undefined) {
      this.jobService.deleteJob(jobId).subscribe(
        () => {
          this.getJobs();
          const modalRef = this.modalService.open(SuccessModal);
          modalRef.componentInstance.message = `Job "${job.jobName}" has been deleted successfully.`;
        },
        (error) => {
          console.error('Error deleting job:', error);
        }
      );
    } else {
      console.error('Invalid job ID');
    }
  }

  openCreateJobModal() {
    const modalRef = this.modalService.open(CreateJobModalComponent);
    modalRef.result.then(
      () => {
        this.getJobs();
      },
      () => {
      }
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= Math.ceil(this.totalItems / this.pageSize)) {
      this.currentPage = page;
      this.applyFilters();
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }
  
  nextPage() {
    if (this.currentPage < Math.ceil(this.totalItems / this.pageSize)) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  createRange(count: number) {
    return Array.from(Array(count), (_, i) => i);
  }

  getCeilOfTotalItems(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  openEditJobModal(job: Job) {
    const modalRef = this.modalService.open(EditJobModalComponent);
    modalRef.componentInstance.job = job;
    modalRef.result.then(
      () => {
        this.getJobs();
      },
      () => {
      }
    );
  }
}

```

## File: src/app/jobs/success-modal/success-modal.component.html

```html

```

## File: src/app/jobs/success-modal/success-modal.component.ts

```typescript
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-success-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Success</h4>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close()">OK</button>
    </div>
  `
})
export class SuccessModal {
    @Input() message: string = '';

  constructor(public activeModal: NgbActiveModal) {}
}
```

## File: src/app/login/login.component.css

```css

```

## File: src/app/login/login.component.html

```html
<div class="container">
  <div class="row justify-content-center align-items-center vh-100">
    <div class="col-md-6">
      <div class="card shadow">
        <div class="card-header bg-primary text-white">
          <h3 class="mb-0 text-center">Login</h3>
        </div>
        <div class="card-body">
          <form (ngSubmit)="loginAsEvaluator()" #loginForm="ngForm">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" class="form-control" id="username" [(ngModel)]="username" name="username" required #usernameInput="ngModel">
              <div *ngIf="usernameInput.invalid && (usernameInput.dirty || usernameInput.touched)" class="text-danger">
                <small *ngIf="usernameInput.errors?.['required']">Username is required.</small>
              </div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" [(ngModel)]="password" name="password" required #passwordInput="ngModel">
              <div *ngIf="passwordInput.invalid && (passwordInput.dirty || passwordInput.touched)" class="text-danger">
                <small *ngIf="passwordInput.errors?.['required']">Password is required.</small>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block mt-3" [disabled]="loginForm.invalid">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
```

## File: src/app/login/login.component.spec.ts

```typescript
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "./login.component";
import { UserService } from "../services/user.service";
import { AuthService } from "../auth/auth.service";
import { of, throwError } from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'dashboard', component: LoginComponent }
        ]),
        FormsModule
      ],
      providers: [
        UserService,
        AuthService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should log in with valid credentials and navigate to dashboard', () => {
    spyOn(userService, 'loginAsEvaluator').and.returnValue(of({ success: true }));
    spyOn(authService, 'login');
    component.username = 'testuser';
    component.password = 'testpassword';
    component.loginAsEvaluator();
    expect(userService.loginAsEvaluator).toHaveBeenCalledWith('testuser', 'testpassword');
    expect(authService.login).toHaveBeenCalledWith('testuser', 'testpassword');
  });

  it('should handle login with invalid credentials', () => {
    const errorResponse = { status: 400, message: 'Invalid credentials' };
    spyOn(userService, 'loginAsEvaluator').and.returnValue(throwError(errorResponse));
    spyOn(console, 'error');
    component.username = 'invaliduser';
    component.password = 'invalidpassword';
    component.loginAsEvaluator();
    expect(userService.loginAsEvaluator).toHaveBeenCalledWith('invaliduser', 'invalidpassword');
    expect(console.error).toHaveBeenCalledWith('Login failed:', errorResponse);
    expect(console.error).toHaveBeenCalledWith('Invalid credentials');
  });
});
```

## File: src/app/login/login.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
  }

  loginAsEvaluator() {
    this.userService.loginAsEvaluator(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.authService.login(response.token);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        if (error.status === 400) {
          console.error('Invalid credentials');
        } else {
          console.error('An error occurred:', error.message);
        }
      }
    );
  }  
}
```

## File: src/app/models/employee-hours.interface.ts

```typescript
export interface EmployeeHours {
    employee?: any;
    mondayHours?: number;
    tuesdayHours?: number;
    wednesdayHours?: number;
    thursdayHours?: number;
    fridayHours?: number;
    saturdayHours?: number;
    sundayHours?: number;
  }
```

## File: src/app/models/employee.model.ts

```typescript
export interface Employee {
  employeeId: number;
  name: string;
  hireDate: Date;
  jobTitle: string;
  email: string;
  hourlyWage: number;
  fica: number;
  lastRaiseDate: Date;
  insurance: number;
  vacationHoliday: number;
  carFuel: number;
  markup: number;
  rate: number;
  burdenedRate: number;
  burdenedOtRate: number;
  notes: string;
  lastVacationDate: Date;
  vacationDaysUsed: number;
}
```

## File: src/app/models/invoice-data.model.ts

```typescript
import { Job } from "./job.model";

export interface InvoiceData {
  invoiceId?: number;
  job?: {
    jobId: number;
    jobName: string;
    jobNumber: string;
  };
  weekEnding?: Date;
  invoiceNumber?: number;
  totalRegularHours?: number;
  totalOvertimeHours?: number;
  totalAmount?: number;
  invoiceEmployees?: InvoiceEmployeeData[];
  isCollapsed?: boolean;
}

export interface InvoiceEmployeeData {
  employeeId: number;
  employeeName: string;
  regularHours: number;
  overtimeHours: number;
  burdenedRate: number;
  burdenedOtRate: number;
  regularCost: number;
  overtimeCost: number;
  totalCost: number;
}
```

## File: src/app/models/InvoiceItem.interface.ts

```typescript
import { Employee } from "./employee.model";

export interface InvoiceItem {
    employee: Employee;
    regularHours: number;
    overtimeHours: number;
    burdenedRate: number;
    overtimeBurdenedRate: number;
    totalAmount: number;
  }
```

## File: src/app/models/job.model.ts

```typescript
export interface Job {
    jobId?: number;
    jobName?: string;
    jobNumber?: string;
    isCollapsed?: boolean;
  }
```

## File: src/app/models/mock-employee.ts

```typescript
// mock-employee.ts
import { Employee } from './employee.model';

export const mockEmployee: Employee = {
  employeeId: 1,
  name: 'John Doe',
  hireDate: new Date('2021-01-01'),
  jobTitle: 'Software Engineer',
  email: 'john.doe@example.com',
  hourlyWage: 25.0,
  fica: 0.0765,
  lastRaiseDate: new Date('2022-01-01'),
  insurance: 1.07,
  vacationHoliday: 0.97,
  carFuel: 0.0,
  markup: 4.25,
  rate: 33.29,
  burdenedRate: 33.29,
  burdenedOtRate: 49.94,
  notes: "null",
  lastVacationDate: new Date('2023-06-01'),
  vacationDaysUsed: 5
};
```

## File: src/app/models/mock-employees.ts

```typescript
import { Employee } from './employee.model';

export const mockEmployees: Employee[] = [
  {
    employeeId: 83,
    name: 'John Doe',
    hireDate: new Date('2021-04-19'),
    jobTitle: 'Apprentice Electrician',
    email: 'john.doe@example.com',
    hourlyWage: 15.00,
    fica: 1.20,
    lastRaiseDate: new Date('2023-04-19'),
    insurance: 1.07,
    vacationHoliday: 0.97,
    carFuel: 0.00,
    markup: 4.25,
    rate: 22.49,
    burdenedRate: 22.49,
    burdenedOtRate: 33.74,
    notes: "First Employee",
    lastVacationDate: new Date('2023-06-01'),
    vacationDaysUsed: 5
  },
  {
    employeeId: 84,
    name: 'Jane Smith',
    hireDate: new Date('2022-02-10'),
    jobTitle: 'Apprentice Electrician',
    email: 'jane.smith@example.com',
    hourlyWage: 16.50,
    fica: 1.32,
    lastRaiseDate: new Date('2023-02-10'),
    insurance: 1.07,
    vacationHoliday: 0.97,
    carFuel: 0.00,
    markup: 4.50,
    rate: 24.36,
    burdenedRate: 24.36,
    burdenedOtRate: 36.54,
    notes: "Second Employee",
    lastVacationDate: new Date('2023-07-01'),
    vacationDaysUsed: 7
  },
  {
    employeeId: 111,
    name: 'Liam Nelson',
    hireDate: new Date('2023-02-26'),
    jobTitle: 'Apprentice Electrician',
    email: 'liam.nelson@example.com',
    hourlyWage: 34.50,
    fica: 2.76,
    lastRaiseDate: new Date('2023-02-25'),
    insurance: 1.07,
    vacationHoliday: 0.97,
    carFuel: 4.00,
    markup: 4.25,
    rate: 47.55,
    burdenedRate: 47.55,
    burdenedOtRate: 71.33,
    notes: "Third Employee",
    lastVacationDate: new Date('2025-10-01'),
    vacationDaysUsed: 7
  }
];
```

## File: src/app/models/timesheet.model.ts

```typescript
import { EmployeeHours } from './employee-hours.interface';
import { Employee } from './employee.model';
import { Job } from './job.model';

export class Timesheet {
  timesheetId?: number;
  employee?: Employee;
  job?: Job;
  weekEnding?: Date;
  mondayHours?: number;
  tuesdayHours?: number;
  wednesdayHours?: number;
  thursdayHours?: number;
  fridayHours?: number;
  saturdayHours?: number;
  sundayHours?: number;
  totalHours?: number;
  employeeHours?: EmployeeHours[];
  regularHours?: number;
  overtimeHours?: number;
}
```

## File: src/app/navbar/navbar.component.css

```css

```

## File: src/app/navbar/navbar.component.html

```html
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container">
    <a class="navbar-brand py-2" routerLink="/dashboard">
      <img src="assets/images/724.png" alt="7Twenty4 Logo" height="40">
      <span class="ml-2"></span>
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" routerLink="/employee-information" routerLinkActive="active">
            <i class="fas fa-user-circle mr-2"></i> Employee Information
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/timesheets" routerLinkActive="active">
            <i class="fas fa-clock mr-2"></i> Timesheets
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/invoices" routerLinkActive="active">
            <i class="fas fa-file-invoice-dollar mr-2"></i> Invoices
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/jobs" routerLinkActive="active">
            <i class="fas fa-briefcase mr-2"></i> Jobs
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/reports" routerLinkActive="active">
            <i class="fas fa-chart-bar mr-2"></i> Reports
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

## File: src/app/navbar/navbar.component.ts

```typescript
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
}
```

## File: src/app/pipes/filter.pipe.ts

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return items;
    }
    
    searchTerm = searchTerm.toLowerCase();
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchTerm);
      });
    });
  }
}
```

## File: src/app/services/employee-hours-report.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHoursReportService {
  private apiUrl = 'http://localhost:8080/api/employee-hours-report';
  // private apiUrl = 'https://backend-wkmoyuzlnq-uc.a.run.app/api/employee-hours-report';

  constructor(private http: HttpClient) { }

  getEmployeeHoursReport(weekEnding: string): Observable<any> {
    const url = `${this.apiUrl}?weekEnding=${weekEnding}`;
    return this.http.get(url);
  }
}
```

## File: src/app/services/employee.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Timesheet } from '../models/timesheet.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';
  // private apiUrl = 'https://backend-wkmoyuzlnq-uc.a.run.app/api/employees';


  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/all`);
  }
  
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.put<Employee>(url, employee);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}`, employee);
  }

  getTimesheetsByWeekEnding(weekEnding: Date): Observable<Timesheet[]> {
    const url = `${this.apiUrl}?weekEnding=${weekEnding.toISOString()}`;
    return this.http.get<Timesheet[]>(url);
  }
}
```

## File: src/app/services/InvoiceService.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { InvoiceData } from '../models/invoice-data.model';
import { InvoiceEmployeeData } from '../models/invoice-data.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8080/api/invoices';
  // private apiUrl = 'https://backend-wkmoyuzlnq-uc.a.run.app/api/invoices';

  constructor(private http: HttpClient) {}

  createInvoice(invoiceData: InvoiceData): Observable<InvoiceData> {
    return this.http.post<InvoiceData>(`${this.apiUrl}`, invoiceData);
  }

  getInvoices(): Observable<InvoiceData[]> {
    return this.http.get<InvoiceData[]>(`${this.apiUrl}`);
  }

  saveInvoiceEmployees(
    invoiceEmployees: InvoiceEmployeeData[]
  ): Observable<InvoiceEmployeeData[]> {
    const url = `${this.apiUrl}/invoice-employees`;
    return this.http.post<InvoiceEmployeeData[]>(url, invoiceEmployees);
  }

  createInvoiceWithEmployees(invoice: InvoiceData): Observable<InvoiceData> {
    const url = `${this.apiUrl}/create-with-employees`;
    return this.http.post<InvoiceData>(url, invoice);
  }

  updateInvoice(invoice: InvoiceData): Observable<InvoiceData> {
    const url = `${this.apiUrl}/${invoice.invoiceId}`;
    console.log('invoiceId: ' + invoice.invoiceId);
    return this.http.put<InvoiceData>(url, invoice);
  }

  deleteInvoice(invoiceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${invoiceId}`);
  }

  getInvoiceByNumber(invoiceNumber: number): Observable<InvoiceData> {
    return this.http.get<InvoiceData>(`${this.apiUrl}/${invoiceNumber}`);
  }

  invoiceExists(jobId: number, weekEnding: Date): Observable<boolean> {
    const weekEndingString = weekEnding.toISOString().slice(0, 10);
    const url = `${this.apiUrl}?jobId=${jobId}&weekEnding=${weekEndingString}`;

    return this.http
      .get<any[]>(url)
      .pipe(map((invoices) => invoices.length > 0));
  }

  getInvoiceByJobAndWeekEnding(jobId: number, weekEnding: Date): Observable<InvoiceData> {
    const weekEndingString = weekEnding.toISOString().slice(0, 10);
    const url = `${this.apiUrl}/job/${jobId}/weekEnding/${weekEndingString}`;
    return this.http.get<InvoiceData>(url);
  }

  getNextInvoiceNumber(): Observable<number> {
    const url = `${this.apiUrl}/next-number`;
    return this.http.get<number>(url);
  }

  getInvoicesByWeekEnding(weekEnding: Date): Observable<InvoiceData[]> {
    const url = `${this.apiUrl}?weekEnding=${weekEnding.toISOString()}`;
    return this.http.get<InvoiceData[]>(url);
  }
}

```

## File: src/app/services/job.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/jobs';
  // private apiUrl = 'https://backend-wkmoyuzlnq-uc.a.run.app/api/jobs'; 


  constructor(private http: HttpClient) { }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(job: Job): Observable<Job> {
    const url = `${this.apiUrl}/${job.jobId}`;
    return this.http.put<Job>(url, job);
  }

  deleteJob(jobId: number): Observable<void> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.delete<void>(url);
  }

  getActiveJobs(): Observable<Job[]> {
    const url = `${this.apiUrl}?status=active`;
    return this.http.get<Job[]>(url);
  }
}
```

## File: src/app/services/timesheet.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timesheet } from '../models/timesheet.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = 'http://localhost:8080/api/timesheets';
  // private baseUrl = 'https://backend-wkmoyuzlnq-uc.a.run.app/api/timesheets';

  constructor(private http: HttpClient) { }

  getTimesheets(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.baseUrl}`);
  }

  addTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    return this.http.post<Timesheet>(`${this.baseUrl}`, timesheet);
  }

  updateTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    const url = `${this.baseUrl}/${timesheet.timesheetId}`;
    return this.http.put<Timesheet>(url, timesheet);
  }

  deleteTimesheet(timesheetId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${timesheetId}`);
  }

  addTimesheets(timesheets: Timesheet[]): Observable<Timesheet[]> {
    return this.http.post<Timesheet[]>(`${this.baseUrl}`, timesheets);
  }

  getTimesheetById(timesheetId: number): Observable<Timesheet> {
    return this.http.get<Timesheet>(`${this.baseUrl}/${timesheetId}`);
  }

  getEmployeeHoursByWeekEnding(weekEnding: any): Observable<{ employee: string, totalHours: number }[]> {
    const weekEndingDate = new Date(weekEnding);
    console.log('Original weekEnding value:', weekEnding);
    console.log('weekEndingDate:', weekEndingDate);
    const formattedDate = weekEndingDate.toISOString().slice(0, 10);
    console.log('Formatted date:', formattedDate);
    const url = `${this.baseUrl}/employee-hours?weekEnding=${formattedDate}`;
    console.log('URL:', url);
    return this.http.get<{ employee: string, totalHours: number }[]>(url);
  }

  getTimesheetsByWeekEnding(weekEnding: Date): Observable<Timesheet[]> {
    const url = `${this.baseUrl}?weekEnding=${weekEnding.toISOString()}`;
    return this.http.get<Timesheet[]>(url);
  }
}

```

## File: src/app/services/user.service.ts

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';
  // private baseUrl = 'https://backend-wkmoyuzlnq-uc.a.run.app/api/users';
  private token: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  loginAsEvaluator(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<any>(`${this.baseUrl}/login`, credentials, { headers })
      .pipe(
        tap((response) => {
          this.token = response.token;
        })
      );
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
}

```

## File: src/app/timesheets/ConfirmationModal/confirmation-modal.component.html

```html
<!-- confirmation-modal.component.html -->

<div class="modal-header">
    <h4 class="modal-title">Confirmation</h4>
    <button type="button" class="close" (click)="activeModal.dismiss()">&times;</button>
  </div>
  <div class="modal-body">
    <p>An invoice already exists for this timesheet. Do you want to overwrite it?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary" (click)="confirm()">Yes</button>
    <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">No</button>
  </div>
```

## File: src/app/timesheets/ConfirmationModal/confirmation-modal.component.ts

```typescript
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  onConfirm: () => void = () => {};

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.onConfirm();
    this.activeModal.close();
  }
}
```

## File: src/app/timesheets/employee-hours/employee-hours.component.css

```css

```

## File: src/app/timesheets/employee-hours/employee-hours.component.html

```html
<div class="container">
    <h2>Employee Hours</h2>
    <div class="form-group mt-3">
      <label for="weekEnding">Week Ending:</label>
      <input type="date" class="form-control" id="weekEnding" [(ngModel)]="weekEnding" required>
    </div>
    <button class="btn btn-primary mt-3" (click)="getEmployeeHours()">Get Employee Hours</button>
  </div>
  
  <div class="modal" tabindex="-1" role="dialog" [ngStyle]="{ display: showModal ? 'block' : 'none' }">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Employee Hours</h5>
          <button type="button" class="close" (click)="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let eh of employeeHours">
                <td>{{ eh.employee }}</td>
                <td>{{ eh.totalHours }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" (click)="closeModal()">Close</button>
          <button type="button" class="btn btn-primary" (click)="shareByEmail()">Share by Email</button>
        </div>
      </div>
    </div>
  </div>
```

## File: src/app/timesheets/employee-hours/employee-hours.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/services/timesheet.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'app-employee-hours',
  templateUrl: './employee-hours.component.html',
  styleUrls: ['./employee-hours.component.css']
})
export class EmployeeHoursComponent implements OnInit {
  employees: Employee[] = [];
  weekEnding: Date | null = null;
  employeeHours: { employee: string, totalHours: number }[] = [];
  showModal = false;

  constructor(
    private timesheetService: TimesheetService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getEmployeeHours() {
    if (this.weekEnding) {
      this.timesheetService.getEmployeeHoursByWeekEnding(this.weekEnding).subscribe(
        (employeeHours: { employee: string, totalHours: number }[]) => {
          this.employeeHours = employeeHours;
          this.showModal = true;
        },
        (error: any) => {
          console.error('Error fetching employee hours:', error);
        }
      );
    }
  }

  closeModal() {
    this.showModal = false;
  }

  shareByEmail() {
    const emailBody = this.employeeHours.map(eh => `${eh.employee}: ${eh.totalHours} hours`).join('\n');
  
    let emailSubject = 'Employee Hours';
    if (this.weekEnding) {
      const weekEndingDate = new Date(this.weekEnding);
      emailSubject += ` for Week Ending ${weekEndingDate.toDateString()}`;
    }
  
    const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = emailUrl;
  }
}
```

## File: src/app/timesheets/sunday-validator.directive.ts

```typescript
import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appSaturdayValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SaturdayValidatorDirective),
      multi: true
    }
  ]
})
export class SaturdayValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const selectedDate = new Date(control.value);
    const dayOfWeek = selectedDate.getUTCDay();
    return dayOfWeek === 6 ? null : { 'saturdayValidator': true };
  }
}
```

## File: src/app/timesheets/timesheets.component.css

```css

```

## File: src/app/timesheets/timesheets.component.html

```html
<div class="container">
  <h2 class="mb-4 mt-3">Timesheets</h2>
  <div class="row mb-4">
    <div class="col-md-4">
      <div class="input-group">
        <div class="input-group-prepend">
        </div>
        <input type="text" class="form-control" placeholder="Filter by Job Name" [(ngModel)]="jobNameFilter">
      </div>
    </div>
    <div class="col-md-4">
      <div class="input-group">
        <div class="input-group-prepend">
        </div>
        <input type="text" class="form-control" placeholder="Filter by Job Number" [(ngModel)]="jobNumberFilter">
      </div>
    </div>
    <div class="col-md-4">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
        </div>
        <input type="date" class="form-control" [(ngModel)]="weekEndingFilter">
      </div>
    </div>
  </div>
  <div class="text-center mb-4">
    <button class="btn btn-primary mx-2" (click)="goToEmployeeHours()">View Employee Hours</button>
    <button class="btn btn-success mx-2" (click)="openAddTimesheetModal()">Add Timesheet</button>
  </div>
  <div *ngFor="let jobGroup of groupedTimesheets()" class="card mb-4">
    <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center" (click)="jobGroup.isCollapsed = !jobGroup.isCollapsed">
      <h5 class="mb-0">{{ jobGroup.jobNumber }} | {{ jobGroup.jobName }}</h5>
      <i class="fas" [ngClass]="{ 'fa-chevron-down': !jobGroup.isCollapsed, 'fa-chevron-up': jobGroup.isCollapsed }"></i>
    </div>
    <div class="collapse" [ngClass]="{ 'show': !jobGroup.isCollapsed }">
      <div class="card-body">
        <div *ngFor="let weekGroup of jobGroup.weekGroups" class="mb-4">
          <h4 class="mb-3">Week Ending: {{ weekGroup.weekEnding | date : "MM-dd-yyyy" }}</h4>
          <table class="table table-striped table-bordered">
            <thead class="thead-dark">
              <tr>
                <th>Employee Name</th>
                <th>Regular Hours</th>
                <th>OT Hours</th>
                <th>Total Hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let timesheet of weekGroup.timesheets">
                <td>{{ timesheet.employee?.name }}</td>
                <td>{{ timesheet.regularHours }}</td>
                <td>{{ timesheet.overtimeHours }}</td>
                <td>{{ timesheet.totalHours }}</td>
                <td>
                  <button class="btn btn-primary btn-sm mr-2" (click)="openEditTimesheetModal(timesheet.timesheetId)">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <button class="btn btn-danger btn-sm" (click)="deleteTimesheet(timesheet)">
                    <i class="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 d-flex justify-content-end">
          <button class="btn btn-success" (click)="generateInvoice(jobGroup)">Generate Invoice</button>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="modal fade" id="addTimesheetModal" tabindex="-1" role="dialog" [ngClass]="{ 'show': addTimesheetModalOpen }" [ngStyle]="{ 'display': addTimesheetModalOpen ? 'block' : 'none' }">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Timesheet</h5>
        <button type="button" class="close" (click)="closeAddTimesheetModal()">&times;</button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="job">Job:</label>
            <select class="form-control" id="job" [(ngModel)]="newTimesheet.job" name="job" required>
              <option *ngFor="let job of jobs" [ngValue]="job">{{ job.jobName }} - {{ job.jobNumber }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="weekEnding">Week Ending:</label>
            <input type="date" class="form-control" id="weekEnding" [(ngModel)]="newTimesheet.weekEnding" name="weekEnding" required appSaturdayValidator #weekEndingInput="ngModel">
            <div *ngIf="weekEndingInput?.invalid && (weekEndingInput?.dirty || weekEndingInput?.touched)" class="text-danger">
              <div *ngIf="weekEndingInput?.errors?.['required']">Week Ending is required.</div>
              <div *ngIf="weekEndingInput?.errors?.['saturdayValidator']">Week Ending must be a Saturday.</div>
            </div>
          </div>
          <div class="form-group">
            <label>Employee Hours:</label>
            <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th>Employee</th>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                  <th>Sunday</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let employeeHours of newTimesheet.employeeHours; let i = index">
                  <td>
                    <select class="form-control" [(ngModel)]="employeeHours.employee" [ngModelOptions]="{ standalone: true }" required>
                      <option *ngFor="let employee of employees" [ngValue]="employee">{{ employee.name }}</option>
                    </select>
                  </td>
                  <td>
                    <input type="number" class="form-control" [(ngModel)]="employeeHours.mondayHours" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
                  </td>
                  <td>
                    <input type="number" class="form-control" [(ngModel)]="employeeHours.tuesdayHours" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
                  </td>
                  <td>
                    <input type="number" class="form-control" [(ngModel)]="employeeHours.wednesdayHours" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
                  </td>
                  <td>
                    <input type="number" class="form-control" [(ngModel)]="employeeHours.thursdayHours" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
                  </td>
                  <td>
                    <input type="number" class="form-control" [(ngModel)]="employeeHours.fridayHours" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
                  </td>
                  <td>
                    <input type="number" class="form-control" [(ngModel)]="employeeHours.saturdayHours" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
                  </td>
                  <td>
                    <input type="number" class="form-control" [(ngModel)]="employeeHours.sundayHours" [ngModelOptions]="{ standalone: true }" min="0" step="0.01">
                  </td>
                  <td>
                    <button class="btn btn-danger btn-sm" (click)="removeEmployeeHours(i)">
                      <i class="fas fa-trash"></i> Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <button class="btn btn-secondary btn-sm" (click)="addEmployeeHours()">Add Employee Hours</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="addTimesheet()">Add Timesheet</button>
        <button type="button" class="btn btn-secondary" (click)="closeAddTimesheetModal()">Cancel</button>
      </div>
    </div>
  </div>
</div>
<div
  class="modal"
  tabindex="-1"
  role="dialog"
  [ngStyle]="{ display: editTimesheetModalOpen ? 'block' : 'none' }"
>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Timesheet</h5>
        <button type="button" class="close" (click)="closeEditTimesheetModal()">
          &times;
        </button>
      </div>
      <div class="modal-body" *ngIf="selectedTimesheet">
        <form>
          <div class="form-group">
            <label for="job">Job:</label>
            <select
              class="form-control"
              id="job"
              [(ngModel)]="selectedTimesheet.job"
              name="job"
              required
            >
              <option *ngFor="let job of jobs" [ngValue]="job">
                {{ job.jobName }} - {{ job.jobNumber }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="weekEnding">Week Ending:</label>
            <input
              type="date"
              class="form-control"
              id="weekEnding"
              [ngModel]="selectedTimesheet.weekEnding | date : 'yyyy-MM-dd'"
              (ngModelChange)="selectedTimesheet.weekEnding = $event"
              name="weekEnding"
              required
            />
          </div>
          <div class="form-group">
            <label for="employee">Employee:</label>
            <select
              class="form-control"
              id="employee"
              [(ngModel)]="selectedTimesheet.employee"
              name="employee"
              required
            >
              <option *ngFor="let employee of employees" [ngValue]="employee">
                {{ employee.name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Employee Hours:</label>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Monday</th>
                  <th>Tuesday</th>
                  <th>Wednesday</th>
                  <th>Thursday</th>
                  <th>Friday</th>
                  <th>Saturday</th>
                  <th>Sunday</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  *ngFor="
                    let employeeHours of selectedTimesheet.employeeHours;
                    let i = index
                  "
                >
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="employeeHours.mondayHours"
                      [ngModelOptions]="{ standalone: true }"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="employeeHours.tuesdayHours"
                      [ngModelOptions]="{ standalone: true }"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="employeeHours.wednesdayHours"
                      [ngModelOptions]="{ standalone: true }"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="employeeHours.thursdayHours"
                      [ngModelOptions]="{ standalone: true }"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="employeeHours.fridayHours"
                      [ngModelOptions]="{ standalone: true }"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="employeeHours.saturdayHours"
                      [ngModelOptions]="{ standalone: true }"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      class="form-control"
                      [(ngModel)]="employeeHours.sundayHours"
                      [ngModelOptions]="{ standalone: true }"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td>
                    <button
                      class="btn btn-danger btn-sm"
                      (click)="removeEmployeeHours(i)"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-primary"
          (click)="updateTimesheet()"
          [disabled]="!selectedTimesheet"
        >
          Update Timesheet
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          (click)="closeEditTimesheetModal()"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
<div
  class="modal"
  tabindex="-1"
  role="dialog"
  [ngStyle]="{ display: invoiceModalOpen ? 'block' : 'none' }"
>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Invoice Details</h5>
        <button type="button" class="close" (click)="closeInvoiceModal()">
          &times;
        </button>
      </div>
      <div class="modal-body" *ngIf="selectedInvoice">
        <div class="row">
          <div class="col-md-6">
            <p><strong>Invoice Number:</strong> {{ selectedInvoice.invoiceNumber }}</p>
            <p><strong>Job Name:</strong> {{ selectedInvoice.job?.jobName }}</p>
            <p><strong>Job Number:</strong> {{ selectedInvoice.job?.jobNumber }}</p>
            <p><strong>Week Ending:</strong> {{ selectedInvoice.weekEnding | date : 'MM-dd-yyyy' }}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Total Regular Hours:</strong> {{ selectedInvoice.totalRegularHours }}</p>
            <p><strong>Total Overtime Hours:</strong> {{ selectedInvoice.totalOvertimeHours }}</p>
            <p><strong>Total Amount:</strong> {{ selectedInvoice.totalAmount | currency }}</p>
          </div>
        </div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Regular Hours</th>
              <th>Overtime Hours</th>
              <th>Regular Cost</th>
              <th>Overtime Cost</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let employee of selectedInvoice.invoiceEmployees">
              <td>{{ employee.employeeName }}</td>
              <td>{{ employee.regularHours }}</td>
              <td>{{ employee.overtimeHours }}</td>
              <td>{{ employee.regularCost | currency }}</td>
              <td>{{ employee.overtimeCost | currency }}</td>
              <td>{{ employee.totalCost | currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="closeInvoiceModal()">
          Close
        </button>
      </div>
    </div>
  </div>
</div>

```

## File: src/app/timesheets/timesheets.component.ts

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { Timesheet } from '../models/timesheet.model';
import { TimesheetService } from '../services/timesheet.service';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { JobService } from '../services/job.service';
import { EmployeeHours } from '../models/employee-hours.interface';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/InvoiceService.service';
import { InvoiceData, InvoiceEmployeeData } from '../models/invoice-data.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './ConfirmationModal/confirmation-modal.component';

interface InvoiceEmployee {
  employeeId: number;
  employeeName: string;
  regularHours: number;
  overtimeHours: number;
  regularCost: number;
  overtimeCost: number;
  totalCost: number;
  burdenedRate: number;
  burdenedOtRate: number;
  invoice: Timesheet;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  job: JobGroup;
  weekEnding: Date;
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalAmount: number;
  invoiceEmployees: InvoiceEmployee[];
}

interface WeekGroup {
  weekEnding: Date;
  timesheets: Timesheet[];
}

interface JobGroup {
  jobId: number;
  jobName: string;
  jobNumber: string;
  weekGroups: WeekGroup[];
  isCollapsed?: boolean;
}

interface CalculatedHours {
  jobNumber: string;
  regularHours: number;
  overtimeHours: number;
}

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css'],
})
export class TimesheetsComponent implements OnInit {
  timesheets: Timesheet[] = [];
  newTimesheet: Timesheet = new Timesheet();
  employees: Employee[] = [];
  jobs: any[] = [];
  addTimesheetModalOpen = false;
  jobNameFilter: string = '';
  jobNumberFilter: string = '';
  weekEndingFilter: string = '';
  selectedTimesheet: Timesheet | null = null;
  editTimesheetModalOpen = false;
  invoiceModalOpen = false;
  selectedInvoice: InvoiceData | null = null;
  invoices: InvoiceData[] = [];

  @ViewChild('weekEndingInput') weekEndingInput: any;

  constructor(
    private timesheetService: TimesheetService,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private router: Router,
    private invoiceService: InvoiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getTimesheets();
    this.fetchEmployees();
    this.getJobs();
    this.newTimesheet.employeeHours = [this.createEmptyEmployeeHours()];
  }

  getTimesheets() {
    this.timesheetService
      .getTimesheets()
      .subscribe((timesheets) => (this.timesheets = timesheets));
  }

  openAddTimesheetModal() {
    this.addTimesheetModalOpen = true;
    this.newTimesheet = new Timesheet();
    this.newTimesheet.employeeHours = [this.createEmptyEmployeeHours()];
  }

  closeAddTimesheetModal() {
    this.addTimesheetModalOpen = false;
  }

  addTimesheet() {
    if (this.newTimesheet.employeeHours) {
      const timesheets: Timesheet[] = this.newTimesheet.employeeHours.map(
        (employeeHours: EmployeeHours) => {
          const timesheet = new Timesheet();
          timesheet.job = this.newTimesheet.job;
          timesheet.weekEnding = this.newTimesheet.weekEnding;
          timesheet.employee = employeeHours.employee;
          timesheet.mondayHours = employeeHours.mondayHours;
          timesheet.tuesdayHours = employeeHours.tuesdayHours;
          timesheet.wednesdayHours = employeeHours.wednesdayHours;
          timesheet.thursdayHours = employeeHours.thursdayHours;
          timesheet.fridayHours = employeeHours.fridayHours;
          timesheet.saturdayHours = employeeHours.saturdayHours;
          timesheet.sundayHours = employeeHours.sundayHours;
          return timesheet;
        }
      );

      this.timesheetService
        .addTimesheets(timesheets)
        .subscribe((addedTimesheets: Timesheet[]) => {
          this.timesheets.push(...addedTimesheets);
          this.closeAddTimesheetModal();
        });
    }
  }

  createEmptyEmployeeHours(): EmployeeHours {
    return {
      employee: null,
      mondayHours: 0,
      tuesdayHours: 0,
      wednesdayHours: 0,
      thursdayHours: 0,
      fridayHours: 0,
      saturdayHours: 0,
      sundayHours: 0,
    };
  }

  addEmployeeHours() {
    if (!this.newTimesheet.employeeHours) {
      this.newTimesheet.employeeHours = [];
    }
    this.newTimesheet.employeeHours.push(this.createEmptyEmployeeHours());
  }

  removeEmployeeHours(index: number) {
    if (this.newTimesheet.employeeHours) {
      this.newTimesheet.employeeHours.splice(index, 1);
    }
  }

  deleteTimesheet(timesheet: Timesheet) {
    if (timesheet.timesheetId) {
      this.timesheetService
        .deleteTimesheet(timesheet.timesheetId)
        .subscribe(
          () =>
            (this.timesheets = this.timesheets.filter(
              (t) => t.timesheetId !== timesheet.timesheetId
            ))
        );
    }
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        console.log('Error Fetching Jobs:', error);
      }
    );
  }

  filteredTimesheets(): Timesheet[] {
    return this.timesheets.filter(
      (timesheet) =>
        (timesheet.job?.jobName
          ?.toLowerCase()
          .includes(this.jobNameFilter.toLowerCase()) ||
          '') &&
        (timesheet.job?.jobNumber
          ?.toLowerCase()
          .includes(this.jobNumberFilter.toLowerCase()) ||
          '') &&
        (!this.weekEndingFilter ||
          (timesheet.weekEnding &&
            new Date(timesheet.weekEnding).toISOString().slice(0, 10) ===
              this.weekEndingFilter))
    );
  }

  openEditTimesheetModal(timesheetId: number | undefined) {
    if (timesheetId) {
      this.timesheetService.getTimesheetById(timesheetId).subscribe(
        (timesheet: Timesheet) => {
          const employeeHours: EmployeeHours = {
            employee: timesheet.employee,
            mondayHours: timesheet.mondayHours,
            tuesdayHours: timesheet.tuesdayHours,
            wednesdayHours: timesheet.wednesdayHours,
            thursdayHours: timesheet.thursdayHours,
            fridayHours: timesheet.fridayHours,
            saturdayHours: timesheet.saturdayHours,
            sundayHours: timesheet.sundayHours,
          };
          timesheet.employeeHours = [employeeHours];
          const selectedJob = this.jobs.find(
            (job) => job.jobId === timesheet.job?.jobId
          );
          if (selectedJob) {
            timesheet.job = selectedJob;
          }
          if (timesheet.weekEnding) {
            timesheet.weekEnding = new Date(timesheet.weekEnding);
          }
          const selectedEmployee = this.employees.find(
            (employee) => employee.employeeId === timesheet.employee?.employeeId
          );
          if (selectedEmployee) {
            timesheet.employee = selectedEmployee;
          }

          this.selectedTimesheet = timesheet;
          this.editTimesheetModalOpen = true;
        },
        (error: any) => {
          console.error('Error fetching timesheet data:', error);
        }
      );
    }
  }

  closeEditTimesheetModal() {
    this.editTimesheetModalOpen = false;
    this.selectedTimesheet = null;
  }

  updateTimesheet() {
    if (this.selectedTimesheet) {
      const updatedTimesheet: Timesheet = {
        timesheetId: this.selectedTimesheet.timesheetId,
        job: this.selectedTimesheet.job,
        weekEnding: this.selectedTimesheet.weekEnding,
        employeeHours: this.selectedTimesheet.employeeHours,
      };
      if (
        this.selectedTimesheet.employeeHours &&
        this.selectedTimesheet.employeeHours.length > 0
      ) {
        const employeeHours = this.selectedTimesheet.employeeHours[0];
        updatedTimesheet.employee = employeeHours.employee;
        updatedTimesheet.mondayHours = employeeHours.mondayHours;
        updatedTimesheet.tuesdayHours = employeeHours.tuesdayHours;
        updatedTimesheet.wednesdayHours = employeeHours.wednesdayHours;
        updatedTimesheet.thursdayHours = employeeHours.thursdayHours;
        updatedTimesheet.fridayHours = employeeHours.fridayHours;
        updatedTimesheet.saturdayHours = employeeHours.saturdayHours;
        updatedTimesheet.sundayHours = employeeHours.sundayHours;
      }

      this.timesheetService.updateTimesheet(updatedTimesheet).subscribe(
        (updatedTimesheetResponse: Timesheet) => {
          const index = this.timesheets.findIndex(
            (t) => t.timesheetId === updatedTimesheetResponse.timesheetId
          );
          if (index !== -1) {
            this.timesheets[index] = updatedTimesheetResponse;
          }
          this.closeEditTimesheetModal();
        },
        (error: any) => {
          console.error('Error updating timesheet:', error);
        }
      );
    }
  }

  goToEmployeeHours() {
    this.router.navigate(['/employee-hours']);
  }

  groupedTimesheets(): JobGroup[] {
    const groupedData: JobGroup[] = [];
    const calculatedHours = this.calculateHours(this.filteredTimesheets());

    this.filteredTimesheets().forEach((timesheet) => {
      const jobNumber = timesheet.job?.jobNumber;
      const jobId = timesheet.job?.jobId;
      const jobName = timesheet.job?.jobName;
      const weekEnding = timesheet.weekEnding
        ? new Date(timesheet.weekEnding).toISOString().slice(0, 10)
        : '';

      if (jobNumber && jobId && jobName && weekEnding) {
        let jobGroup = groupedData.find(
          (group) => group.jobNumber === jobNumber
        );
        if (!jobGroup) {
          jobGroup = {
            jobId,
            jobName,
            jobNumber,
            weekGroups: [],
            isCollapsed: false,
          };
          groupedData.push(jobGroup);
        }

        let weekGroup = jobGroup.weekGroups.find(
          (group) =>
            group.weekEnding.getTime() === new Date(weekEnding).getTime()
        );
        if (!weekGroup) {
          weekGroup = { weekEnding: new Date(weekEnding), timesheets: [] };
          jobGroup.weekGroups.push(weekGroup);
        }

        weekGroup.timesheets.push(timesheet);

        const employeeId = timesheet.employee?.employeeId;
        if (
          employeeId &&
          calculatedHours[employeeId] &&
          calculatedHours[employeeId][weekEnding]
        ) {
          const calculatedJob = calculatedHours[employeeId][weekEnding].find(
            (job: CalculatedHours) => job.jobNumber === jobNumber
          );
          if (calculatedJob) {
            timesheet.regularHours = calculatedJob.regularHours;
            timesheet.overtimeHours = calculatedJob.overtimeHours;
          }
        }
      }
    });

    return groupedData;
  }

  calculateHours(timesheets: Timesheet[]): {
    [employeeId: number]: { [weekEnding: string]: CalculatedHours[] };
  } {
    const calculatedHours: {
      [employeeId: number]: { [weekEnding: string]: CalculatedHours[] };
    } = {};

    timesheets.forEach((timesheet) => {
      const employeeId = timesheet.employee?.employeeId;
      const jobNumber = timesheet.job?.jobNumber;
      const weekEnding = timesheet.weekEnding
        ? new Date(timesheet.weekEnding).toISOString().slice(0, 10)
        : '';

      if (employeeId && jobNumber && weekEnding) {
        if (!calculatedHours[employeeId]) {
          calculatedHours[employeeId] = {};
        }

        if (!calculatedHours[employeeId][weekEnding]) {
          calculatedHours[employeeId][weekEnding] = [];
        }

        let calculatedJob = calculatedHours[employeeId][weekEnding].find(
          (job) => job.jobNumber === jobNumber
        );
        if (!calculatedJob) {
          calculatedJob = { jobNumber, regularHours: 0, overtimeHours: 0 };
          calculatedHours[employeeId][weekEnding].push(calculatedJob);
        }

        const totalHours =
          (timesheet.mondayHours || 0) +
          (timesheet.tuesdayHours || 0) +
          (timesheet.wednesdayHours || 0) +
          (timesheet.thursdayHours || 0) +
          (timesheet.fridayHours || 0) +
          (timesheet.saturdayHours || 0) +
          (timesheet.sundayHours || 0);

        const totalRegularHours = calculatedHours[employeeId][
          weekEnding
        ].reduce((sum, job) => sum + job.regularHours, 0);
        const remainingRegularHours = Math.max(0, 40 - totalRegularHours);
        const regularHours = Math.min(totalHours, remainingRegularHours);
        const overtimeHours = Math.max(0, totalHours - regularHours);

        calculatedJob.regularHours += regularHours;
        calculatedJob.overtimeHours += overtimeHours;
      }
    });

    return calculatedHours;
  }

  generateInvoice(jobGroup: JobGroup): void {
    if (!jobGroup.weekGroups || jobGroup.weekGroups.length === 0) {
      console.log('No week groups found for the selected job group.');
      return;
    }
  
    this.invoiceService.getNextInvoiceNumber().subscribe(
      (nextInvoiceNumber: number) => {
        const invoiceData: InvoiceData = {
          invoiceNumber: nextInvoiceNumber,
          job: {
            jobId: jobGroup.jobId,
            jobName: jobGroup.jobName,
            jobNumber: jobGroup.jobNumber,
          },
          weekEnding: jobGroup.weekGroups[0].weekEnding,
          totalRegularHours: 0,
          totalOvertimeHours: 0,
          totalAmount: 0,
          invoiceEmployees: [],
        };
  
        for (const weekGroup of jobGroup.weekGroups) {
          if (!weekGroup.timesheets || weekGroup.timesheets.length === 0) {
            console.log(
              'No timesheets found for the week ending:',
              weekGroup.weekEnding
            );
            continue;
          }
  
          for (const timesheet of weekGroup.timesheets) {
            const employee = timesheet.employee;
            if (employee) {
              const regularHours = timesheet.regularHours ?? 0;
              const overtimeHours = timesheet.overtimeHours ?? 0;
              const regularCost = regularHours * employee.burdenedRate;
              const overtimeCost = overtimeHours * employee.burdenedOtRate;
              const totalCost = regularCost + overtimeCost;
  
              const invoiceEmployeeData: InvoiceEmployeeData = {
                employeeId: employee.employeeId,
                employeeName: employee.name,
                regularHours,
                overtimeHours,
                regularCost,
                overtimeCost,
                totalCost,
                burdenedRate: employee.burdenedRate,
                burdenedOtRate: employee.burdenedOtRate,
              };
  
              invoiceData.totalRegularHours =
                (invoiceData.totalRegularHours || 0) + regularHours;
              invoiceData.totalOvertimeHours =
                (invoiceData.totalOvertimeHours || 0) + overtimeHours;
              invoiceData.totalAmount = (invoiceData.totalAmount || 0) + totalCost;
  
              const existingEmployeeIndex = invoiceData.invoiceEmployees?.findIndex(
                (emp) => emp.employeeId === employee.employeeId
              );
  
              if (
                existingEmployeeIndex !== undefined &&
                existingEmployeeIndex !== -1
              ) {
                invoiceData.invoiceEmployees![existingEmployeeIndex].regularHours +=
                  regularHours;
                invoiceData.invoiceEmployees![
                  existingEmployeeIndex
                ].overtimeHours += overtimeHours;
                invoiceData.invoiceEmployees![existingEmployeeIndex].regularCost +=
                  regularCost;
                invoiceData.invoiceEmployees![existingEmployeeIndex].overtimeCost +=
                  overtimeCost;
                invoiceData.invoiceEmployees![existingEmployeeIndex].totalCost +=
                  totalCost;
              } else {
                invoiceData.invoiceEmployees!.push(invoiceEmployeeData);
              }
            } else {
              console.log('Employee not found for timesheet:', timesheet);
            }
          }
        }
  
        console.log('Invoice Data:', invoiceData);
        console.log('Invoice Employees:', invoiceData.invoiceEmployees);
  
        this.invoiceService.createInvoice(invoiceData).subscribe(
          (savedInvoice: InvoiceData) => {
            console.log('Invoice saved successfully:', savedInvoice);
            this.selectedInvoice = savedInvoice;
            this.invoiceModalOpen = true;
          },
          (error: any) => {
            console.error('Error saving invoice:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error retrieving next invoice number:', error);
      }
    );
  }

  private nextInvoiceNumber = 1630;

  private getNextInvoiceNumber(): number {
    const invoiceNumbers = this.invoices.map(invoice => invoice.invoiceNumber).filter((num): num is number => num !== undefined);
    const currentHighestNumber = invoiceNumbers.length > 0 ? Math.max(...invoiceNumbers) : 0;
    return currentHighestNumber + 1;
  }

  closeInvoiceModal() {
    this.invoiceModalOpen = false;
    this.selectedInvoice = null;
  }
}

```

## File: src/index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>7Twenty4 WebApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
</head>
<body>
  <app-root></app-root>
</body>
</html>

```

## File: src/main.ts

```typescript
/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

```

## File: src/styles.css

```css
/* You can add global styles to this file, and also import other style files */

```


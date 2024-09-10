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
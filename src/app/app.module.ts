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
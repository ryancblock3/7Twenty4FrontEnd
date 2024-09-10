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
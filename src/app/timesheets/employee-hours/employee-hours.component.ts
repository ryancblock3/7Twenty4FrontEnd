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
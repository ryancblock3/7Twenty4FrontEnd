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



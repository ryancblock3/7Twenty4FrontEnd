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
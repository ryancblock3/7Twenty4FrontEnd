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
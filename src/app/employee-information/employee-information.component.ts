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
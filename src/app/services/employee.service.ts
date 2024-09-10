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
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeHoursReportService {
  private apiUrl = 'http://localhost:8080/api/employee-hours-report';

  constructor(private http: HttpClient) { }

  getEmployeeHoursReport(weekEnding: string): Observable<any> {
    const url = `${this.apiUrl}?weekEnding=${weekEnding}`;
    return this.http.get(url);
  }
}
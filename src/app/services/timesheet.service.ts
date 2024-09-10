import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Timesheet } from '../models/timesheet.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private baseUrl = 'http://localhost:8080/api/timesheets';

  constructor(private http: HttpClient) { }

  getTimesheets(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(`${this.baseUrl}`);
  }

  addTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    return this.http.post<Timesheet>(`${this.baseUrl}`, timesheet);
  }

  updateTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    const url = `${this.baseUrl}/${timesheet.timesheetId}`;
    return this.http.put<Timesheet>(url, timesheet);
  }

  deleteTimesheet(timesheetId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${timesheetId}`);
  }

  addTimesheets(timesheets: Timesheet[]): Observable<Timesheet[]> {
    return this.http.post<Timesheet[]>(`${this.baseUrl}`, timesheets);
  }

  getTimesheetById(timesheetId: number): Observable<Timesheet> {
    return this.http.get<Timesheet>(`${this.baseUrl}/${timesheetId}`);
  }

  getEmployeeHoursByWeekEnding(weekEnding: any): Observable<{ employee: string, totalHours: number }[]> {
    const weekEndingDate = new Date(weekEnding);
    console.log('Original weekEnding value:', weekEnding);
    console.log('weekEndingDate:', weekEndingDate);
    const formattedDate = weekEndingDate.toISOString().slice(0, 10);
    console.log('Formatted date:', formattedDate);
    const url = `${this.baseUrl}/employee-hours?weekEnding=${formattedDate}`;
    console.log('URL:', url);
    return this.http.get<{ employee: string, totalHours: number }[]>(url);
  }

  getTimesheetsByWeekEnding(weekEnding: Date): Observable<Timesheet[]> {
    const url = `${this.baseUrl}?weekEnding=${weekEnding.toISOString()}`;
    return this.http.get<Timesheet[]>(url);
  }
}

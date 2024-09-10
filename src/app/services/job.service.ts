import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/jobs';


  constructor(private http: HttpClient) { }

  getJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(job: Job): Observable<Job> {
    const url = `${this.apiUrl}/${job.jobId}`;
    return this.http.put<Job>(url, job);
  }

  deleteJob(jobId: number): Observable<void> {
    const url = `${this.apiUrl}/${jobId}`;
    return this.http.delete<void>(url);
  }

  getActiveJobs(): Observable<Job[]> {
    const url = `${this.apiUrl}?status=active`;
    return this.http.get<Job[]>(url);
  }
}
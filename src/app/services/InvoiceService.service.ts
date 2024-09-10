import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { InvoiceData } from '../models/invoice-data.model';
import { InvoiceEmployeeData } from '../models/invoice-data.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8080/api/invoices';

  constructor(private http: HttpClient) {}

  createInvoice(invoiceData: InvoiceData): Observable<InvoiceData> {
    return this.http.post<InvoiceData>(`${this.apiUrl}`, invoiceData);
  }

  getInvoices(): Observable<InvoiceData[]> {
    return this.http.get<InvoiceData[]>(`${this.apiUrl}`);
  }

  saveInvoiceEmployees(
    invoiceEmployees: InvoiceEmployeeData[]
  ): Observable<InvoiceEmployeeData[]> {
    const url = `${this.apiUrl}/invoice-employees`;
    return this.http.post<InvoiceEmployeeData[]>(url, invoiceEmployees);
  }

  createInvoiceWithEmployees(invoice: InvoiceData): Observable<InvoiceData> {
    const url = `${this.apiUrl}/create-with-employees`;
    return this.http.post<InvoiceData>(url, invoice);
  }

  updateInvoice(invoice: InvoiceData): Observable<InvoiceData> {
    const url = `${this.apiUrl}/${invoice.invoiceId}`;
    console.log('invoiceId: ' + invoice.invoiceId);
    return this.http.put<InvoiceData>(url, invoice);
  }

  deleteInvoice(invoiceId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${invoiceId}`);
  }

  getInvoiceByNumber(invoiceNumber: number): Observable<InvoiceData> {
    return this.http.get<InvoiceData>(`${this.apiUrl}/${invoiceNumber}`);
  }

  invoiceExists(jobId: number, weekEnding: Date): Observable<boolean> {
    const weekEndingString = weekEnding.toISOString().slice(0, 10);
    const url = `${this.apiUrl}?jobId=${jobId}&weekEnding=${weekEndingString}`;

    return this.http
      .get<any[]>(url)
      .pipe(map((invoices) => invoices.length > 0));
  }

  getInvoiceByJobAndWeekEnding(jobId: number, weekEnding: Date): Observable<InvoiceData> {
    const weekEndingString = weekEnding.toISOString().slice(0, 10);
    const url = `${this.apiUrl}/job/${jobId}/weekEnding/${weekEndingString}`;
    return this.http.get<InvoiceData>(url);
  }

  getNextInvoiceNumber(): Observable<number> {
    const url = `${this.apiUrl}/next-number`;
    return this.http.get<number>(url);
  }

  getInvoicesByWeekEnding(weekEnding: Date): Observable<InvoiceData[]> {
    const url = `${this.apiUrl}?weekEnding=${weekEnding.toISOString()}`;
    return this.http.get<InvoiceData[]>(url);
  }
}

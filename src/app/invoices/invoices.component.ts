import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/InvoiceService.service';
import { InvoiceData } from '../models/invoice-data.model';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
})
export class InvoicesComponent implements OnInit {
  invoices: InvoiceData[] = [];
  showDeleteModal = false;
  filteredInvoices: InvoiceData[] = [];
  searchTerm: string = '';
  weekEndingFilter: Date | null = null;

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit() {
    this.getInvoices();
    this.fetchInvoices();
  }

  fetchInvoices() {
    this.invoiceService.getInvoices().subscribe(
      (invoices: InvoiceData[]) => {
        this.invoices = invoices;
        this.filteredInvoices = invoices;
      },
      (error: any) => {
        console.error('Error fetching invoices:', error);
      }
    );
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(
      (invoices: InvoiceData[]) => {
        this.invoices = invoices.map((invoice) => ({
          ...invoice,
          isCollapsed: false,
        }));
      },
      (error: any) => {
        console.error('Error retrieving invoices:', error);
      }
    );
  }

  updateInvoice(invoice: InvoiceData) {
    this.invoiceService.updateInvoice(invoice).subscribe(
      (updatedInvoice: InvoiceData) => {
        const index = this.invoices.findIndex(
          (i) => i.invoiceNumber === updatedInvoice.invoiceNumber
        );
        if (index !== -1) {
          this.invoices[index] = updatedInvoice;
        }
      },
      (error: any) => {
        console.error('Error updating invoice:', error);
      }
    );
  }

  deleteInvoice(invoice: InvoiceData) {
    if (invoice.invoiceNumber) {
      this.invoiceService.deleteInvoice(invoice.invoiceNumber).subscribe(
        () => {
          this.fetchInvoices();
          this.showDeleteModal = true;
        },
        (error: any) => {
          console.error('Error deleting invoice:', error);
        }
      );
    } else {
      console.error('Invoice number is undefined');
    }
  }

  editInvoice(invoice: InvoiceData) {
    this.router.navigate(['/invoices', invoice.invoiceNumber, 'edit']);
  }

  filterByWeekEnding(date: Date) {
    this.weekEndingFilter = date;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredInvoices = this.invoices.filter((invoice) => {
      const searchTermMatch = this.searchTerm
        ? invoice.invoiceNumber?.toString().includes(this.searchTerm) ||
          invoice.job?.jobName
            ?.toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          invoice.job?.jobNumber
            ?.toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        : true;

      const weekEndingMatch =
        this.weekEndingFilter !== null && this.weekEndingFilter instanceof Date
          ? invoice.weekEnding
            ? new Date(invoice.weekEnding).toISOString().slice(0, 10) ===
              this.weekEndingFilter.toISOString().slice(0, 10)
            : false
          : true;

      return searchTermMatch && weekEndingMatch;
    });
  }

  generatePDF(invoice: InvoiceData) {
    const doc = new jsPDF();
  
    const logo = new Image();
    logo.src = 'assets/images/logo-smaller.png';
    logo.onload = () => {
      const logoWidth = 35;
      const logoHeight = (296 / 515) * logoWidth;
      const logoX = (doc.internal.pageSize.getWidth() - logoWidth) / 2;
      const logoY = 10;
  
      doc.addImage(logo, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('7Twenty4 Services LLC', 105, logoY + logoHeight + 10, { align: 'center' });
  
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 105, logoY + logoHeight + 20, { align: 'center' });

      doc.text(`Job Name: ${invoice.job?.jobName}`, 20, 60);
      doc.text(`Job Number: ${invoice.job?.jobNumber}`, 20, 70);
      doc.text(
        `Week Ending: ${
          invoice.weekEnding
            ? new Date(invoice.weekEnding).toLocaleDateString()
            : ''
        }`,
        20,
        80
      );

      doc.setFont('helvetica', 'bold');
      doc.text('Employee Details', 105, 100, { align: 'center' });

      doc.setFillColor(211, 211, 211);
      doc.rect(20, 110, 170, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Employee', 25, 117);
      doc.text('Regular Hours', 60, 117);
      doc.text('Overtime Hours', 95, 117);
      doc.text('Regular Cost', 130, 117);
      doc.text('Overtime Cost', 165, 117);

      doc.setFont('helvetica', 'normal');
      let y = 130;
      if (invoice.invoiceEmployees) {
        invoice.invoiceEmployees.forEach((employee) => {
          doc.text(employee.employeeName, 25, y);
          doc.text(employee.regularHours.toString(), 70, y, { align: 'right' });
          doc.text(employee.overtimeHours.toString(), 105, y, {
            align: 'right',
          });
          doc.text(`$${employee.regularCost.toFixed(2)}`, 140, y, {
            align: 'right',
          });
          doc.text(`$${employee.overtimeCost.toFixed(2)}`, 175, y, {
            align: 'right',
          });
          y += 10;
        });
      }

      doc.setFont('helvetica', 'bold');
      doc.text('Total Regular Hours:', 20, y + 20);
      doc.text(invoice.totalRegularHours?.toString() ?? '', 70, y + 20, {
        align: 'left',
      });
      doc.text('Total Overtime Hours:', 20, y + 30);
      doc.text(invoice.totalOvertimeHours?.toString() ?? '', 70, y + 30, {
        align: 'left',
      });
      doc.text('Total Amount:', 20, y + 40);
      doc.text(`$${invoice.totalAmount?.toFixed(2) ?? ''}`, 70, y + 40, {
        align: 'left',
      });

      doc.save(`invoice_${invoice.invoiceNumber}.pdf`);
    };
  }
}

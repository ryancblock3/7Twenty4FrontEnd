import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/InvoiceService.service';
import { InvoiceData } from 'src/app/models/invoice-data.model';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {
  invoice: InvoiceData | undefined;
  jobName: string = '';
  jobNumber: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.getInvoice();
  }

getInvoice() {
  const invoiceNumber = this.route.snapshot.paramMap.get('invoiceNumber');
  if (invoiceNumber) {
    const invoiceNumberAsNumber = Number(invoiceNumber);
    if (!isNaN(invoiceNumberAsNumber)) {
      this.invoiceService.getInvoiceByNumber(invoiceNumberAsNumber).subscribe(
      );
    } else {
      console.error('Invalid invoice number:', invoiceNumber);
    }
  }
}

  updateInvoice() {
    if (this.invoice) {
      this.invoiceService.updateInvoice(this.invoice).subscribe(
        () => {
          this.router.navigate(['/invoices']);
        },
        (error: any) => {
          console.error('Error updating invoice:', error);
        }
      );
    }
  }

  navigateToInvoices() {
    this.router.navigate(['/invoices']);
  }
}
import { Employee } from "./employee.model";

export interface InvoiceItem {
    employee: Employee;
    regularHours: number;
    overtimeHours: number;
    burdenedRate: number;
    overtimeBurdenedRate: number;
    totalAmount: number;
  }
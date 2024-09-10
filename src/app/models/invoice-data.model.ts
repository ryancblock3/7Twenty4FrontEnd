import { Job } from "./job.model";

export interface InvoiceData {
  invoiceId?: number;
  job?: {
    jobId: number;
    jobName: string;
    jobNumber: string;
  };
  weekEnding?: Date;
  invoiceNumber?: number;
  totalRegularHours?: number;
  totalOvertimeHours?: number;
  totalAmount?: number;
  invoiceEmployees?: InvoiceEmployeeData[];
  isCollapsed?: boolean;
}

export interface InvoiceEmployeeData {
  employeeId: number;
  employeeName: string;
  regularHours: number;
  overtimeHours: number;
  burdenedRate: number;
  burdenedOtRate: number;
  regularCost: number;
  overtimeCost: number;
  totalCost: number;
}
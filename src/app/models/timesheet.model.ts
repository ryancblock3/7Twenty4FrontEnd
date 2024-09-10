import { EmployeeHours } from './employee-hours.interface';
import { Employee } from './employee.model';
import { Job } from './job.model';

export class Timesheet {
  timesheetId?: number;
  employee?: Employee;
  job?: Job;
  weekEnding?: Date;
  mondayHours?: number;
  tuesdayHours?: number;
  wednesdayHours?: number;
  thursdayHours?: number;
  fridayHours?: number;
  saturdayHours?: number;
  sundayHours?: number;
  totalHours?: number;
  employeeHours?: EmployeeHours[];
  regularHours?: number;
  overtimeHours?: number;
}
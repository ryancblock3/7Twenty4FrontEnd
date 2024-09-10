import { Employee } from './employee.model';

export class EmployeeHours {
  employee: Employee | null;
  mondayHours: number;
  tuesdayHours: number;
  wednesdayHours: number;
  thursdayHours: number;
  fridayHours: number;
  saturdayHours: number;
  sundayHours: number;

  constructor(
    employee?: Employee | null,
    mondayHours?: number,
    tuesdayHours?: number,
    wednesdayHours?: number,
    thursdayHours?: number,
    fridayHours?: number,
    saturdayHours?: number,
    sundayHours?: number
  ) {
    this.employee = employee || null;
    this.mondayHours = mondayHours || 0;
    this.tuesdayHours = tuesdayHours || 0;
    this.wednesdayHours = wednesdayHours || 0;
    this.thursdayHours = thursdayHours || 0;
    this.fridayHours = fridayHours || 0;
    this.saturdayHours = saturdayHours || 0;
    this.sundayHours = sundayHours || 0;
  }
}
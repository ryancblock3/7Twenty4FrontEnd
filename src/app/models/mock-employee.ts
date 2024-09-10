// mock-employee.ts
import { Employee } from './employee.model';

export const mockEmployee: Employee = {
  employeeId: 1,
  name: 'John Doe',
  hireDate: new Date('2021-01-01'),
  jobTitle: 'Software Engineer',
  email: 'john.doe@example.com',
  hourlyWage: 25.0,
  fica: 0.0765,
  lastRaiseDate: new Date('2022-01-01'),
  insurance: 1.07,
  vacationHoliday: 0.97,
  carFuel: 0.0,
  markup: 4.25,
  rate: 33.29,
  burdenedRate: 33.29,
  burdenedOtRate: 49.94,
  notes: "null",
  lastVacationDate: new Date('2023-06-01'),
  vacationDaysUsed: 5
};
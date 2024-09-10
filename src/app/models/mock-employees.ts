import { Employee } from './employee.model';

export const mockEmployees: Employee[] = [
  {
    employeeId: 83,
    name: 'John Doe',
    hireDate: new Date('2021-04-19'),
    jobTitle: 'Apprentice Electrician',
    email: 'john.doe@example.com',
    hourlyWage: 15.00,
    fica: 1.20,
    lastRaiseDate: new Date('2023-04-19'),
    insurance: 1.07,
    vacationHoliday: 0.97,
    carFuel: 0.00,
    markup: 4.25,
    rate: 22.49,
    burdenedRate: 22.49,
    burdenedOtRate: 33.74,
    notes: "First Employee",
    lastVacationDate: new Date('2023-06-01'),
    vacationDaysUsed: 5
  },
  {
    employeeId: 84,
    name: 'Jane Smith',
    hireDate: new Date('2022-02-10'),
    jobTitle: 'Apprentice Electrician',
    email: 'jane.smith@example.com',
    hourlyWage: 16.50,
    fica: 1.32,
    lastRaiseDate: new Date('2023-02-10'),
    insurance: 1.07,
    vacationHoliday: 0.97,
    carFuel: 0.00,
    markup: 4.50,
    rate: 24.36,
    burdenedRate: 24.36,
    burdenedOtRate: 36.54,
    notes: "Second Employee",
    lastVacationDate: new Date('2023-07-01'),
    vacationDaysUsed: 7
  },
  {
    employeeId: 111,
    name: 'Liam Nelson',
    hireDate: new Date('2023-02-26'),
    jobTitle: 'Apprentice Electrician',
    email: 'liam.nelson@example.com',
    hourlyWage: 34.50,
    fica: 2.76,
    lastRaiseDate: new Date('2023-02-25'),
    insurance: 1.07,
    vacationHoliday: 0.97,
    carFuel: 4.00,
    markup: 4.25,
    rate: 47.55,
    burdenedRate: 47.55,
    burdenedOtRate: 71.33,
    notes: "Third Employee",
    lastVacationDate: new Date('2025-10-01'),
    vacationDaysUsed: 7
  }
];
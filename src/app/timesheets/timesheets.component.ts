import { Component, OnInit, ViewChild } from '@angular/core';
import { Timesheet } from '../models/timesheet.model';
import { TimesheetService } from '../services/timesheet.service';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { JobService } from '../services/job.service';
import { EmployeeHours } from '../models/employee-hours.interface';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/InvoiceService.service';
import { InvoiceData, InvoiceEmployeeData } from '../models/invoice-data.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from './ConfirmationModal/confirmation-modal.component';

interface InvoiceEmployee {
  employeeId: number;
  employeeName: string;
  regularHours: number;
  overtimeHours: number;
  regularCost: number;
  overtimeCost: number;
  totalCost: number;
  burdenedRate: number;
  burdenedOtRate: number;
  invoice: Timesheet;
}

interface Invoice {
  id: number;
  invoiceNumber: string;
  job: JobGroup;
  weekEnding: Date;
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalAmount: number;
  invoiceEmployees: InvoiceEmployee[];
}

interface WeekGroup {
  weekEnding: Date;
  timesheets: Timesheet[];
}

interface JobGroup {
  jobId: number;
  jobName: string;
  jobNumber: string;
  weekGroups: WeekGroup[];
  isCollapsed?: boolean;
}

interface CalculatedHours {
  jobNumber: string;
  regularHours: number;
  overtimeHours: number;
}

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css'],
})
export class TimesheetsComponent implements OnInit {
  timesheets: Timesheet[] = [];
  newTimesheet: Timesheet = new Timesheet();
  employees: Employee[] = [];
  jobs: any[] = [];
  addTimesheetModalOpen = false;
  jobNameFilter: string = '';
  jobNumberFilter: string = '';
  weekEndingFilter: string = '';
  selectedTimesheet: Timesheet | null = null;
  editTimesheetModalOpen = false;
  invoiceModalOpen = false;
  selectedInvoice: InvoiceData | null = null;
  invoices: InvoiceData[] = [];

  @ViewChild('weekEndingInput') weekEndingInput: any;

  constructor(
    private timesheetService: TimesheetService,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private router: Router,
    private invoiceService: InvoiceService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getTimesheets();
    this.fetchEmployees();
    this.getJobs();
    this.newTimesheet.employeeHours = [this.createEmptyEmployeeHours()];
  }

  getTimesheets() {
    this.timesheetService
      .getTimesheets()
      .subscribe((timesheets) => (this.timesheets = timesheets));
  }

  openAddTimesheetModal() {
    this.addTimesheetModalOpen = true;
    this.newTimesheet = new Timesheet();
    this.newTimesheet.employeeHours = [this.createEmptyEmployeeHours()];
  }

  closeAddTimesheetModal() {
    this.addTimesheetModalOpen = false;
  }

  addTimesheet() {
    if (this.newTimesheet.employeeHours) {
      const timesheets: Timesheet[] = this.newTimesheet.employeeHours.map(
        (employeeHours: EmployeeHours) => {
          const timesheet = new Timesheet();
          timesheet.job = this.newTimesheet.job;
          timesheet.weekEnding = this.newTimesheet.weekEnding;
          timesheet.employee = employeeHours.employee;
          timesheet.mondayHours = employeeHours.mondayHours;
          timesheet.tuesdayHours = employeeHours.tuesdayHours;
          timesheet.wednesdayHours = employeeHours.wednesdayHours;
          timesheet.thursdayHours = employeeHours.thursdayHours;
          timesheet.fridayHours = employeeHours.fridayHours;
          timesheet.saturdayHours = employeeHours.saturdayHours;
          timesheet.sundayHours = employeeHours.sundayHours;
          return timesheet;
        }
      );

      this.timesheetService
        .addTimesheets(timesheets)
        .subscribe((addedTimesheets: Timesheet[]) => {
          this.timesheets.push(...addedTimesheets);
          this.closeAddTimesheetModal();
        });
    }
  }

  createEmptyEmployeeHours(): EmployeeHours {
    return {
      employee: null,
      mondayHours: 0,
      tuesdayHours: 0,
      wednesdayHours: 0,
      thursdayHours: 0,
      fridayHours: 0,
      saturdayHours: 0,
      sundayHours: 0,
    };
  }

  addEmployeeHours() {
    if (!this.newTimesheet.employeeHours) {
      this.newTimesheet.employeeHours = [];
    }
    this.newTimesheet.employeeHours.push(this.createEmptyEmployeeHours());
  }

  removeEmployeeHours(index: number) {
    if (this.newTimesheet.employeeHours) {
      this.newTimesheet.employeeHours.splice(index, 1);
    }
  }

  deleteTimesheet(timesheet: Timesheet) {
    if (timesheet.timesheetId) {
      this.timesheetService
        .deleteTimesheet(timesheet.timesheetId)
        .subscribe(
          () =>
            (this.timesheets = this.timesheets.filter(
              (t) => t.timesheetId !== timesheet.timesheetId
            ))
        );
    }
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getJobs() {
    this.jobService.getJobs().subscribe(
      (data) => {
        this.jobs = data;
      },
      (error) => {
        console.log('Error Fetching Jobs:', error);
      }
    );
  }

  filteredTimesheets(): Timesheet[] {
    return this.timesheets.filter(
      (timesheet) =>
        (timesheet.job?.jobName
          ?.toLowerCase()
          .includes(this.jobNameFilter.toLowerCase()) ||
          '') &&
        (timesheet.job?.jobNumber
          ?.toLowerCase()
          .includes(this.jobNumberFilter.toLowerCase()) ||
          '') &&
        (!this.weekEndingFilter ||
          (timesheet.weekEnding &&
            new Date(timesheet.weekEnding).toISOString().slice(0, 10) ===
              this.weekEndingFilter))
    );
  }

  openEditTimesheetModal(timesheetId: number | undefined) {
    if (timesheetId) {
      this.timesheetService.getTimesheetById(timesheetId).subscribe(
        (timesheet: Timesheet) => {
          const employeeHours: EmployeeHours = {
            employee: timesheet.employee,
            mondayHours: timesheet.mondayHours,
            tuesdayHours: timesheet.tuesdayHours,
            wednesdayHours: timesheet.wednesdayHours,
            thursdayHours: timesheet.thursdayHours,
            fridayHours: timesheet.fridayHours,
            saturdayHours: timesheet.saturdayHours,
            sundayHours: timesheet.sundayHours,
          };
          timesheet.employeeHours = [employeeHours];
          const selectedJob = this.jobs.find(
            (job) => job.jobId === timesheet.job?.jobId
          );
          if (selectedJob) {
            timesheet.job = selectedJob;
          }
          if (timesheet.weekEnding) {
            timesheet.weekEnding = new Date(timesheet.weekEnding);
          }
          const selectedEmployee = this.employees.find(
            (employee) => employee.employeeId === timesheet.employee?.employeeId
          );
          if (selectedEmployee) {
            timesheet.employee = selectedEmployee;
          }

          this.selectedTimesheet = timesheet;
          this.editTimesheetModalOpen = true;
        },
        (error: any) => {
          console.error('Error fetching timesheet data:', error);
        }
      );
    }
  }

  closeEditTimesheetModal() {
    this.editTimesheetModalOpen = false;
    this.selectedTimesheet = null;
  }

  updateTimesheet() {
    if (this.selectedTimesheet) {
      const updatedTimesheet: Timesheet = {
        timesheetId: this.selectedTimesheet.timesheetId,
        job: this.selectedTimesheet.job,
        weekEnding: this.selectedTimesheet.weekEnding,
        employeeHours: this.selectedTimesheet.employeeHours,
      };
      if (
        this.selectedTimesheet.employeeHours &&
        this.selectedTimesheet.employeeHours.length > 0
      ) {
        const employeeHours = this.selectedTimesheet.employeeHours[0];
        updatedTimesheet.employee = employeeHours.employee;
        updatedTimesheet.mondayHours = employeeHours.mondayHours;
        updatedTimesheet.tuesdayHours = employeeHours.tuesdayHours;
        updatedTimesheet.wednesdayHours = employeeHours.wednesdayHours;
        updatedTimesheet.thursdayHours = employeeHours.thursdayHours;
        updatedTimesheet.fridayHours = employeeHours.fridayHours;
        updatedTimesheet.saturdayHours = employeeHours.saturdayHours;
        updatedTimesheet.sundayHours = employeeHours.sundayHours;
      }

      this.timesheetService.updateTimesheet(updatedTimesheet).subscribe(
        (updatedTimesheetResponse: Timesheet) => {
          const index = this.timesheets.findIndex(
            (t) => t.timesheetId === updatedTimesheetResponse.timesheetId
          );
          if (index !== -1) {
            this.timesheets[index] = updatedTimesheetResponse;
          }
          this.closeEditTimesheetModal();
        },
        (error: any) => {
          console.error('Error updating timesheet:', error);
        }
      );
    }
  }

  goToEmployeeHours() {
    this.router.navigate(['/employee-hours']);
  }

  groupedTimesheets(): JobGroup[] {
    const groupedData: JobGroup[] = [];
    const calculatedHours = this.calculateHours(this.filteredTimesheets());

    this.filteredTimesheets().forEach((timesheet) => {
      const jobNumber = timesheet.job?.jobNumber;
      const jobId = timesheet.job?.jobId;
      const jobName = timesheet.job?.jobName;
      const weekEnding = timesheet.weekEnding
        ? new Date(timesheet.weekEnding).toISOString().slice(0, 10)
        : '';

      if (jobNumber && jobId && jobName && weekEnding) {
        let jobGroup = groupedData.find(
          (group) => group.jobNumber === jobNumber
        );
        if (!jobGroup) {
          jobGroup = {
            jobId,
            jobName,
            jobNumber,
            weekGroups: [],
            isCollapsed: false,
          };
          groupedData.push(jobGroup);
        }

        let weekGroup = jobGroup.weekGroups.find(
          (group) =>
            group.weekEnding.getTime() === new Date(weekEnding).getTime()
        );
        if (!weekGroup) {
          weekGroup = { weekEnding: new Date(weekEnding), timesheets: [] };
          jobGroup.weekGroups.push(weekGroup);
        }

        weekGroup.timesheets.push(timesheet);

        const employeeId = timesheet.employee?.employeeId;
        if (
          employeeId &&
          calculatedHours[employeeId] &&
          calculatedHours[employeeId][weekEnding]
        ) {
          const calculatedJob = calculatedHours[employeeId][weekEnding].find(
            (job: CalculatedHours) => job.jobNumber === jobNumber
          );
          if (calculatedJob) {
            timesheet.regularHours = calculatedJob.regularHours;
            timesheet.overtimeHours = calculatedJob.overtimeHours;
          }
        }
      }
    });

    return groupedData;
  }

  calculateHours(timesheets: Timesheet[]): {
    [employeeId: number]: { [weekEnding: string]: CalculatedHours[] };
  } {
    const calculatedHours: {
      [employeeId: number]: { [weekEnding: string]: CalculatedHours[] };
    } = {};

    timesheets.forEach((timesheet) => {
      const employeeId = timesheet.employee?.employeeId;
      const jobNumber = timesheet.job?.jobNumber;
      const weekEnding = timesheet.weekEnding
        ? new Date(timesheet.weekEnding).toISOString().slice(0, 10)
        : '';

      if (employeeId && jobNumber && weekEnding) {
        if (!calculatedHours[employeeId]) {
          calculatedHours[employeeId] = {};
        }

        if (!calculatedHours[employeeId][weekEnding]) {
          calculatedHours[employeeId][weekEnding] = [];
        }

        let calculatedJob = calculatedHours[employeeId][weekEnding].find(
          (job) => job.jobNumber === jobNumber
        );
        if (!calculatedJob) {
          calculatedJob = { jobNumber, regularHours: 0, overtimeHours: 0 };
          calculatedHours[employeeId][weekEnding].push(calculatedJob);
        }

        const totalHours =
          (timesheet.mondayHours || 0) +
          (timesheet.tuesdayHours || 0) +
          (timesheet.wednesdayHours || 0) +
          (timesheet.thursdayHours || 0) +
          (timesheet.fridayHours || 0) +
          (timesheet.saturdayHours || 0) +
          (timesheet.sundayHours || 0);

        const totalRegularHours = calculatedHours[employeeId][
          weekEnding
        ].reduce((sum, job) => sum + job.regularHours, 0);
        const remainingRegularHours = Math.max(0, 40 - totalRegularHours);
        const regularHours = Math.min(totalHours, remainingRegularHours);
        const overtimeHours = Math.max(0, totalHours - regularHours);

        calculatedJob.regularHours += regularHours;
        calculatedJob.overtimeHours += overtimeHours;
      }
    });

    return calculatedHours;
  }

  generateInvoice(jobGroup: JobGroup): void {
    if (!jobGroup.weekGroups || jobGroup.weekGroups.length === 0) {
      console.log('No week groups found for the selected job group.');
      return;
    }
  
    this.invoiceService.getNextInvoiceNumber().subscribe(
      (nextInvoiceNumber: number) => {
        const invoiceData: InvoiceData = {
          invoiceNumber: nextInvoiceNumber,
          job: {
            jobId: jobGroup.jobId,
            jobName: jobGroup.jobName,
            jobNumber: jobGroup.jobNumber,
          },
          weekEnding: jobGroup.weekGroups[0].weekEnding,
          totalRegularHours: 0,
          totalOvertimeHours: 0,
          totalAmount: 0,
          invoiceEmployees: [],
        };
  
        for (const weekGroup of jobGroup.weekGroups) {
          if (!weekGroup.timesheets || weekGroup.timesheets.length === 0) {
            console.log(
              'No timesheets found for the week ending:',
              weekGroup.weekEnding
            );
            continue;
          }
  
          for (const timesheet of weekGroup.timesheets) {
            const employee = timesheet.employee;
            if (employee) {
              const regularHours = timesheet.regularHours ?? 0;
              const overtimeHours = timesheet.overtimeHours ?? 0;
              const regularCost = regularHours * employee.burdenedRate;
              const overtimeCost = overtimeHours * employee.burdenedOtRate;
              const totalCost = regularCost + overtimeCost;
  
              const invoiceEmployeeData: InvoiceEmployeeData = {
                employeeId: employee.employeeId,
                employeeName: employee.name,
                regularHours,
                overtimeHours,
                regularCost,
                overtimeCost,
                totalCost,
                burdenedRate: employee.burdenedRate,
                burdenedOtRate: employee.burdenedOtRate,
              };
  
              invoiceData.totalRegularHours =
                (invoiceData.totalRegularHours || 0) + regularHours;
              invoiceData.totalOvertimeHours =
                (invoiceData.totalOvertimeHours || 0) + overtimeHours;
              invoiceData.totalAmount = (invoiceData.totalAmount || 0) + totalCost;
  
              const existingEmployeeIndex = invoiceData.invoiceEmployees?.findIndex(
                (emp) => emp.employeeId === employee.employeeId
              );
  
              if (
                existingEmployeeIndex !== undefined &&
                existingEmployeeIndex !== -1
              ) {
                invoiceData.invoiceEmployees![existingEmployeeIndex].regularHours +=
                  regularHours;
                invoiceData.invoiceEmployees![
                  existingEmployeeIndex
                ].overtimeHours += overtimeHours;
                invoiceData.invoiceEmployees![existingEmployeeIndex].regularCost +=
                  regularCost;
                invoiceData.invoiceEmployees![existingEmployeeIndex].overtimeCost +=
                  overtimeCost;
                invoiceData.invoiceEmployees![existingEmployeeIndex].totalCost +=
                  totalCost;
              } else {
                invoiceData.invoiceEmployees!.push(invoiceEmployeeData);
              }
            } else {
              console.log('Employee not found for timesheet:', timesheet);
            }
          }
        }
  
        console.log('Invoice Data:', invoiceData);
        console.log('Invoice Employees:', invoiceData.invoiceEmployees);
  
        this.invoiceService.createInvoice(invoiceData).subscribe(
          (savedInvoice: InvoiceData) => {
            console.log('Invoice saved successfully:', savedInvoice);
            this.selectedInvoice = savedInvoice;
            this.invoiceModalOpen = true;
          },
          (error: any) => {
            console.error('Error saving invoice:', error);
          }
        );
      },
      (error: any) => {
        console.error('Error retrieving next invoice number:', error);
      }
    );
  }

  private nextInvoiceNumber = 1630;

  private getNextInvoiceNumber(): number {
    const invoiceNumbers = this.invoices.map(invoice => invoice.invoiceNumber).filter((num): num is number => num !== undefined);
    const currentHighestNumber = invoiceNumbers.length > 0 ? Math.max(...invoiceNumbers) : 0;
    return currentHighestNumber + 1;
  }

  closeInvoiceModal() {
    this.invoiceModalOpen = false;
    this.selectedInvoice = null;
  }
}

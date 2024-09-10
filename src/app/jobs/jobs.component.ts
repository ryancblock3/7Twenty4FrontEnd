import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from '../models/job.model';
import { JobService } from '../services/job.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationModal } from './delete-confirmation-modal/delete-confirmation-modal.component';
import { SuccessModal } from './success-modal/success-modal.component';
import { CreateJobModalComponent } from './create-job-modal/create-job-modal.component';
import { EditJobModalComponent } from './edit-job-modal/edit-job-modal.component';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchTerm: string = '';
  pageSize = 10;
  currentPage = 1;
  totalItems = 0;

  constructor(private jobService: JobService, private modalService: NgbModal) {}

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.jobService.getAllJobs().subscribe(
      (jobs: Job[]) => {
        this.jobs = jobs;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  applyFilters() {
    this.filteredJobs = this.jobs.filter(job => job.jobName?.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.totalItems = this.filteredJobs.length;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredJobs = this.filteredJobs.slice(startIndex, endIndex);
  }

  openDeleteConfirmation(job: Job) {
    const modalRef = this.modalService.open(DeleteConfirmationModal);
    modalRef.componentInstance.job = job;
    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.deleteJob(job);
        }
      },
      (reason) => {}
    );
  }

  deleteJob(job: Job) {
    const jobId = job.jobId;

    if (jobId !== undefined) {
      this.jobService.deleteJob(jobId).subscribe(
        () => {
          this.getJobs();
          const modalRef = this.modalService.open(SuccessModal);
          modalRef.componentInstance.message = `Job "${job.jobName}" has been deleted successfully.`;
        },
        (error) => {
          console.error('Error deleting job:', error);
        }
      );
    } else {
      console.error('Invalid job ID');
    }
  }

  openCreateJobModal() {
    const modalRef = this.modalService.open(CreateJobModalComponent);
    modalRef.result.then(
      () => {
        this.getJobs();
      },
      () => {
      }
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= Math.ceil(this.totalItems / this.pageSize)) {
      this.currentPage = page;
      this.applyFilters();
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyFilters();
    }
  }
  
  nextPage() {
    if (this.currentPage < Math.ceil(this.totalItems / this.pageSize)) {
      this.currentPage++;
      this.applyFilters();
    }
  }

  createRange(count: number) {
    return Array.from(Array(count), (_, i) => i);
  }

  getCeilOfTotalItems(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  openEditJobModal(job: Job) {
    const modalRef = this.modalService.open(EditJobModalComponent);
    modalRef.componentInstance.job = job;
    modalRef.result.then(
      () => {
        this.getJobs();
      },
      () => {
      }
    );
  }
}

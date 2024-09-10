import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-create-job-modal',
  templateUrl: './create-job-modal.component.html'
})
export class CreateJobModalComponent {
  job: Job = {
    jobName: '',
  };

  constructor(
    public activeModal: NgbActiveModal,
    private jobService: JobService
  ) { }

  createJob() {
    this.jobService.createJob(this.job).subscribe(
      (createdJob: Job) => {
        console.log('Job created successfully:', createdJob);
        this.activeModal.close();
      },
      (error) => {
        console.error('Error creating job:', error);
      }
    );
  }
}